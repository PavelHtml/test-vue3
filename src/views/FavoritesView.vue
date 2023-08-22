<script setup lang="ts">
import PeoplesTable from "@/components/PeoplesTable.vue"
import {useStore} from "vuex"
import {computed} from "vue"
import {Person} from "@/types";
const store = useStore()
const tableHead:Array<keyof Person> = ['name', 'height', 'mass', 'hair_color']

const getPeoples = computed<Person[]>(() => {
  return store.getters['favorites']
})
</script>

<template>
  <div class="wrap">
    <PeoplesTable :table-content="getPeoples" :table-head="tableHead"/>
  </div>
</template>