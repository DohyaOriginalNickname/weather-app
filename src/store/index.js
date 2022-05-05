import { createStore } from 'vuex'

export default createStore({
  state: () => ({
    searchHistory: []
  }),
  mutations: {
    addToHistory(state, payload){
      if(state.searchHistory === null){
        state.searchHistory = []
        state.searchHistory.push(payload)
      }else{
        state.searchHistory.push(payload)
      }
    },
    getHistory(state, payload){
      state.searchHistory = JSON.parse(payload)
    },
    deleteHistory(state){
      state.searchHistory = []
    }
  },
  actions: {
    addToHistory({commit,state} ,payload){
      commit('addToHistory',payload)
      localStorage.setItem('test', JSON.stringify(state.searchHistory))
    },
    getHistory({commit}){
      commit('getHistory', localStorage.getItem('test'))
    },
    deleteHistory({commit}){
      commit('deleteHistory')
      localStorage.removeItem('test')
    }
  },
})
