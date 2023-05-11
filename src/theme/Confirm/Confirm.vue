<template>
  <form class="Confirm__form" @submit.prevent="$emit('accept')">
    <div class="Confirm__body">
      <p>{{ confirmQuestion }}</p>
    </div>
    <div class="Confirm__formBtns">
      <button
        type="button"
        class="btn-default-medium btn-standard btn-secondary"
        @click="$emit('close')"
      >
        No
      </button>
      <button class="btn-default-medium btn-standard btn-primary" type="submit">
        {{ buttonText }}
      </button>
    </div>
  </form>
</template>

<script>
export default {
  name: "Confirm",
  props: {
    confirmQuestion: String,
    buttonText: String
  },
  emits: ["accept", "close"]
};
</script>

<style lang="sass">
@import './Confirm'
</style>
