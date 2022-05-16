

export const history = {
    state: {
        searchHistory: []
    },
    mutations: {
        addToHistory(state, payload){
            state.searchHistory.push(payload)
        },
        getHistory(state, payload){
            state.searchHistory = JSON.parse(payload)
        },
        deleteHistory(state){
            state.searchHistory = []
        },
        updateHistory({state},payload){
            state.searchHistory = payload
            localStorage.setItem('history', JSON.stringify(state.searchHistory))
        }
    },
    actions: {
        addToHistory({commit,state} ,payload){
            commit('addToHistory',payload)
            localStorage.setItem('history', JSON.stringify(state.searchHistory))
        },
        getHistory({commit}){
            commit('getHistory', localStorage.getItem('history'))
        },
        deleteHistory({commit,state}){
            commit('deleteHistory')
            localStorage.removeItem('history')
            localStorage.setItem('history', JSON.stringify(state.searchHistory))
        },
    }
}