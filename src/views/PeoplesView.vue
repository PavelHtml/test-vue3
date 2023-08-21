<template>
  <div class="wrap">
    <PeoplesTable :table-content="getPeoples" :table-head="tableHead"/>
  </div>
</template>
<script setup lang="ts">
  import PeoplesTable from "@/components/PeoplesTable.vue";
  import {useStore} from "vuex";
  import {computed, onBeforeMount} from "vue";
  const store = useStore();
  const tableHead:string[] = ['name', 'height', 'mass', 'hair_color']

  const getPeoples = computed(() => {
    return store.getters['peoples']
  })

onBeforeMount(() => {
  store.dispatch('getPeoples')
})

</script>