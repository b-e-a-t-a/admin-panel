<template>
  <div class="Welome card">
    <h1 class="Welcome__header">Welcome to My Vue.js Admin Panel App</h1>
    <img alt="Vue logo" src="../assets/logo.png" />
    <div class="Welcome__icons">
      <div class="Welcome__icon" @click="this.$router.push('/mentors')">
        <i class="fas fa-chalkboard-teacher" />
        <h3 class="Welcome__text">Mentors</h3>
      </div>
      <div class="Welcome__icon" @click="this.$router.push('/members')">
        <i class="fas fa-users" />
        <h3 class="Welcome__text">Members</h3>
      </div>
      <div class="Welcome__icon" @click="this.$router.push('/sessions')">
        <i class="fas fa-comments" />
        <h3 class="Welcome__text">Sessions</h3>
      </div>
    </div>
    <div class="Welcome__buttonsWrapper">
      <h2>buttons primary</h2>
      <div class="Welcome__buttons primary">
        <div class="Welcome__button">
          <button class="btn-default-tall btn-wide btn-primary">
            btn-primary
          </button>
        </div>
        <div class="Welcome__button">
          <button class="btn-default-tall btn-wide btn-primary-light">
            btn-primary-light
          </button>
        </div>
        <div class="Welcome__button">
          <button class="btn-default-tall btn-wide btn-primary-dark">
            btn-primary-dark
          </button>
        </div>
      </div>

      <h2>buttons secondary</h2>
      <div class="Welcome__buttons secondary">
        <div class="Welcome__button">
          <button class="btn-default-tall btn-wide btn-secondary">
            btn-secondary
          </button>
        </div>
        <div class="Welcome__button">
          <button class="btn-default-tall btn-wide btn-secondary-light">
            btn-secondary-light
          </button>
        </div>
        <div class="Welcome__button">
          <button class="btn-default-tall btn-wide btn-secondary-dark">
            btn-secondary-dark
          </button>
        </div>
      </div>

      <h2>buttons ghost</h2>
      <div class="Welcome__buttons ghost">
        <div class="Welcome__button">
          <button class="btn-default-tall btn-wide btn-ghost">
            btn-ghost
          </button>
        </div>
        <div class="Welcome__button">
          <button class="btn-default-tall btn-wide btn-ghost-primary">
            btn-ghost-primary
          </button>
        </div>
        <div class="Welcome__button">
          <button class="btn-default-tall btn-wide btn-ghost-secondary">
            btn-ghost-secondary
          </button>
        </div>
        <div class="Welcome__button">
          <button class="btn-default-tall btn-wide btn-white">
            btn-white
          </button>
        </div>
      </div>

      <h2>buttons gradient & color</h2>
      <div class="Welcome__buttons secondary">
        <div class="Welcome__button">
          <button class="btn-default-tall btn-wide btn-gradient">
            btn-gradient
          </button>
        </div>
        <div class="Welcome__button">
          <button class="btn-default-tall btn-wide btn-gradient-light">
            btn-gradient-light
          </button>
        </div>
        <div class="Welcome__button">
          <button class="btn-default-tall btn-wide btn-gradient-dark">
            btn-gradient-dark
          </button>
        </div>
        <div class="Welcome__button">
          <button class="btn-default-tall btn-wide btn-gradient-brown">
            btn-gradient-brown
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Welcome"
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
@import "~theme/common-style"

.Welcome
  &__header
    margin-bottom: 2rem
  &__icons
    display: flex
    flex-wrap: wrap
    justify-content: center
    margin: 1rem auto
  &__icon
    margin: 1rem
    padding: .5rem
    border: 2px solid $color-icon
    border-radius: 5px
    cursor: pointer
    i
      +font(5rem)
      color: $color-icon
      padding: 1rem
      flex: 0 1 10rem
    &:hover
      background: $color-icon
      color: $color-white
      i
        color: $color-white
  &__buttons
    display: grid
    grid-gap: 1rem
    grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr))
    margin: 1rem auto
    &Wrapper
      margin: 3rem auto
      h2
        padding-top: 2rem
        border-top: 1px dotted rgba($color-secondary, .5)
</style>
