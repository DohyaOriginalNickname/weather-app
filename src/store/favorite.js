

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
            if(payload === null){
                state.favoriteCities = []
                localStorage.setItem('favoriteList', JSON.stringify(state.favoriteCities))
            }else{
                state.favoriteCities = JSON.parse(payload)
            }
        },
        updateFavoriteCity(state,payload){
            state.favoriteCities = payload
            localStorage.setItem('favoriteList', JSON.stringify(state.favoriteCities))
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