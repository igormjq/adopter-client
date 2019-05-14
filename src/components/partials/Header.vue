<template>
  <header class="header">
    <container>
      <div class="header__left flex align-center space-between --full">
        <div class="logo flex align-center">
          <img src="../../assets/img/logo.png" alt="Adopter logo">
        </div>
        <div class="header__options">
          <ul class="flex">
            <li>Sobre nós</li>
            <li>Como adotar</li>
            <li>Parceiros</li>
          </ul>
        </div>
      </div>
      <div class="header__right flex align-center --full">
        <button class="btn" @click="toggleUserMenu">Entrar</button>
      </div>
    </container>
    <transition name="slide">
      <user-area-component v-show="showUserForm"></user-area-component>
    </transition>
  </header>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import UserArea from './user/UserArea'
export default {
  components: {
    'user-area-component': UserArea
  },
  computed: {
    ...mapState({
      showUserForm: state => state.user.showUserForm
    })
  },
  methods: {
    ...mapActions([
      'toggleUserMenu'
    ])
  }
}
</script>

<style lang="scss">
  .header {
    height: 70px;
    width: 100%;
    box-shadow: 1px 4px 10px rgba(0, 0, 0, 0.25);
    display: flex;
    align-items: center;
    background: #FFF;
    position: fixed;
    z-index: 1;

    >.container {
      justify-content: space-between;
    }

    &__left {
      .logo {
        img {
          max-width: 110px;
        }
      }
      .header__options {
        font-weight: lighter;
        cursor: pointer;
        ul {
          li {
            padding: 0 15px;
            color: #9D9D9D;
          }
        }
      }
    }

    &__right {
      justify-content: flex-end;
      color: #EF3176;
    }
  }
</style>
