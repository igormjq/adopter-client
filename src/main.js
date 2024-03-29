import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import VueApollo from 'vue-apollo'
import VueToasted from 'vue-toasted'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import VueSweetAlert from 'vue-sweetalert2'
import Multiselect from 'vue-multiselect'
import AdopterRadioInput from './components/AdopterRadio.vue'
import AdopterCheckboxInput from './components/AdopterCheckbox.vue'
import { FontAwesomeIcon, FontAwesomeLayers } from '@fortawesome/vue-fontawesome'
import routes from './routes'
import apolloClient from './apollo'
import store from './store'
import '../node_modules/vue-multiselect/dist/vue-multiselect.min.css'
import 'swiper/dist/css/swiper.css'
import 'sweetalert2/dist/sweetalert2.min.css'
import './icons';

// Global components
import ContainerComponent from './components/partials/Container'

Vue.component('container', ContainerComponent);
Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.component('font-awesome-layers', FontAwesomeLayers);
Vue.component('multiselect', Multiselect);
Vue.component('adopter-radio', AdopterRadioInput);
Vue.component('adopter-checkbox', AdopterCheckboxInput);

// Router
Vue.use(VueRouter);
Vue.use(VueApollo);
Vue.use(VueToasted, { iconPack: 'fontawesome' });
Vue.use(VueAwesomeSwiper);
Vue.use(VueSweetAlert, {});

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
