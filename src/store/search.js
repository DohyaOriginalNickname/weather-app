class City{
    constructor(city, weather, feelsLike, tempMin, tempMax, humidity, wind){
        this.city = city
        this.weather = weather
        this.feelsLike = feelsLike
        this.tempMin = tempMin
        this.tempMax = tempMax
        this.humidity = humidity
        this.wind = wind
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
            const server = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=1b19670bcebb72cc96a217a763f017e3`
            const response = await fetch(server,{method: 'GET'})
            const responseResult = await response.json()
            commit('changeCity', new City(city, responseResult.weather[0].main, responseResult.main.feels_like, responseResult.main.temp_min, responseResult.main.temp_max, responseResult.main.humidity, responseResult.wind.speed ))
        }
    }
}