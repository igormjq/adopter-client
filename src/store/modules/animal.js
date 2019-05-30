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
const mutations = {}
const actions = {}

export default {
    state,
    getters,
    actions,
    mutations
}