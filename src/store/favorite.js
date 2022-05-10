

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
            state.favoriteCities = state.favoriteCities.filter(del => del.favorite === !state.favoriteCities.favorite)
            localStorage.removeItem('favoriteList')
            localStorage.setItem('favoriteList', JSON.stringify(state.favoriteCities))
        },
        getFavoriteCity(state, payload){
            state.favoriteCities = JSON.parse(payload)
        }
    },
    actions: {
        deleteFavoriteCity({commit,state}, payload){
            console.log(payload)
            state.favoriteCities = payload
            commit('deleteFavoriteCity')
        },
        getFavoriteCity({commit}){
            commit('getFavoriteCity', localStorage.getItem('favoriteList'))
        },
    }
}