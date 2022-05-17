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
                case 'Cloudy','Overcast','Mist':
                    image = require('@/assets/weather-icon/Union.png')
                    break;
                case 'Moderate rain','Light rain shower','Light rain', 'Light drizzle':
                    image = require('@/assets/weather-icon/Rain.png')
                    break;
                case 'Moderate or heavy rain with thunder','Patchy light rain with thunder':
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