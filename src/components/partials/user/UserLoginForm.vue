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
          <input class="flex --full adopter-input" type="text" v-model="user.email" required>
        </div>
        <div class="form__element flex flex-column">
          <span class="flex align-center">Senha</span>
          <input class="flex --full adopter-input" type="password" v-model="user.password" required>
        </div>
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
import { CheckLoginError } from '../../../services/ErrorHandlerService.js'

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

      } catch (error) {
        this.error = CheckLoginError(error);

        await this.$swal({
          type: 'error',
          title: 'Oops...',
          text: this.error
        });
        
      } finally {
        this.$store.dispatch('loadPage', false);
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
      padding: 0 25px;
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

        .btn {
          height: 40px;
        }
      }
    }
  }
</style>
