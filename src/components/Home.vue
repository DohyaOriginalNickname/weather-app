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
        <snackbar ref="snackbar" :showUndoBtn="showUndoBtn" @canselDelete="canselDelete()"></snackbar>

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
            showUndoBtn: true,
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
            if (Object.keys(this.$store.state.search.city).length === 0 && localStorage.getItem('selectedCity') ) {
                return JSON.parse(localStorage.getItem('selectedCity'))
            }else{
                return this.$store.state.search.city
            }
        }
    },
    methods: {
        addToFavoriteCity(){
            this.showUndoBtn = true
            this.city.favorite = true
            localStorage.setItem('selectedCity', JSON.stringify(this.city))
            this.$store.commit('addFavoriteCity', this.city)

            const snackbar = this.$refs.snackbar.$el
            snackbar.className = 'snackbar show'
            snackbar.querySelector('.snackbar__text').innerText = 'Локация добавлена в избранное'
            setTimeout(()=>{ snackbar.className =  snackbar.className.replace('snackbar show', 'snackbar')}, 2000)
        },
        DeleteCity(){
            this.showUndoBtn = false
            this.city.favorite = false
            
            setTimeout(()=>{
                if(this.city.favorite === true){
                    return 0
                }
                localStorage.setItem('selectedCity', JSON.stringify(this.city))
                this.$store.dispatch('deleteFavoriteCity', this.city)
            },2000)

            const snackbar = this.$refs.snackbar.$el
            snackbar.className = 'snackbar show'
            snackbar.querySelector('.snackbar__text').innerText = 'Локация удалена'
            setTimeout(()=>{ snackbar.className =  snackbar.className.replace('snackbar show', 'snackbar')}, 2000)
        },
        canselDelete(){
            this.city.favorite = true
        }
    },
    created(){
        this.$store.dispatch('updateWeather', this.city)
    }
}
</script>

<style scoped lang="scss">
    .wrapper{
        background-color: $accentDark;
    }
    .background__left{
        background-image: url("../assets/Background/Vector 12.png");
        position: absolute;
        top: 92px;
        min-width: 88px;
        min-height: 235px;
    }
    .background__right{
        background-image: url("../assets/Background/Vector 11.png");
        position: absolute;
        right: 0;
        min-width: 230px;
        min-height: 280px;
    }
    .choice-locaton{
        display: flex;
        justify-content: center;
    }
    .choice-location__button{
        position: fixed;
        min-width: 200px;
        height: 56px;
        bottom: 36px;
        border-radius: 8px;
        background-color: $white;
        color:$accentDark;
        font-size:16px;
    }
    .geolocation{
        display: flex;
        padding: 5px;
        padding-top:25px;
        margin: 0 10px;
        cursor: pointer;
    }
    .star{
        position: absolute;
        right: 0;
        margin: 0 18px;
    }
</style>