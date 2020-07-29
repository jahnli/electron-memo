import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);
import user from './module/user'
import createPersistedState from 'vuex-persistedstate'

export default new Vuex.Store({
  modules: {
    user
  },
  plugins: [createPersistedState()]
})
