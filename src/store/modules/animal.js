import { 
  UPDATE_SEARCH_TYPE,
  UPDATE_SEARCH_GENDER,
  UPDATE_SEARCH_SIZE,
  UPDATE_SEARCH_AGE_GROUP
} from '../types/mutation-types';

const state = {
  edit: {},
  search: {
    size_in: ['SMALL', 'MEDIUM', 'LARGE'],
    gender_in: ['MALE', 'FEMALE'],
    type_in: ['DOG', 'CAT'],
    ageGroup_in: ['ADULT', 'PUPPY'],
    address: {
      city_contains: '',
    }
  }
}
const getters = {}
const mutations = {
  [UPDATE_SEARCH_TYPE](state, types) {
    state.search.type_in = types.map(({ value }) => value);
  },
  [UPDATE_SEARCH_SIZE](state, sizes) {
    state.search.size_in = sizes.map(({ value }) => value);
  },
  [UPDATE_SEARCH_GENDER](state, gender) {
    state.search.gender_in = gender.map(({ value }) => value);
  },
  [UPDATE_SEARCH_AGE_GROUP](state, ageGroups) {
    state.search.ageGroup_in = ageGroups.map(({ value }) => value);
  },
}
const actions = {
  updateType({ commit }, types) {
    commit(UPDATE_SEARCH_TYPE, types);
  },
  updateSize({ commit }, sizes) {
    commit(UPDATE_SEARCH_SIZE, sizes);
  },
  updateGender({ commit }, genders) {
    commit(UPDATE_SEARCH_GENDER, genders)
  },
  updateAgeGroup({ commit }, ageGroups) {
    commit(UPDATE_SEAERCH_AGE_GROUP, ageGroups);
  }
}

export default {
    state,
    getters,
    actions,
    mutations
}