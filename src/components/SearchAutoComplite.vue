<script setup lang="ts">
import {ref} from 'vue'
import {Person} from "@/types"
import {useStore} from "vuex"
import {useRouter} from "vue-router"
interface Props {
  options: Person[] | null
}
defineProps<Props>()

const store = useStore()
const router = useRouter()

const search = ref<string>('')
const openList = ref<boolean>(false)

const searchPerson = () => {
  store.dispatch('getSearchPerson', search.value)
}

const personRoute = (person:Person) => {
  store.commit('currentPerson', person)
  router.push({name: 'person', params: {id: person.id}})
}
</script>

<template>
  <div class="search">
    <input type="text" class="search__input" v-model="search" @input="searchPerson" @focus="openList = true">
    <ul class="search__list" v-if="openList && options">
      <li class="search__list-item" v-for="person in options" :key="person.name">
        <a @click.prevent="personRoute(person)">{{person.name}}</a>
      </li>
    </ul>
  </div>
</template>

<style scoped>

.search {
  position: relative;
  width: 200px;
}

.search__list {
  position: absolute;
  top: 100%;
  background: #fff;
  box-shadow: 0 0 10px #ccc;
  margin: 0;
  padding: 10px 0;
  list-style: none;
  width: 100%;
}

.search__input {
  width: 100%;
  padding-left: 10px;
}

.search__list-item {
  margin-bottom: 5px;
  padding: 5px 10px;
  cursor: pointer;
}

.search__list-item:hover {
  background: #ccc;
}

</style>