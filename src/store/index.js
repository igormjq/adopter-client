import Vuex from 'vuex'
import Vue from 'vue'
import user from './modules/user'
import animal from './modules/animal';

// Vuex
Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        user,
        animal
    }
})