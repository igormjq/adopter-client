import {
  LOGIN_SUCCESS,
  LOGOUT,
  TOGGLE_MENU,
  SET_USER
} from '../types/mutation-types';

const state = {
  isLoggedIn: !!localStorage.getItem('token'),
  showMenu: false,
  currentUser: {}
}
const getters = {
  isLoggedIn: state => state.isLoggedIn,
  showMenu: state => state.showMenu,
  currentUser: state => state.currentUser
};
const mutations = {
  [LOGIN_SUCCESS](state, user) {
    setTimeout(() => {
      state.isLoggedIn = true;
      state.currentUser = user;
    }, 300);
      
  },
  [LOGOUT](state) {
    setTimeout(() => {
      state.isLoggedIn = false;
      state.setCurrentUser = {};
    }, 300);
  },
  [TOGGLE_MENU](state) {
    state.showMenu = !state.showMenu;
  },
  [SET_USER](state, user) {
    state.currentUser = user;
  }
}
const actions = {
  async login({ commit }, { token, user }) {
      localStorage.setItem('token', token);
      commit(LOGIN_SUCCESS, user);
      commit(TOGGLE_MENU);
  },
  logout({ commit }) {
      localStorage.removeItem('token');
      commit(TOGGLE_MENU);
      commit(LOGOUT);
  },
  toggleMenu({ commit }) {
      commit(TOGGLE_MENU);
  },
  setUser({ commit }, user) {
    commit(SET_USER, user);
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}