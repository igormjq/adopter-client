<template>
  <nav class="user-area" :class="{ 'is-logged': isLoggedIn }">
    <UserLoginForm v-if="!isLoggedIn" />
    <UserMenu v-if="isLoggedIn"/>
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
    width: 100vw;
    right: 0;
    top: 70px;
    position: absolute;
    background: #FFF;
    padding: 0 25px;
    
    &.is-logged {
      width: 30vw;
    }
  }
</style>
