<template>
  <div class="Home page">
    <Navbar :is-back-button-visible="false" />
    <div class="container">
      <Welcome />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Welcome from "@/components/Welcome.vue";
import Navbar from "theme/Navbar/Navbar";

export default {
  name: "Home",
  components: {
    Welcome,
    Navbar
  }
};
</script>
