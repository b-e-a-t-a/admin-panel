<template>
  <div id="root">
    <div class="App-nav">
      <Navigation />
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
