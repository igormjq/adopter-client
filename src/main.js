import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import VueApollo from 'vue-apollo'
import VueToasted from 'vue-toasted'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCoffee, faHeart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import routes from './routes'
import apolloClient from './apollo'
import store from './store'

// Global components
import ContainerComponent from './components/partials/Container'

library.add(faCoffee, faHeart);

Vue.component('container', ContainerComponent);
Vue.component('font-awesome-icon', FontAwesomeIcon);

// Router
Vue.use(VueRouter);
Vue.use(VueApollo);
Vue.use(VueToasted, { iconPack: 'fontawesome' });

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
