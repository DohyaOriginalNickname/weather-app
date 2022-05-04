import { createStore } from 'vuex'

export default createStore({
  state: () => ({
    searchHistory: []
  }),
  mutations: {
    addToHistory(state, payload){
      state.searchHistory.push(payload)
    },
    deleteHistory(state){
      state.searchHistory = []
    }
  },
  actions: {
  },
  modules: {
  }
})
