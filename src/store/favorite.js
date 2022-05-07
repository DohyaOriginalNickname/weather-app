

export const favorite = {
    state:{
        favoriteCities: []
    },
    mutations: {
        addFavoriteCity(state, payload){
            state.favoriteCities.push(payload)
            localStorage.setItem('favoriteList', JSON.stringify(state.favoriteCities))
        },
        deleteFavoriteCity(state){
            state.favoriteCities = state.favoriteCities.filter(del => del.delete === state.favoriteCities.delete)
            localStorage.removeItem('favoriteList')
            localStorage.setItem('favoriteList', JSON.stringify(state.favoriteCities))
        }
    },
    actions: {
        deleteFavoriteCity({commit,state}, payload){
            state.favoriteCities = payload
            commit('deleteFavoriteCity')
        }
    }
}