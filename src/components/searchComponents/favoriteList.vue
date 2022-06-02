<template>
    <div v-if="cities.length !== 0 " class="scroll">
        <div class="favorite-list border" v-for="log in dayHours" :key="log.id" :id="log.id" @click="toTheStore(log)">
            <div style="display: flex; min-width: 250px;">
                <div>
                    <img :src="log.img" class="favorite-list__image">
                </div>
                <div class="favorite-list__info">
                    <div>
                        <p>{{log.city}}</p>
                    </div>
                    <div class="favorite-list__info_weather">
                        <p>{{log.weather}}</p>
                    </div>
                    <div>
                        <p>{{log.temp}}° С</p>
                    </div>
                </div>
            </div>
            <div>
                <img 
                    src="@/assets/Stars/BlueStar.png" 
                    class="favorite-list__star"
                    @click.stop = "DeleteCity(log)"
                >
            </div>
        </div>

        <snackbar ref="snackbar" @canselDelete="canselDelete">Локация удалена</snackbar>
    </div>
    <div v-else class="something">
        <p>У вас нету избранных городов</p>
    </div>
    
</template>

<script>
import snackbar from '../UI/snackbar.vue'
import toTheStore from '@/mixins/toTheStore.js'
export default {
    components: { snackbar },
    mixins: [toTheStore],
    computed: {
        cities(){
            return this.$store.state.favorite.favoriteCities
        },
        data(){
            return{
                revokeDelete: false
            }
        },
        dayHours(){
            const dayHours = []
            for (let i = 0; i < this.cities.length; i++) {
                let data = {
                    ...this.cities[i],
                    img: '',
                }
                switch (this.cities[i].weather) {
                    case 'Partly cloudy':
                        data.img = require('@/assets/weather-icon/SunCloudy.png')
                        break;
                    case 'Sunny':
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
            return dayHours
        }
    },
    methods:{
        DeleteCity(log){
            for (let i = 0; i < this.dayHours.length; i++) {
                if (this.dayHours[i] === log) {
                    const id = document.getElementById(log.id)
                    id.style.display = 'none'
                    this.dayHours[i].favorite = false
                    
                    setTimeout(()=>{
                        if(this.revokeDelete){
                            id.style.display = ''
                            this.revokeDelete = false
                            return 0
                        }
                        if(this.dayHours[i].city === JSON.parse(localStorage.getItem('selectedCity')).city){
                            localStorage.setItem('selectedCity',JSON.stringify(this.dayHours[i]))
                        }
                        this.$store.dispatch('deleteFavoriteCity', this.dayHours)
                        return 0
                    },2000)
                }
            }
            
            const snackbar = this.$refs.snackbar.$el
            snackbar.className = 'snackbar show'
            setTimeout(()=>{ snackbar.className =  snackbar.className.replace('snackbar show', 'snackbar')}, 2000) 
        },
        canselDelete(data){
            this.revokeDelete = data
        }
    },
    created(){
        if(JSON.parse(localStorage.getItem('favoriteList')) !== null){
            this.$store.dispatch('updateWeather', JSON.parse(localStorage.getItem('favoriteList')))
        }
    }
}
</script>

<style scoped>
    .scroll{
        overflow-y: scroll; 
        max-height: 594px;
    }
    .favorite-list{
        margin-top: 18px;
        display: flex;
        align-items: flex-start;
        padding: 0px;
        justify-content: space-between;
    }
    .favorite-list__info{
        font-weight: 600;
        font-size: 20px;
        line-height: 28px;
        color: #1C293D;
        text-align: start;
        width: 188px;
        margin: 0 20px 0 10px;
    }
    .favorite-list__info_weather{
        font-weight: 400;
        font-size: 16px;
        line-height: 24px;
        color: #B4B4B4;
    }
    .favorite-list__image{
        
        width: 82px; 
        height:82px;
        margin: 0 16px;
    }

    .favorite-list__star{
        position: relative; 
        right: 0; 
        margin: 3px 18px;
    }

    .border{
        border-bottom: 1px solid #E9E9E9;
    }
    .something{
        position: absolute;
        width: 343px;
        height: 24px;
        left: calc(50% - 343px/2);
        top: calc(50% - 24px/2 + 0.5px);
        font-size: 16px;
        line-height: 24px;
        text-align: center;
        color: #B4B4B4;
    }
</style>