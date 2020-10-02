<template>
  <div class="Welome card">
    <h1 class="Welcome__header">Welcome to My Vue.js Admin Panel App</h1>
    <img alt="Vue logo" src="../assets/logo.png" />
    <div class="Welcome__icons">
      <div class="Welcome__icon" @click="this.$router.push('/trainers')">
        <i class="fas fa-chalkboard-teacher" />
        <h3 class="Welcome__text">Mentors</h3>
      </div>
      <div class="Welcome__icon" @click="this.$router.push('/users')">
        <i class="fas fa-users" />
        <h3 class="Welcome__text">Users</h3>
      </div>
      <div class="Welcome__icon" @click="this.$router.push('/sessions')">
        <i class="fas fa-comments" />
        <h3 class="Welcome__text">Sessions</h3>
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
</style>
