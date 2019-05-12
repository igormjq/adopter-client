<template>
  <form class="login-form">
    <div class="login-form__header flex">
      <div 
        class="option flex justify-center align-center --full"
        :class="{ 'active': this.active === 'login' }"
        @click="setActive('login')">Entrar</div>
      <div 
        class="option flex justify-center align-center --full" 
        :class="{ 'active': this.active === 'register' }"
        @click="setActive('register')"
        >Registrar-se</div>
    </div>
  </form>
</template>

<script>
import Card from './Card'
export default {
  components: {
    Card
  },
  data() {
    return {
      active: 'login'
    }
  },
  methods: {
    setActive(value) {
      this.active = value;
    }
  },
}
</script>

<style lang="scss">
  .login-form {
    height: 100vh;
    width: 25vw;
    position: absolute;
    right: 0;
    top: 70px;
    background: #FFF;
    color: black;

    &__header {
      height: 50px;

      .option {
        font-weight: bolder;
        color: #908D8D;
        cursor: pointer;
        transition: opacity .3s;
        border-bottom: 2px solid transparent;

        &:hover {
          opacity: .8;
        }

        &.active {
          color: #EF3176;
          border-bottom-color: #EF3176;
        }
      }
    }
  }
</style>
