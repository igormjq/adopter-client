<template>
  <div id="app">
    <header-component />
    <wrapper-component>
      <router-view></router-view>
    </wrapper-component>
    <footer-component></footer-component>
  </div>
</template>

<script>
import Header from './components/partials/Header'
import Footer from './components/partials/Footer'
import Wrapper from './components/partials/Wrapper'

export default {
  name: 'app',
  components: {
    'header-component': Header,
    'footer-component': Footer,
    'wrapper-component': Wrapper
  },
  data () {
    return {
    }
  }
}
</script>

<style lang="scss">
  @import './assets/_reset.scss';
</style>
