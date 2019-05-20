import {
  LOADING
} from '../types/mutation-types';

const state = {
  isLoading: false
}
const getters = {
  isLoading: state => state.isLoading
};
const mutations = {
  [LOADING](state, condition) {
    state.isLoading = condition;
  }
}
const actions = {
  loadPage({ commit }, condition = true) {
    commit(LOADING, condition);
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}