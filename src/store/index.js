import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'
import userModule from './modules/user'

Vue.use(Vuex)

/* eslint-disable*/
const vuexLocal = new VuexPersist({
    key: '__YOUR_PROJECT_NAME__',
    storage: window.sessionStorage
})

const store = new Vuex.Store({
    modules: [
        userModule
    ],
    state: {

    },
    mutations: {

    },
    actions: {

    },
    plugins: [vuexLocal.plugin]
})

export default store
