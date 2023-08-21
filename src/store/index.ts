import Vuex, {StoreOptions} from 'vuex'
import {RootState} from "@/store/types";
import http from "@/http";
import {AxiosResponse} from "axios";
import {Person} from "@/types";

const store: StoreOptions<RootState> = {
  state: {
    peoples: null,
    favorites: JSON.parse((localStorage.getItem('favoritesPersons') as string)) || []
  },
  getters: {
    peoples: state => state.peoples,
    favorites: state => state.favorites
  },
  mutations: {
    setPerson(state:RootState, payload:Person[]) {
      state.peoples = payload.map((item:Person) => {
        item.favorite = state.favorites.some((person:Person) => {
          return person.name === item.name
        })
        return item
      })
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
          console.log(index)
          state.favorites.splice(index, 1)
          return false
        }
      })
      localStorage.setItem('favoritesPersons', JSON.stringify(state.favorites))
    }
  },
  actions: {
    async getPeoples({commit}) {
      try {
        const resp: AxiosResponse = await http.get('api/people')
        commit('setPerson', resp.data.results)
      } catch (e) {
        console.log(e)
      }
    }
  },
  modules: {

  }
}
export default new Vuex.Store<RootState>(store)