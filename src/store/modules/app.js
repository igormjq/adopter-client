import {
  LOADING,
  TOGGLE_MENU
} from '../types/mutation-types';

const state = {
  isLoading: false,
  isLoggedIn: false,
  showMenu: false,
}
const getters = {
  isLoading: state => state.isLoading,
  showMenu: state => state.showMenu
};
const mutations = {
  [LOADING](state, condition) {
    state.isLoading = condition;
  },
  [TOGGLE_MENU](state) {
    state.showMenu = !state.showMenu;
  },
}
const actions = {
  loadPage({ commit }, condition = true) {
    commit(LOADING, condition);
  },
  toggleMenu({ commit }) {
    console.log('clicked');
    commit(TOGGLE_MENU);
  },
}

export default {
  state,
  getters,
  actions,
  mutations
}