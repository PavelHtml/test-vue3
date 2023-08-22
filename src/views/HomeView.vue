
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'HomeView',
  components: {
  },
});
</script>

<template>
  <div class="home">
    <nav>
      <router-link to="/peoples">peoples</router-link>
      <router-link to="/favorites">favorites</router-link>
    </nav>
  </div>
</template>

<style>
nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
  margin: 0 10px;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>