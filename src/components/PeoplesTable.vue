<template>
  <table class="table">
    <thead>
      <tr>
        <th v-for="(head, index) in props.tableHead" :key="`H-${index}`">{{head}}</th>
        <th>Add Favorite/Remove favorite</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(people, index) in props.tableContent" :key="`P-${index}`">
        <td v-for="(head, index) in props.tableHead" :key="`H-${index + head}`">{{people[head]}}</td>
        <td>
          <ButtonTest v-if="people.favorite" color="red" @click="removeFavoritePerson(people)">Удалить</ButtonTest>
          <ButtonTest v-else color="green" @click="addFavoritePerson(people)">Добавить</ButtonTest>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts" setup>
  import {defineProps} from 'vue'
  import ButtonTest from "@/components/UI/ButtonTest.vue";
  import {Person} from "@/types";
  import {useStore} from "vuex";

  const store = useStore()
  interface Props {
    tableHead: string[] | null,
    tableContent: Person[] | null
  }
  const props = defineProps<Props>();
  const addFavoritePerson = (person:Person):void => {
    store.commit('addFavoritePerson', person)
  }
  const removeFavoritePerson = (person:Person):void => {
    store.commit('removeFavoritePerson', person)
  }
</script>

<style scoped>

.table {
  width: 100%;
  text-align: left;
}

.table td {
  padding-top: 10px;
}

</style>
