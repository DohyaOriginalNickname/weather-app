

export const favorite = {
    state:{
        favoriteCities: []
    },
    mutations: {
        addFavoriteCity(state, payload){
            payload.id = Date.now().toString()
            state.favoriteCities.unshift(payload)
            console.log(state.favoriteCities)
            if(state.favoriteCities.length > 1){
                for (let i = 0; i < state.favoriteCities.length; i++) {
                    if (state.favoriteCities[i-1] === undefined) {
                        continue
                    }
                    if (state.favoriteCities[i].city === state.favoriteCities[i-1].city) {
                        state.favoriteCities.splice(i,1)
                    }
                }
            }
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
            if(Array.isArray(payload)){
                state.favoriteCities = payload
                commit('changeCity',state.favoriteCities.find((post) => post.favorite !== true))
                commit('deleteFavoriteCity')
            }else{
                let array = JSON.parse(localStorage.getItem('favoriteList'))
                state.favoriteCities = array.filter(post => post.city !== payload.city)
                localStorage.setItem('favoriteList', JSON.stringify(state.favoriteCities))
            }
            
        },
        getFavoriteCity({commit}){
            commit('getFavoriteCity', localStorage.getItem('favoriteList'))
        },
    }
}