<script setup lang="ts">
import PeoplesTable from "@/components/PeoplesTable.vue";
import {useStore} from "vuex";
import {computed, onBeforeMount} from "vue";
import SearchAutoComplite from "@/components/SearchAutoComplite.vue";
import {Person} from "@/types";

const store = useStore();
const tableHead:Array<keyof Person> = ['name', 'height', 'mass', 'hair_color']

const getPeoples = computed<Person[]>(() => {
  return store.getters['persons']
})

const searchPersons = computed<Person[]>(() => {
  return store.getters['searchPersons']
})

const load = computed<boolean>(() => {
  return store.getters['load']
})

onBeforeMount(() => {
  store.dispatch('getPeoples')
})
</script>

<template>
  <div class="wrap">
    <PeoplesTable v-if="!load" :table-content="getPeoples" :table-head="tableHead"/>
    <p v-else>Загружается!</p>
    <SearchAutoComplite :options="searchPersons"/>
  </div>
</template>