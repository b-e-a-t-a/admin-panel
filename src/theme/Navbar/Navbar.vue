<template>
  <div>
    <div class="Navbar">
      <div class="Navbar__hamburger" @click="menuVisible = !menuVisible">
        <div class="Navbar__hamburger-longerLine" />
        <div class="Navbar__hamburger-longerLine" />
        <div class="Navbar__hamburger-shorterLine" />

        <transition name="slideRightLeft">
          <div v-if="menuVisible" class="Navbar__hamburger-menu">
            <div
              class="Navbar__hamburger-logout btn-default-short btn-standard btn-ghost"
              @click="logout"
            >
              <div>
                Wyloguj
              </div>
            </div>
          </div>
        </transition>
      </div>
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
      default: false
    }
  },
  data() {
    return {
      menuVisible: false
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    logout() {
      console.log("LOGOUT");
    }
  }
};
</script>

<style lang="sass" scoped>
@import './Navbar'
</style>
