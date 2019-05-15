import {
  LOGIN_SUCCESS,
  LOGOUT,
  TOGGLE_MENU,
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
    setTimeout(() => {
      state.isLoggedIn = true;
    }, 300);
      
  },
  [LOGOUT](state) {
    setTimeout(() => {
      state.isLoggedIn = false;
    }, 300);
  },
  [TOGGLE_MENU](state) {
      state.showMenu = !state.showMenu;
  }
}
const actions = {
  async login({ commit }, authPayload) {
      localStorage.setItem('token', authPayload.token);
      commit(LOGIN_SUCCESS);
      commit(TOGGLE_MENU);
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