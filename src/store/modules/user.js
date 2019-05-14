import { 
    SET_CURRENT_USER,
    TOGGLE_USER_MENU
} from '../types/mutation-types';

const state = {
    currentUser: {},
    showUserForm: false
}
const getters = {};
const mutations = {
    [SET_CURRENT_USER](state, user) {
        state.currentUser = user;
    },
    [TOGGLE_USER_MENU](state) {
        state.showUserForm = !state.showUserForm;
    }
}
const actions = {
    async logUser({ commit }, user) {
        commit(SET_CURRENT_USER, user);
    },
    toggleUserMenu({ commit }) {
        commit(TOGGLE_USER_MENU);
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}