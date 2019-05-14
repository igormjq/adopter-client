import apollo from '../../apollo';
import { LOG_USER } from '../../graphql/mutations'

const state = {
    currentUser: {},
}
const getters = {}
const mutations = {
    SET_CURRENT_USER(state, user) {
        state.currentUser = user;
    }
}
const actions = {
    async logUser({ commit }, user) {
        
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}