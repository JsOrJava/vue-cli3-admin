export default {
    namespaced: true,

    state: {
        token: ''
    },

    mutations: {
        'SET_TOKEN': (state, token) => {
            state.token = token
        }
    },

    actions: {
        getToken: ({ commit }, token) => {
            commit('SET_TOKEN', token)
        }
    }
}