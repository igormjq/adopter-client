import {
  ADD_FAVORITE_ANIMAL,
  REMOVE_FAVORITE_ANIMAL
} from '../types/mutation-types';

const state = {
  edit: {},
  searchFilter: {
    size: '',
    gender: '',
    type: '',
    ageGroup: '',
    address: {
      uf: '',
      city: ''
    }
  }
}
const getters = {}
const mutations = {
  [ADD_FAVORITE_ANIMAL](state, animal) {
    console.log('O PORRA DO CARALHO');
    this.state.user.currentUser.favoriteAnimals.push(animal);
  },
  [REMOVE_FAVORITE_ANIMAL](state, animalId) {
    this.state.user.currentUser.favoriteAnimals = this.state.user.currentUser
      .favoriteAnimals.filter(animal => animal.id != animalId);
  }
}
const actions = {
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