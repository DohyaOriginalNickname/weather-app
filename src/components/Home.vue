<template>
    <div class="wrapper">
        <div class="background">
            <div class="background__left"></div>
            <div class="background__right"></div>
        </div>

        <div class="geolocation">
            <geolocation-info 
                :nameCity="city.city"
                @click="$router.push('/search')"
            ></geolocation-info>
            <div v-if="city.city || city.favorite === false" class="star">
                <img src="@/assets/Stars/EmptyStar.png" @click="addToFavoriteCity()">
            </div>
            <div v-if="city.favorite" class="star" @click="DeleteCity()">
                <img src="@/assets/Stars/WhiteStar.png">
            </div>
        </div>
        
        <weather-info :temp="city.temp" :description="city.weather" :image="getImg"></weather-info>

        <div>
            <div 
                class="choice-locaton" 
                @click="$router.push('/search')" 
                v-if="!city.city"
            >
                <button class="choice-location__button">Выбрать локацию</button>
            </div>
            <div v-else>
                <today-info 
                    :city="city"
                ></today-info>
            </div>
        </div>
        
        <snackbar :addFavorite="addFavorite"></snackbar>

    </div>
</template>

<script>
import Weather from './HomeComponents/weather.vue'
import GeoLoc from './HomeComponents/geolocation.vue'
import TodayInfo from './HomeComponents/todayInfo.vue'
import snackbar from './UI/snackbar.vue'

import getImg from '../mixins/getImg'
export default {
    data(){
        return{
            addFavorite: true,
        }
    },
    mixins:[getImg],
    components:{
        weatherInfo: Weather,
        geolocationInfo: GeoLoc,
        TodayInfo,
        snackbar
    },
    computed: {
        city(){
            return this.$store.state.search.city
        }
    },
    methods: {
        addToFavoriteCity(){
            this.addFavorite = true
            this.city.favorite = true
            this.$store.commit('addFavoriteCity', this.city)

            
            const x = document.getElementById('snackbar')
            x.querySelector('.snackbar__text').textContent = 'Локация добавлена в избранное' 
            x.className = 'show'
            setTimeout(()=>{ x.className = x.className.replace("show", "") }, 2000)
        },
        DeleteCity(){
            this.addFavorite = false
            this.city.favorite = false
            this.$store.dispatch('deleteFavoriteCity', this.city)

            
            const x = document.getElementById('snackbar')
            x.querySelector('.snackbar__text').textContent = 'Локация удалена'
            x.className = 'show'
            setTimeout(()=>{ x.className = x.className.replace("show", "") }, 2000)
        },
    }
}
</script>

<style scoped>
    .wrapper{
        position: relative;
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
    .geolocation{
        display: flex;
        padding: 5px;
        margin: 0 10px;
        cursor: pointer;
    }
    .star{
        position: absolute;
        right: 0;
        margin: 0 18px;
    }
</style>