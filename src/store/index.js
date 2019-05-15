import Vuex from 'vuex'
import Vue from 'vue'
import user from './modules/user'
import animal from './modules/animal';
import app from './modules/app'

// Vuex
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    app,
    user,
    animal
  },
})