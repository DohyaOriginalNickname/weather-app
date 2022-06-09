class City{
    constructor(country, city, currentHour, isDay, weather, temp, tempMin, tempMax, humidity, wind, dayHours, id, favorite){
        this.country = country
        this.city = city
        this.currentHour = currentHour
        this.isDay = isDay
        this.weather = weather
        this.temp = temp
        this.tempMin = tempMin
        this.tempMax = tempMax
        this.humidity = humidity
        this.wind = wind
        this.dayHours = dayHours
        this.id = id
        this.favorite = favorite
    }
}

export const search = {
    state: {
        city: {},
        possibleLocations:{},
        array: []
    },
    mutations:{
        changeCity(state, payload){
            state.city = payload
        },
        possibleLocations(state, payload){
            state.possibleLocations = payload
        }
    },
    actions: {
        async fetchWeather({commit,state},city){
            state.array.push(city)
            if(state.array.length > 1){
                setTimeout(()=>{
                    state.array = []
                },1000)
                return null
            }
            const server = `https://api.weatherapi.com/v1/forecast.json?key=55ef9d4e33a64c75afb55229221105&q=${city}&days=1&aqi=yes&alerts=no`
            const response = await fetch(server,{method: 'GET'})
            const responseResult = await response.json()
            commit('changeCity', new City(
                responseResult.location.country,
                responseResult.location.name,
                responseResult.location.localtime.slice(responseResult.location.localtime.indexOf(" "), responseResult.location.localtime.indexOf(":")).trim(),
                responseResult.current.is_day,
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
            let updateCity = {}
            if(Array.isArray(payload)){
                await Promise.all(payload.map(async (iter) => {
                    commit('setLoading', true)
                    const server = `https://api.weatherapi.com/v1/forecast.json?key=55ef9d4e33a64c75afb55229221105&q=${iter.city}&days=1&aqi=yes&alerts=no`
                    const response = await fetch(server,{method: 'GET'})
                    const responseResult = await response.json()
                    updateCities.push(new City(
                        responseResult.location.country,
                        responseResult.location.name,
                        responseResult.location.localtime.slice(responseResult.location.localtime.indexOf(" "), responseResult.location.localtime.indexOf(":")).trim(),
                        responseResult.current.is_day,
                        responseResult.current.condition.text,
                        responseResult.current.temp_c,
                        responseResult.forecast.forecastday[0].day.mintemp_c,
                        responseResult.forecast.forecastday[0].day.maxtemp_c,
                        responseResult.current.humidity,
                        responseResult.current.wind_kph,
                        responseResult.forecast.forecastday[0].hour,
                        iter.id,
                        iter.favorite
                    ))
                }))
                commit('updateFavoriteCity',updateCities.sort((a,b) => a.id < b.id ? 1 : -1 ))
                commit('setLoading', false)
            }else{
                const server = `https://api.weatherapi.com/v1/forecast.json?key=55ef9d4e33a64c75afb55229221105&q=${payload.city}&days=1&aqi=yes&alerts=no`
                const response = await fetch(server,{method: 'GET'})
                const responseResult = await response.json()
                updateCity = new City(
                    responseResult.location.country,
                    responseResult.location.name,
                    responseResult.location.localtime.slice(responseResult.location.localtime.indexOf(" "), responseResult.location.localtime.indexOf(":")).trim(),
                    responseResult.current.is_day,
                    responseResult.current.condition.text,
                    responseResult.current.temp_c,
                    responseResult.forecast.forecastday[0].day.mintemp_c,
                    responseResult.forecast.forecastday[0].day.maxtemp_c,
                    responseResult.current.humidity,
                    responseResult.current.wind_kph,
                    responseResult.forecast.forecastday[0].hour
                )
                if(payload.favorite === true){
                    updateCity.favorite = true
                }
                if(payload.id){
                    updateCity.id = payload.id
                }
                commit('changeCity', updateCity)
            }
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
                    responseResult.location.localtime.slice(responseResult.location.localtime.indexOf(" "), responseResult.location.localtime.indexOf(":")).trim(),
                    responseResult.current.is_day,
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
                if(updateHistoryCities[iter] === undefined){
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
        },
        async getWeatherPossibleCity({commit},city){
            const server = `https://api.weatherapi.com/v1/forecast.json?key=55ef9d4e33a64c75afb55229221105&q=${city}&days=1&aqi=yes&alerts=no`
            const response = await fetch(server,{method: 'GET'})
            const responseResult = await response.json()
            commit('possibleLocations',new City(
                    responseResult.location.country,
                    responseResult.location.name,
                    responseResult.location.localtime.slice(responseResult.location.localtime.indexOf(" "), responseResult.location.localtime.indexOf(":")).trim(),
                    responseResult.current.is_day,
                    responseResult.current.condition.text,
                    responseResult.current.temp_c,
                    responseResult.forecast.forecastday[0].day.mintemp_c,
                    responseResult.forecast.forecastday[0].day.maxtemp_c,
                    responseResult.current.humidity,
                    responseResult.current.wind_kph,
                    responseResult.forecast.forecastday[0].hour,
                )
            )
        },
    }
}