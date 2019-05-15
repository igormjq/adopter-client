import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
  TOGGLE_MENU
} from '../types/mutation-types';

const state = {
  isLoggedIn: !!localStorage.getItem('token'),
  showMenu: false
}
const getters = {
  isLoggedIn: state => state.isLoggedIn,
  showMenu: state => state.showMenu
};
const mutations = {
  [LOGIN_SUCCESS](state) {
      state.isLoggedIn = true;
  },
  [LOGOUT](state) {
      state.isLoggedIn = false;
  },
  [TOGGLE_MENU](state) {
      state.showMenu = !state.showMenu;
  }
}
const actions = {
  async login({ commit }, authPayload) {
    commit(LOGIN_REQUEST);

    localStorage.setItem('token', authPayload.token);
    commit(TOGGLE_MENU);
    commit(LOGIN_SUCCESS);
  },
  logout({ commit }) {
      localStorage.removeItem('token');
      commit(TOGGLE_MENU);
      commit(LOGOUT);
  },
  toggleMenu({ commit }) {
      commit(TOGGLE_MENU);
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}