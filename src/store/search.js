

export const search = {
    state: {
        city: {city:'Город не определен', temp: '-', description: '-'}
    },
    mutations:{
        changeCity(state, payload){
            state.city = payload
        }
    }
}