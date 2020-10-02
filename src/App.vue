<template>
  <div id="root">
    <div class="App-nav">
      <Navigation />
      <!-- <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> -->
    </div>
    <router-view />
  </div>
</template>

<script>
import Navigation from "theme/Navigation";

export default {
  name: "App",
  components: {
    Navigation
  }
};
</script>

<style lang="sass">
#root
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  text-align: center
</style>
