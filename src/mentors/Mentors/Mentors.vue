<template>
  <div class="Mentors page">
    <Navbar />
    <div class="container">
      <loader v-if="state == 'loading'" />
      <div class="card">
        <div class="Mentors__header">
          <h2>Mentors list</h2>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "theme/Navbar/Navbar";
import Loader from "theme/Loader";

export default {
  name: "Mentors",
  components: {
    Navbar,
    Loader
  },
  data() {
    return {
      state: null
    };
  }
};
</script>

<style lang="scss" scoped>
@import "./Mentors";
</style>
