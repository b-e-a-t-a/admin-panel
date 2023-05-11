<template>
  <transition name="Modal" appear>
    <div
      ref="modal"
      class="Modal"
      tabindex="0"
      @keydown.esc="$emit('close')"
      @click.stop="$emit('close')"
    >
      <div class="Modal__wrapper" @click.stop>
        <div :class="['Modal__container', { map: Boolean(map) }]">
          <div class="Modal__close">
            <button class="btn-icon" @click.stop="$emit('close')">
              <i class="far fa-window-close" @click.stop="$emit('close')"></i>
            </button>
          </div>

          <slot name="loader" />

          <div class="Modal__header">
            <slot name="header" />
          </div>

          <div :class="['Modal__content', { map: Boolean(map) }]">
            <slot name="content" />
            <slot />
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "Modal",
  props: {
    map: Boolean
  },
  emits: ["close"],
  mounted() {
    this.$refs.modal.focus();
  }
};
</script>

<style lang="sass">
@import './Modal'
</style>
