<template>
  <div class="Home page">
    <Navbar />
    <div class="container">
      <Welcome />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Welcome from "@/home/Welcome.vue";
import Navbar from "theme/Navbar/Navbar";

export default {
  name: "Home",
  components: {
    Welcome,
    Navbar
  }
};
</script>
