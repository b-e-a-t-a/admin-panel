<template>
  <transition name="Loader">
    <div class="Loader">
      <div class="Loader__beat beat-odd"></div>
      <div class="Loader__beat beat-even"></div>
      <div class="Loader__beat beat-odd"></div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "Loader"
};
</script>

<style lang="sass" scoped>
@import './Loader'
</style>
