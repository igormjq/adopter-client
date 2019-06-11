import { 
  UPDATE_SEARCH_TYPE,
  UPDATE_SEARCH_GENDER,
  UPDATE_SEARCH_SIZE,
  UPDATE_SEARCH_AGE_GROUP,
  UPDATE_SEARCH_CITY,
  RESET_SEARCH_FILTER,
  CHECK_NEXT_PAGE,
} from '../types/mutation-types';

const INITIAL_STATE = {
  size_in: ['SMALL', 'MEDIUM', 'LARGE'],
  gender_in: ['MALE', 'FEMALE'],
  type_in: ['DOG', 'CAT'],
  ageGroup_in: ['ADULT', 'PUPPY'],
  address: {
    city_contains: '',
  }
};

const state = {
  edit: {},
  new: {
    type: ''
  },
  search: { ...INITIAL_STATE },
  hasNextPage: true
};

const getters = {
  hasNextPage: state => state.hasNextPage
};

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
    state.search = { 
      ...INITIAL_STATE,
      address: {
        ...INITIAL_STATE.address
      }
    };
  },
  [CHECK_NEXT_PAGE](state, result) {
    state.hasNextPage = result;
  }
}
const actions = {
  updateFilterType({ commit }, types) {
    commit(UPDATE_SEARCH_TYPE, types);
  },
  updateFilterSize({ commit }, sizes) {
    commit(UPDATE_SEARCH_SIZE, sizes);
  },
  updateFilterGender({ commit }, genders) {
    commit(UPDATE_SEARCH_GENDER, genders)
  },
  updateFilterAgeGroup({ commit }, ageGroups) {
    commit(UPDATE_SEAERCH_AGE_GROUP, ageGroups);
  },
  updateFilterCity({ commit }, city) {
    commit(UPDATE_SEARCH_CITY, city);
  },
  resetSearchFilter({ commit }) {
    commit(RESET_SEARCH_FILTER);
  },
  checkNextPage({ commit }, result) {
    const hasNextPage = result && (result.length >= 20) && (result.length % 2 === 0);
    commit(CHECK_NEXT_PAGE, hasNextPage);
  },
}

export default {
    state,
    getters,
    actions,
    mutations
}