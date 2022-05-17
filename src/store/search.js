class City{
    constructor(country,city, weather, temp, tempMin, tempMax, humidity, wind, dayHours){
        this.country = country
        this.city = city
        this.weather = weather
        this.temp = temp
        this.tempMin = tempMin
        this.tempMax = tempMax
        this.humidity = humidity
        this.wind = wind
        this.dayHours = dayHours
    }
}

export const search = {
    state: {
        city: {}
    },
    mutations:{
        changeCity(state, payload){
            state.city = payload
        }
    },
    actions: {
        async fetchWeather({commit},city){
            const server = `https://api.weatherapi.com/v1/forecast.json?key=55ef9d4e33a64c75afb55229221105&q=${city}&days=1&aqi=yes&alerts=no`
            const response = await fetch(server,{method: 'GET'})
            const responseResult = await response.json()
            commit('changeCity', new City(
                responseResult.location.country,
                responseResult.location.name,
                responseResult.current.condition.text,
                responseResult.current.temp_c,
                responseResult.forecast.forecastday[0].day.mintemp_c,
                responseResult.forecast.forecastday[0].day.maxtemp_c,
                responseResult.current.humidity,
                responseResult.current.wind_kph,
                responseResult.forecast.forecastday[0].hour,
            )) 
        },
        async updateWeather({commit}, payload){
            const updateCities = []
            for(let i = 0; i<payload.length; i++){
                commit('setLoading', true)
                const server = `https://api.weatherapi.com/v1/forecast.json?key=55ef9d4e33a64c75afb55229221105&q=${payload[i].city}&days=1&aqi=yes&alerts=no`
                const response = await fetch(server,{method: 'GET'})
                const responseResult = await response.json()
                updateCities.push(new City(
                    responseResult.location.country,
                    responseResult.location.name,
                    responseResult.current.condition.text,
                    responseResult.current.temp_c,
                    responseResult.forecast.forecastday[0].day.mintemp_c,
                    responseResult.forecast.forecastday[0].day.maxtemp_c,
                    responseResult.current.humidity,
                    responseResult.current.wind_kph,
                    responseResult.forecast.forecastday[0].hour
                ))
                updateCities[i].favorite = true
            }
            commit('updateFavoriteCity',updateCities)
            commit('setLoading', false)
        },
        async updateHistoryCities({commit},payload){
            let i = 0
            let iter = 0
            const updateHistoryCities = []
            const favoriteList = JSON.parse(localStorage.getItem('favoriteList'))
            for(let i = 0; i<payload.length; i++){
                const server = `https://api.weatherapi.com/v1/forecast.json?key=55ef9d4e33a64c75afb55229221105&q=${payload[i].city}&days=1&aqi=yes&alerts=no`
                const response = await fetch(server,{method: 'GET'})
                const responseResult = await response.json()
                updateHistoryCities.push(new City(
                    responseResult.location.country,
                    responseResult.location.name,
                    responseResult.current.condition.text,
                    responseResult.current.temp_c,
                    responseResult.forecast.forecastday[0].day.mintemp_c,
                    responseResult.forecast.forecastday[0].day.maxtemp_c,
                    responseResult.current.humidity,
                    responseResult.current.wind_kph,
                    responseResult.forecast.forecastday[0].hour
                ))
            }
            while (i < favoriteList.length) {
                if(favoriteList[i] === undefined){
                    break
                }
                if (updateHistoryCities[iter].city === favoriteList[i].city) {
                    updateHistoryCities[iter].favorite = true
                    i++
                    iter = 0
                }else{
                    iter++
                }
            }
            commit('updateHistory', updateHistoryCities)
        }
    }
}