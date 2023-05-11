<template>
  <div>
    <nav class="Navigation">
      <router-link to="/" class="Navigation__logo">
        <img alt="Vue logo" :src="require('../../assets/logo.png')" />
      </router-link>
      <div class="Navigation__navItems">
        <router-link
          v-for="l in navLinks"
          :key="l.to"
          :to="l.to"
          :class="[
            'Navigation__navItem',
            { active: activeLink && activeLink.to == l.to }
          ]"
        >
          <span class="Navigation__navIcon">
            <i :class="l.icon"></i>
          </span>
          <span class="Navigation__navLabel">{{ l.label }}</span>
        </router-link>
      </div>
      <div class="Navigation__hamburger" @click="menuVisible = !menuVisible">
        <div class="Navigation__hamburger-longerLine" />
        <div class="Navigation__hamburger-longerLine" />
        <div class="Navigation__hamburger-shorterLine" />

        <transition name="slideLeftRight">
          <div v-if="menuVisible" class="Navigation__hamburger-menu">
            <div
              class="Navigation__hamburger-logout btn-default-short btn-standard btn-primary"
              @click="logout"
            >
              <div>
                Wyloguj
              </div>
            </div>
          </div>
        </transition>
      </div>
    </nav>
  </div>
</template>

<script>
const navLinks = [
  { to: "/mentors", label: "Mentors", icon: "fas fa-chalkboard-teacher" },
  { to: "/members", label: "Members", icon: "fas fa-users" },
  { to: "/sessions", label: "Sessions", icon: "fas fa-comments" }
];

export default {
  name: "Navigation",
  data() {
    return {
      navLinks,
      activeLink: navLinks.find(l => this.$route.path.indexOf(l.to) == 0),
      menuVisible: false
    };
  },
  watch: {
    $route(to) {
      this.activeLink = this.navLinks.find(l => to.path.indexOf(l.to) == 0);
    }
  }
};
</script>

<style lang="sass" scoped>
@import "./Navigation"
</style>
