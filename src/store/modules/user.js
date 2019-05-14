import { SET_CURRENT_USER } from '../types/mutation-types';

const state = {
    currentUser: {},
}
const getters = {}
const mutations = {
    [SET_CURRENT_USER](state, user) {
        state.currentUser = user;

        console.log('O ESTADO FICOU ASIM', state);
    }
}
const actions = {
    async logUser({ commit }, user) {
        commit(SET_CURRENT_USER, user);
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}