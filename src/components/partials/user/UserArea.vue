<template>
  <nav class="user-area" :class="{ 'is-logged': isLoggedIn }">
    <UserLoginForm v-if="!isLoggedIn" />
    <UserMenu v-else />
  </nav>
</template>

<script>
import { mapGetters } from 'vuex';
import UserLoginForm from './UserLoginForm';
import UserMenu from './UserMenu';

export default {
  components: {
    UserLoginForm,
    UserMenu
  },
  computed: {
    ...mapGetters([
      'isLoggedIn'
    ])
  }
}
</script>

<style lang="scss">
  .user-area {
    height: 100vh;
    width: 285px;
    right: 0;
    top: 70px;
    position: absolute;
    background: #FFF;
    box-shadow: 1px 10px 10px rgba(0, 0, 0, 0.25);

    &.is-logged {
      height: auto;
    }
  }
</style>
