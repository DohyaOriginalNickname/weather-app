<template>
    <div class="wrapper">
        <div class="background">
            <div class="background__left"></div>
            <div class="background__right"></div>
        </div>

        <geolocation-info :city="city" @click.prevent="$router.push('/search')"></geolocation-info>
        <weather-info :temp="temp" :description="description"></weather-info>

        <div class="choice-locaton" @click="$router.push('/search')">
            <button class="choice-location__button">Выбрать локацию</button>
        </div>
    </div>
</template>

<script>
import Weather from './weather.vue'
import GeoLoc from './geolocation.vue'
export default {
        data(){
            return{
                city: 'Город не определен',
                temp: '-',
                description: '-'
            }
        },
    components:{
        weatherInfo: Weather,
        geolocationInfo: GeoLoc
    }
}
</script>

<style scoped>
    .wrapper{
    background-color: #47B1E6;
    height: 667px;
    }

    .background__left{
        background-image: url("../assets/Background/Vector 12.png");
        position: absolute;
        top: 92px;
        min-width: 88px;
        height: 235px;
    }
    .background__right{
        background-image: url("../assets/Background/Vector 11.png");
        position: absolute;
        right: 0;
        min-width: 230px;
        height: 280px;
    }

    .choice-locaton{
        display: flex;
        justify-content: center;
    }

    .choice-location__button{
        min-width: 200px;
        height: 56px;
        margin: 250px 0 0 0;
        border-radius: 8px;
        background-color: white;
        color:#47B1E6;
        font-size:16px;
    }
</style>