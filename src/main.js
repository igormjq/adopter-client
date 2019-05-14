import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import VueApollo from 'vue-apollo'
import routes from './routes'
import apolloClient from './apollo'
import store from './store'

// Global components
import ContainerComponent from './components/partials/Container'

Vue.component('container', ContainerComponent);

// Router
Vue.use(VueRouter);
Vue.use(VueApollo);

const apolloProvider = new VueApollo({
  defaultClient: apolloClient
})

const router = new VueRouter({
  mode: 'history',
  routes
})

new Vue({
  router,
  apolloProvider,
  store,
  el: '#app',
  render: h => h(App)
})
