<script setup lang="ts">
import PersonOptionList from "@/components/PersonOptionList.vue";
import {computed, onBeforeMount} from "vue";
import {useStore} from "vuex";
import {Person} from "@/types";
import {useRoute} from "vue-router";

const store = useStore()
const route = useRoute()

const personProperties = computed<string[]>(() => {
  let objectKeys =  store.getters['currentPersons'] ? Object.keys(store.getters['currentPersons']) : []
  return objectKeys
})
const person = computed<Person>(() => {
  return store.getters['currentPersons']
})

onBeforeMount(() => {
  if (person.value) return
  store.dispatch('getPerson', route.params.id)
})
</script>
<template>
  <div class="wrap">
    <PersonOptionList :values="person" :properties="personProperties"/>
  </div>
</template>