import Vuex from 'vuex'
import Vue from 'vue'
import users from './modules/user'

// Vuex
Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        users
    }
})