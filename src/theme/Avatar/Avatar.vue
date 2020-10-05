<template>
  <div class="Avatar">
    <div
      class="Avatar__wrapper"
      :class="[isBordered ? 'bordered' : 'backgrounded']"
    >
      <div
        v-if="hasOwnAvatar"
        class="Avatar__own"
        :style="{ backgroundImage: `url('${hasOwnAvatar}')` }"
      >
        <!-- <img :src="hasOwnAvatar" alt="avatar image" /> -->
      </div>
      <div v-else class="Avatar__default">
        <span class="Avatar__initials">{{ userInitials }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Avatar",
  props: {
    isBordered: {
      type: Boolean,
      default: false
    },
    user: {
      type: Object
    }
  },
  computed: {
    hasOwnAvatar() {
      const ownAvatar = this.user && this.user.avatar;
      return ownAvatar;
    },
    userInitials() {
      const name =
        this.user && this.user.first_name ? this.user.first_name[0] : "";
      const surname =
        this.user && this.user.last_name ? this.user.last_name[0] : "";
      const initials = name + surname;
      return initials;
    }
  }
};
</script>

<style lang="sass">
@import './Avatar'
</style>
