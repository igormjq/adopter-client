<template>
  <div id="app">
    <header-component />
    <router-view></router-view>
    <footer-component></footer-component>
  </div>
</template>

<script>
import Header from './components/partials/Header'
import Footer from './components/partials/Footer'

export default {
  name: 'app',
  components: {
    'header-component': Header,
    'footer-component': Footer
  },
  data () {
    return {
    }
  },
}
</script>

<style lang="scss">
  @import './assets/scss/main.scss';
  #app {
    // display: flex;
    // flex-direction: column;
    // justify-content: space-between;
  }
</style>
