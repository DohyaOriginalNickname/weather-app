class City{
    constructor(city, weather, temp, tempMin, tempMax, humidity, wind, dayHours){
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
            console.log(responseResult)
            commit('changeCity', new City(
                responseResult.location.name,
                responseResult.current.condition.text,
                responseResult.current.temp_c,
                responseResult.forecast.forecastday[0].day.mintemp_c,
                responseResult.forecast.forecastday[0].day.maxtemp_c,
                responseResult.current.humidity,
                responseResult.current.wind_kph,
                responseResult.forecast.forecastday[0].hour
            ))
        },
    }
}