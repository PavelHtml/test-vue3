import { createStore, Store } from 'vuex'
import {RootState} from "@/store/types"
import http from "@/http"
import {Person} from "@/types"

import { InjectionKey } from 'vue'

export const key: InjectionKey<Store<RootState>> = Symbol()

export const store = createStore<RootState> ({
  state: {
    persons: null,
    favorites: JSON.parse((localStorage.getItem('favoritesPersons') as string)) || [],
    search_persons: null,
    current_persons: null,
    person_cache: new Map(),
    controller: new AbortController(),
    pagination: {
      next: null,
      prev: null
    },
    load: false
  },
  getters: {
    persons: state => state.persons,
    favorites: state => state.favorites,
    searchPersons: state => state.search_persons,
    currentPersons: state => state.current_persons,
    pagination: state => state.pagination,
    load: state => state.load,
  },
  mutations: {
    setPerson(state, payload:Person[]) {
      state.persons = payload.map((item:Person) => {
        item.favorite = state.favorites.some((person:Person) => {
          return person.name === item.name
        })
        return item
      })
    },
    setPagination(state, payload) {
      const prev:number = typeof payload.previous === 'string' ? +payload.previous.split('=').slice(-1) : payload.previous
      const next:number = typeof payload.next === 'string' ? +payload.next.split('=').slice(-1) : payload.next
      state.pagination = {
        next: next,
        prev: prev
      }
    },
    addFavoritePerson(state, payload:Person) {
      state.favorites.push(payload)
      payload.favorite = true
      localStorage.setItem('favoritesPersons', JSON.stringify(state.favorites))
    },
    removeFavoritePerson(state, payload:Person) {
      payload.favorite = false
      state.favorites.forEach((item:Person, index:number) => {
        if (item.name === payload.name) {
          state.favorites.splice(index, 1)
          return false
        }
      })
      localStorage.setItem('favoritesPersons', JSON.stringify(state.favorites))
    },
    setSearchPerson(state, payload:Person[]) {
      state.search_persons = payload.map((item:Person):Person => {
        item.id = +item.url.split('/').filter(item => item.length).slice(-1)
        return item
      })
    },
    currentPerson(state, payload:Person) {
      state.current_persons = payload
    },
    savePersons(state, payload:number) {
      state.person_cache.set(payload, state.persons)
    },
    load(state, payload:boolean) {
      state.load = payload
    },
  },
  actions: {
    async getPeoples({commit, state}) {
      commit('load', true)
      if (state.person_cache.get(1)) {
        const pagination: object = {
          next: 2,
          previous: null
        }
        commit('setPerson', state.person_cache.get(1))
        commit('setPagination', pagination)
      } else {
        try {
          const resp = await http.get('api/people')
          commit('setPagination', resp.data)
          commit('setPerson', resp.data.results)
          commit('savePersons', 1)
        } catch (e: any) {
          console.error(e.message)
        }
      }

      commit('load', false)
    },
    async getPeoplesPages({commit, state}, id:number) {
      commit('load', true)
      if (state.person_cache.get(id)) {
        const pagination: object = {
          next: id + 1,
          previous: id === 1 ? null : id - 1
        }
        commit('setPerson', state.person_cache.get(id))
        commit('setPagination', pagination)
      } else {
        try {
          const resp = await http.get(`api/people/?page=${id}`)
          commit('setPagination', resp.data)
          commit('setPerson', resp.data.results)
        } catch (e: any) {
          console.error(e.message)
        }
      }
      commit('savePersons', id)
      commit('load', false)
    },
    async getSearchPerson({commit, state}, text:string) {
      state.controller.abort()
      state.controller = new AbortController()
      try {
        const resp = await http.get(`api/people/?search=${text}`, {
          signal: state.controller.signal
        })
        commit('setSearchPerson', resp.data.results)
      } catch (e: any) {
        console.error(e.message)
      }
    },
    async getPerson({commit}, id:number) {
      try {
        const resp = await http.get(`api/people/${id}`)
        commit('currentPerson', resp.data)
      } catch (e: any) {
        console.error(e.message)
      }
    },
  }
})