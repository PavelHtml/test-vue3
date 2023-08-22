<script lang="ts" setup>
import {computed} from 'vue'
import ButtonTest from "@/components/UI/ButtonTest.vue";
import {Person} from "@/types";
import {useStore} from "vuex";
import {Pagination} from "@/store/types";

const store = useStore()
interface Props {
  tableHead: Array<keyof Person>,
  tableContent: Person[] | null
}
const props = defineProps<Props>();
const addFavoritePerson = (person:Person) => {
  store.commit('addFavoritePerson', person)
}
const removeFavoritePerson = (person:Person) => {
  store.commit('removeFavoritePerson', person)
}

const pagination = computed(():Pagination => {
  return store.getters['pagination']
})
const setPages = (id:number) => {
  store.dispatch('getPeoplesPages', id)
}
</script>

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
  <div class="pagination">
    <ButtonTest class="pagination__prev" v-if="pagination.prev" color="green" @click="setPages(pagination.prev)">Предидущая</ButtonTest>
    <ButtonTest class="pagination__next" v-if="pagination.next" color="green" @click="setPages(pagination.next)">Следующая</ButtonTest>
  </div>
</template>

<style scoped>

.table {
  width: 100%;
  text-align: left;
}

.table td {
  padding-top: 10px;
}

.pagination__prev {
  float: left;
}

pagination__next {
  float: right;
}
</style>
