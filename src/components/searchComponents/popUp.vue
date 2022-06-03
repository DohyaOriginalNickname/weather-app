<template>
    <div class="popup" :class="{ active: popup === true}">
        <img src="@/assets/Color.png" alt="" class="popup__close" @click="$emit('closePopUp')">
        <div class="popup__text">
            <p>Вы находитесь где то здесь:</p>
        </div>
        <div class="search-list" v-if="Object.keys(possibleLocations).length !== 0">
            <div style="display: flex; min-width: 250px;" @click="toTheStore(possibleLocations)">
                <div>
                    <img :src="getImg" class="search-list__image">
                </div>
                <div class="search-list__info">
                    <div>
                        <p>{{possibleLocations.city}}</p>
                    </div>
                    <div class="search-list__info_weather">
                        <p>{{possibleLocations.weather}}</p>
                    </div>
                    <div>
                        <p>{{possibleLocations.temp}}° С</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import toTheStore from '@/mixins/toTheStore'
export default {
    mixins:[toTheStore],
    props:{
        popup:{
            type: Boolean,
            default: false
        }
    },
    computed:{
        possibleLocations(){
            return this.$store.state.search.possibleLocations
        },
        getImg(){
            let img = ''
            if(this.possibleLocations.isDay === 0){
                switch (this.possibleLocations.weather) {
                    case 'Partly cloudy':
                        img = require('@/assets/weather-icon/Night.png')
                        break;
                    case 'Light rain':
                        img = require('@/assets/weather-icon/Rain.png')
                        break;
                    case 'Moderate rain':
                        img = require('@/assets/weather-icon/Rain.png')
                        break;
                    case 'Light rain shower':
                        img = require('@/assets/weather-icon/Rain.png')
                        break;
                    case 'Light drizzle':
                        img = require('@/assets/weather-icon/Rain.png')
                        break;
                    case 'Patchy rain possible':
                        img = require('@/assets/weather-icon/Rain.png')
                        break;
                    case 'Moderate or heavy rain with thunder':
                        img = require('@/assets/weather-icon/Thunder.png')
                        break;
                    case 'Patchy light rain with thunder':
                        img = require('@/assets/weather-icon/Thunder.png')
                        break;
                    case 'Thundery outbreaks possible':
                        img = require('@/assets/weather-icon/Thunder.png')
                        break;
                    default:
                        img = require('@/assets/weather-icon/Union.png')
                        break;
                }
                return img;
            }else{
                switch (this.possibleLocations.weather) {
                    case 'Partly cloudy':
                        img = require('@/assets/weather-icon/SunCloudy.png')
                        break;
                    case 'Sunny':
                        img = require('@/assets/weather-icon/Sun.png')
                        break;
                    case 'Clear':
                        img = require('@/assets/weather-icon/Sun.png')
                        break;
                    case 'Moderate rain':
                        img = require('@/assets/weather-icon/Rain.png')
                        break;
                    case 'Light rain shower':
                        img = require('@/assets/weather-icon/Rain.png')
                        break;
                    case 'Light rain':
                        img = require('@/assets/weather-icon/Rain.png')
                        break;
                    case 'Light drizzle':
                        img = require('@/assets/weather-icon/Rain.png')
                        break;
                    case 'Patchy rain possible':
                        img = require('@/assets/weather-icon/Rain.png')
                        break;
                    case 'Moderate or heavy rain with thunder':
                        img = require('@/assets/weather-icon/Thunder.png')
                        break;
                    case 'Patchy light rain with thunder':
                        img = require('@/assets/weather-icon/Thunder.png')
                        break;
                    case 'Thundery outbreaks possible':
                        img = require('@/assets/weather-icon/Thunder.png')
                        break;
                    default:
                        img = require('@/assets/weather-icon/Union.png')
                        break;
                }
                return img;
            }
        }
    }
}
</script>

<style scoped>
    .popup{
        border: 1px solid black;
        border-radius: 15px;
        position: fixed;
        background-color: #fff;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) scale(0);
        width: 80%;
        padding: 25px;
        transition: 0.7s all;
    }
    .popup__close{
        position: relative;
        top: -10px;
        left: 99%;
        width: 16px;
    }
    .popup__text{
        font-size: 18px;
        margin: 0 0 5px 0;
        border-bottom: 1px solid black;
    }
    .active{
        transform: translate(-50%, -50%) scale(1);
        transition: 0.5s all;
        pointer-events: all; 
    }
    .search-list__image{
        width: 82px; 
        height:82px;
    }
    .search-list__info{
        font-weight: 600;
        font-size: 20px;
        line-height: 28px;
        color: #1C293D;
        text-align: start;
        width: 188px;
        margin: 0 20px 0 10px;
    }
    .search-list__info_weather{
        font-weight: 400;
        font-size: 16px;
        line-height: 24px;
        color: #B4B4B4;
    }
</style>