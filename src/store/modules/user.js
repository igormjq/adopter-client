import {
  LOGIN_SUCCESS,
  LOGOUT,
  TOGGLE_MENU,
  SET_USER,
  ADD_FAVORITE_ANIMAL,
  REMOVE_FAVORITE_ANIMAL
} from '../types/mutation-types';

const state = {
  isLoggedIn: false,
  user: null
}
const getters = {
  isLoggedIn: state => state.isLoggedIn,
  showMenu: state => state.showMenu,
  user: state => state.user
};
const mutations = {
  [LOGIN_SUCCESS](state, user) {
    setTimeout(() => {
      state.isLoggedIn = true;
      state.user = user;
    }, 300);
      
  },
  [LOGOUT](state) {
    setTimeout(() => {
      state.isLoggedIn = false;
      state.user = null;
    }, 300);
  },
  [SET_USER](state, user) {
    state.user = user;
    state.isLoggedIn = true;
  },
  [ADD_FAVORITE_ANIMAL](state, animal) {
    state.user.favoriteAnimals.push(animal);
  },
  [REMOVE_FAVORITE_ANIMAL](state, animalId) {
    state.user.favoriteAnimals = state.user.favoriteAnimals.filter(animal => animal.id != animalId);
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
  setUser({ commit }, user) {
    commit(SET_USER, user);
  },
  addFavoriteAnimal({ commit }, animal) {
    commit(ADD_FAVORITE_ANIMAL, animal);
  },
  removeFavoriteAnimal({ commit }, { id }) {
    commit(REMOVE_FAVORITE_ANIMAL, id);
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}