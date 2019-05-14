<template>
  <nav class="user-area" :class="{ 'is-logged': user.id }">
    <UserLoginForm v-if="!user.id" />
    <UserMenu v-if="user.id"/>
  </nav>
</template>

<script>
import { mapState } from 'vuex';
import UserLoginForm from './UserLoginForm';
import UserMenu from './UserMenu';

export default {
  components: {
    UserLoginForm,
    UserMenu
  },
  computed: {
    ...mapState({
      user: state => state.user.currentUser
    })
  },
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
