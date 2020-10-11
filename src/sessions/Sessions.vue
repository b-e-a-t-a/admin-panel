<template>
  <div class="Sessions page">
    <Navbar />
    <div class="container">
      <loader v-if="state == 'loading'" />
      <div class="card">
        <h1>
          Component under construction
        </h1>
        <h2>
          It will be ready soon!
        </h2>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "theme/Navbar/Navbar";
import Loader from "theme/Loader";

export default {
  name: "Sessions",
  components: {
    Navbar,
    Loader
  },
  data() {
    return {
      state: null
    }
  }
};
</script>

<style lang="sass" scoped>
@import "./Sessions"
</style>
