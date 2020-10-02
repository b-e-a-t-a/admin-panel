<template>
  <div>
    <div class="Navbar">
      <button
        v-show="isBackButtonVisible"
        class="Navbar__back btn-default-short btn-standard btn-back btn-gradient"
        @click="goBack()"
      >
        <span>Back</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  props: {
    isBackButtonVisible: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="sass" scoped>
@import './Navbar'
</style>
