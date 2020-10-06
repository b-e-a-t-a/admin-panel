<template>
  <transition name="Toast" appear>
    <div class="Toast" :class="{ error: error }">
      <div class="container Toast__container">
        <h3 v-if="title">
          <i v-if="error" class="fas fa-exclamation-triangle"></i>
          {{ title }}
        </h3>
        <div class="Toast__content">
          <slot name="content" />
        </div>
        <slot />
        <slot name="actions" />
        <button class="btn-icon" @click="$emit('close')">
          <span class="far fa-window-close" />
        </button>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "Toast",
  props: {
    title: String,
    close: Function,
    error: Boolean
  },
  mounted() {
    setTimeout(() => this.$emit("close"), 5000);
  }
};
</script>

<style lang="sass">
@import './Toast'
</style>
