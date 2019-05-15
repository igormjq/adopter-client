import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGOUT
} from '../types/mutation-types';

const state = {
    isLoggedIn: !!localStorage.getItem('token'),
    showUserForm: false
}
const getters = {
    isLoggedIn: state => state.isLoggedIn
};
const mutations = {
    [LOGIN_SUCCESS](state) {
        state.isLoggedIn = true;
    },
    [LOGOUT](state) {
        state.isLoggedIn = false;
    }
}
const actions = {
    async login({ commit }, authPayload) {
        commit(LOGIN_REQUEST);

        setTimeout(() => {
            localStorage.setItem('token', authPayload.token);
            commit(LOGIN_SUCCESS);
        }, 3000);
    },
    logout({ commit }) {
        localStorage.removeItem('token');
        commit(LOGOUT);
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}