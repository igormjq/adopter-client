<template>
  <header class="header">
    <div class="header__left flex align-center space-between --full">
      <router-link to="/" tag="div" class="logo flex align-center">
        <img src="../../assets/img/logo.png" alt="Adopter logo">
      </router-link>
      <div class="header__options">
        <ul class="flex">
          <li>Sobre nós</li>
          <li>Como adotar</li>
          <li>Parceiros</li>
          <router-link to="/animals" tag="li">Animais</router-link>
        </ul>
      </div>
    </div>
    <div class="header__right flex align-center --full">
      <button class="btn flex align-center" @click="toggleMenu" v-if="!isLoggedIn">
        <span class="icon icon-paw --pink"/>
        <span>Entrar</span>
      </button>
      <div class="user-info flex align-center" @click="toggleMenu" v-else>
        <div class="user-name">
          {{ user.name }}
        </div>
        <div class="user-avatar">
          <img class="img-responsive" :src="user.profileImg">
        </div>
      </div>
    </div>
    <transition name="slide">
      <user-area v-show="showMenu"></user-area>
    </transition>
  </header>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import UserArea from './user/UserArea'

export default {
  components: {
    UserArea
  },
  computed: {
    ...mapGetters([
      'showMenu',
      'isLoggedIn',
      'user'
    ])
  },
  methods: {
    ...mapActions([
      'toggleMenu'
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
    padding: 0 15px;

    >.container {
      justify-content: space-between;
    }

    &__left {
      .logo {
        cursor: pointer;
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

      .btn {
        padding: 0 10px;
        height: 35px;
      }
    }

    .user {
      &-info {
        cursor: pointer;
      }
      &-avatar {
        width: 30px;
        margin-left: 10px;

        img {
          border-radius: 50%;
        }
      }
    }
  }
</style>
