import {
  LOADING,
  TOGGLE_MENU,
  OPEN_MENU,
  CLOSE_MENU
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
  [CLOSE_MENU](state) {
    state.showMenu = false;
  },
  [OPEN_MENU] (state) {
    state.showMenu = true;
  }
}
const actions = {
  loadPage({ commit }, condition = true) {
    commit(LOADING, condition);
  },
  toggleMenu({ commit }) {
    commit(TOGGLE_MENU);
  },
  closeMenu({ commit }) {
    commit(CLOSE_MENU);
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}