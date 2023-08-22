<script setup lang="ts">
  import {Person} from "@/types"

  interface Props {
    properties: string[]
    values: Person | null
  }
  defineProps<Props>()
</script>

<template>
  <ul class="list" v-if="values">
    <li class="list__item" v-for="property in properties" :key="property">
      <span class="list__key">{{property}}</span>
      <span class="list__value" v-if="Array.isArray(values[property])">{{values[property].join(', ')}}</span>
      <span class="list__value" v-else>{{values[property]}}</span>
    </li>
  </ul>
</template>

<style scoped>
  .list__key{
    width: 150px;
    display: inline-block;
  }

  .list {
    list-style-type: none;
  }
</style>