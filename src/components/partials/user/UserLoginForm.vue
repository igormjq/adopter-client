<template>
  <div class="login-form">
    <div class="login-form__header flex flex-column align-center justify-center">
      <h2>Entre</h2>
      <h3>Insira suas credenciais para ajudar na causa!</h3>
    </div>
    <form class="form" @submit.prevent="logUser">
      <div class="form__body">
        <div class="form__element flex flex-column">
          <span class="flex align-center">Email</span>
          <input class="flex --full" type="text" v-model="user.email" required>
        </div>
        <div class="form__element flex flex-column">
          <span class="flex align-center">Senha</span>
          <input class="flex --full" type="password" v-model="user.password" required>
        </div>
        <p v-if="error">{{ error }}</p>
      </div>
        <div class="form__footer flex">
          <button class="btn btn-block pink" type="submit">ENTRAR</button>
        </div>
    </form>
  </div>
</template>

<script>
import Card from '../../Card'
import { LOG_USER } from '../../../graphql/mutations.js'

export default {
  components: {
    Card
  },
  data() {
    return {
      error: null,
      user: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    async logUser() {
      this.$store.dispatch('loadPage');
      
      try {
        const { data } = await this.$apollo.mutate({
          mutation: LOG_USER,
          variables: {
            email: this.user.email,
            password: this.user.password
          }
        });

        this.$store.dispatch('login', data.login);
        this.$store.dispatch('loadPage', false);

      } catch(e) {
        this.error = e.message.split('error:')[1];
      }
    },
    resetForm() {
      this.user.email = ''
      this.user.password = ''
    }
  },
}
</script>

<style lang="scss">
  .login-form {
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
      margin: 0 auto;
      &__body {
        .form__element {
          span {
            font-size: 12px;
            font-weight: 400;
            margin-bottom: 5px;
          }
        }
      }
      &__footer {
        margin-top: 25px;
      }
    }
  }
</style>
