<template>
  <form class="login-form">
    <div class="login-form__header flex flex-column align-center justify-center">
      <h2>Entre</h2>
      <h3>Insira suas credenciais para ajudar na causa!</h3>
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
    }
  },
  methods: {
    
  },
}
</script>

<style lang="scss">
  .login-form {
    height: 100vh;
    width: 25vw;
    right: 0;
    top: 70px;
    position: absolute;
    background: #FFF;
    color: black;

    &__header {
      color: #EF3176;
      
      h2 {
        font-size: 24px;
        font-weight: 700;
      }
      h3 {
        font-size: 12px;
        font-weight: 500;
        margin-top: 5px;
        font-weight: 300;
      }
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
