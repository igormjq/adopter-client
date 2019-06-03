import { 
  UPDATE_SEARCH_TYPE,
  UPDATE_SEARCH_GENDER,
  UPDATE_SEARCH_SIZE,
  UPDATE_SEARCH_AGE_GROUP,
  UPDATE_SEARCH_CITY,
  RESET_SEARCH_FILTER
} from '../types/mutation-types';

const INITIAL_STATE = {
  size_in: ['SMALL', 'MEDIUM', 'LARGE'],
  gender_in: ['MALE', 'FEMALE'],
  type_in: ['DOG', 'CAT'],
  ageGroup_in: ['ADULT', 'PUPPY'],
  address: {
    city_contains: '',
  }
}

const state = {
  edit: {},
  search: {
    ...INITIAL_STATE
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
  [UPDATE_SEARCH_CITY](state, city) {
    if(city) state.search.address.city_contains = city;
  },
  [RESET_SEARCH_FILTER](state) {
    state.search = { ...INITIAL_STATE };
    console.log('state.search', state.search);
  }
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
  },
  updateCity({ commit }, city) {
    commit(UPDATE_SEARCH_CITY, city);
  },
  resetSearchFilter({ commit }) {
    console.log('resetei essa merda');
    commit(RESET_SEARCH_FILTER);
  }
}

export default {
    state,
    getters,
    actions,
    mutations
}