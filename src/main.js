import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import routes from './routes'

// Global components
import ContainerComponent from './components/partials/Container'

Vue.use(VueRouter);
Vue.component('container', ContainerComponent);

const router = new VueRouter({
  mode: 'history',
  routes
})

new Vue({
  router,
  el: '#app',
  render: h => h(App)
})
