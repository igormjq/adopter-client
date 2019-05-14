<template>
  <form class="form login-form">
    <div class="login-form__header flex flex-column align-center justify-center">
      <h2>Entre</h2>
      <h3>Insira suas credenciais para ajudar na causa!</h3>
    </div>
    <div class="form__body">
      <div class="form__element flex align-center">
        <span class="flex align-center">Email</span>
        <input class="flex --full" type="text" v-model="user.email">
      </div>
      <div class="form__element flex align-center">
        <span class="flex align-center">Senha</span>
        <input class="flex --full" type="password" v-model="user.password">
      </div>
    </div>
    <div class="form__footer flex">
      <button-component 
        :onClick="logUser"
        class="btn-block pink" 
        :height="40">
          Acessar
      </button-component>
    </div>
  </form>
</template>

<script>
import Card from './Card'
import { LOG_USER } from '../graphql/mutations'
export default {
  components: {
    Card
  },
  data() {
    return {
      user: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    async logUser() {
      const { data: { login }} = await this.$apollo.mutate({
        mutation: LOG_USER,
        variables: {
          email: this.user.email,
          password: this.user.password
        }
      });

      this.$store.dispatch('logUser', login.user);      
    }
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
    padding: 0 25px;

    &__header {
      color: #EF3176;
      margin-bottom: 25px;
      
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
    }

    .form {
      &__body {
        .form__element {
          display: grid;
          grid-template-columns: 60px 1fr;
        }
      }
      &__footer {
        margin-top: 25px;
      }
    }
  }
</style>
