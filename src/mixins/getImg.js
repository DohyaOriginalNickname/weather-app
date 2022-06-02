export default {
    computed:{
        getImg(){
            let image= ''
            switch (this.city.weather) {
                case 'Partly cloudy':
                    image = require('@/assets/weather-icon/SunCloudy.png')
                    break;
                case 'Sunny':
                    image = require('@/assets/weather-icon/Sun.png')
                    break;
                case 'Moderate rain':
                    image = require('@/assets/weather-icon/Rain.png')
                    break;
                case 'Light rain shower':
                    image = require('@/assets/weather-icon/Rain.png')
                    break;
                case 'Light rain':
                    image = require('@/assets/weather-icon/Rain.png')
                    break;
                case 'Light drizzle':
                    image = require('@/assets/weather-icon/Rain.png')
                    break;
                case 'Patchy rain possible':
                    image = require('@/assets/weather-icon/Rain.png')
                    break;
                case 'Moderate or heavy rain with thunder':
                    image = require('@/assets/weather-icon/Thunder.png')
                    break;
                case 'Patchy light rain with thunder':
                    image = require('@/assets/weather-icon/Thunder.png')
                    break;
                default:
                    image = require('@/assets/weather-icon/Union.png')
                    break;
            }
            return image;
        }
    }
}