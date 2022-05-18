

export const history = {
    state: {
        searchHistory: []
    },
    mutations: {
        addToHistory(state, payload){
            state.searchHistory.push(payload)
        },
        getHistory(state, payload){
            if(payload === null){
                state.searchHistory = []
                localStorage.setItem('history', JSON.stringify(state.searchHistory))
            }else{
                state.searchHistory = JSON.parse(payload)
            }
        },
        deleteHistory(state){
            state.searchHistory = []
        },
        updateHistory(state,payload){
            state.searchHistory = payload
            localStorage.setItem('history', JSON.stringify(state.searchHistory))
        }
    },
    actions: {
        addToHistory({commit,state} ,payload){
            const currentHistory = JSON.parse(localStorage.getItem('history'))
            if (currentHistory.length === 0) {
                commit('addToHistory',payload)
                localStorage.setItem('history', JSON.stringify(state.searchHistory))
            }
            for (let i = 0; i < currentHistory.length; i++) {
                if(currentHistory[i].city !== payload.city){
                    commit('addToHistory',payload)
                    localStorage.setItem('history', JSON.stringify(state.searchHistory))
                    break
                }else{
                    localStorage.setItem('history', JSON.stringify(state.searchHistory))
                    break
                }
            }
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