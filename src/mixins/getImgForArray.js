export default{
    computed:{
        dayHours(){
            const dayHours = []
            for (let i = 0; i < this.arrayCities.length; i++) {
                let data = {
                    ...this.arrayCities[i],
                    img: '',
                }
                if(this.arrayCities[i].isDay === 0){
                    switch (this.arrayCities[i].weather) {
                        case 'Partly cloudy':
                            data.img = require('@/assets/weather-icon/Night.png')
                            break;
                        case 'Light rain':
                            data.img = require('@/assets/weather-icon/Rain.png')
                            break;
                        case 'Moderate rain':
                            data.img = require('@/assets/weather-icon/Rain.png')
                            break;
                        case 'Light rain shower':
                            data.img = require('@/assets/weather-icon/Rain.png')
                            break;
                        case 'Light drizzle':
                            data.img = require('@/assets/weather-icon/Rain.png')
                            break;
                        case 'Patchy rain possible':
                            data.img = require('@/assets/weather-icon/Rain.png')
                            break;
                        case 'Moderate or heavy rain with thunder':
                            data.img = require('@/assets/weather-icon/Thunder.png')
                            break;
                        case 'Patchy light rain with thunder':
                            data.img = require('@/assets/weather-icon/Thunder.png')
                            break;
                        case 'Thundery outbreaks possible':
                            data.img = require('@/assets/weather-icon/Thunder.png')
                            break;
                        default:
                            data.img = require('@/assets/weather-icon/Union.png')
                            break;
                    }
                    dayHours.push(data)
                }else{
                    switch (this.arrayCities[i].weather) {
                        case 'Partly cloudy':
                            data.img = require('@/assets/weather-icon/SunCloudy.png')
                            break;
                        case 'Sunny':
                            data.img = require('@/assets/weather-icon/Sun.png')
                            break;
                        case 'Clear':
                            data.img = require('@/assets/weather-icon/Sun.png')
                            break;
                        case 'Light rain':
                            data.img = require('@/assets/weather-icon/Rain.png')
                            break;
                        case 'Moderate rain':
                            data.img = require('@/assets/weather-icon/Rain.png')
                            break;
                        case 'Light rain shower':
                            data.img = require('@/assets/weather-icon/Rain.png')
                            break;
                        case 'Light drizzle':
                            data.img = require('@/assets/weather-icon/Rain.png')
                            break;
                        case 'Patchy rain possible':
                            data.img = require('@/assets/weather-icon/Rain.png')
                            break;
                        case 'Moderate or heavy rain with thunder':
                            data.img = require('@/assets/weather-icon/Thunder.png')
                            break;
                        case 'Patchy light rain with thunder':
                            data.img = require('@/assets/weather-icon/Thunder.png')
                            break;
                        default:
                            data.img = require('@/assets/weather-icon/Union.png')
                            break;
                    }
                    dayHours.push(data)
                }
            }
            return dayHours
        }
    }
}



