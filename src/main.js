import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import VueApollo from 'vue-apollo'
import VueToasted from 'vue-toasted'
import Multiselect from 'vue-multiselect'
import { library } from '@fortawesome/fontawesome-svg-core'
import { 
  faSearch, 
  faCat, 
  faDog, 
  faHeart, 
  faInfoCircle, 
  faSignOutAlt, 
  faPaw,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon, FontAwesomeLayers } from '@fortawesome/vue-fontawesome'
import routes from './routes'
import apolloClient from './apollo'
import store from './store'
import '../node_modules/vue-multiselect/dist/vue-multiselect.min.css'

// Global components
import ContainerComponent from './components/partials/Container'

library.add(faSearch, faCat, faDog, faHeart, faInfoCircle, faSignOutAlt, faPaw, faHeart);

Vue.component('container', ContainerComponent);
Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.component('font-awesome-layers', FontAwesomeLayers);
Vue.component('multiselect', Multiselect);

// Router
Vue.use(VueRouter);
Vue.use(VueApollo);
Vue.use(VueToasted, { iconPack: 'fontawesome' });

const apolloProvider = new VueApollo({
  defaultClient: apolloClient
});

const router = new VueRouter({
  mode: 'history',
  routes
});

/**
 * Scroll to top of the current view after redirection
 */
router.afterEach(() => {
  window.scrollTo(0,0);
})

new Vue({
  router,
  apolloProvider,
  store,
  el: '#app',
  render: h => h(App)
})
