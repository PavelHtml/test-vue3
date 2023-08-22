<script setup lang="ts">
interface Props {
  color?: string
}
const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'click'): void
}>()
</script>

<template>
  <button class="button" :class="[props.color]" @click.prevent="emit('click')"><slot/></button>
</template>

<style scoped>

.button {
  border: 0;
  background: #2c3e50;
  color: #fff;
  padding: 2px 6px;
  cursor: pointer;
}

.button + .button {
  margin-left: 10px;
}

.red {
  background: #ff5555;
}

.green {
  background: #42b983;
}

</style>