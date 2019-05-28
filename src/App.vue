<template>
  <div id="app" :class="{ 'loading': isLoading }">
    <header-component />
    <transition name="enter">
      <router-view></router-view>
    </transition>
    <footer-component></footer-component>
    <Spinner v-if="isLoading" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { USER_ME } from './graphql/queries'
import HeaderComponent from './components/partials/Header'
import FooterComponent from './components/partials/Footer'
import Spinner from './components/Spinner'

export default {
  name: 'app',
  components: {
    HeaderComponent,
    FooterComponent,
    Spinner
  },
  computed: {
    ...mapGetters([
      'isLoading'
    ])
  },
  async mounted() {
    const token = localStorage.getItem('token');
    this.$store.dispatch('loadPage');

    if(token) {
      try {
        const { 
          data: { 
              me 
            } 
          } = await this.$apollo.query({
          query: USER_ME
        });
        this.$store.dispatch('setUser', me);

      } catch(error) {
        console.log('Erro', error);
        alert('Não autorizado');
      }
    }

    this.$store.dispatch('loadPage', false);
  }
}
</script>

<style lang="scss">
  @import './assets/scss/main.scss';
  #app {
    section {
      padding-top: 70px;
      min-height: 100vh
    }
    &.loading {
      overflow: hidden;
      &:after {
        content: '';
        position: fixed;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, .4);
        top: 0;
        left: 0;
        z-index: 1;
      }
    }
  }
</style>
