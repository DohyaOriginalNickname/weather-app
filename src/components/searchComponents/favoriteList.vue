<template>
    <div v-if="cities.length !== 0 " class="scroll">
        <div class="favorite-list border" v-for="log in dayHours" :key="log.id" @click="toTheStore(log)">
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
        
        <snackbar ref="snackbar">Локация удалена</snackbar>
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
                    case 'Cloudy','Overcast','Mist':
                        data.img = require('@/assets/weather-icon/Union.png')
                        break;
                    case 'Moderate rain','Light rain shower','Light rain','Light drizzle','Patchy rain possible':
                        data.img = require('@/assets/weather-icon/Rain.png')
                        break;
                    case 'Thunder':
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
                    this.dayHours[i].favorite = false
                    localStorage.setItem('selectedCity', JSON.stringify(this.dayHours[i]))
                    this.$store.dispatch('deleteFavoriteCity', this.dayHours)
                    break
                }
            }

            
            const snackbar = this.$refs.snackbar.$el
            snackbar.className = 'snackbar show'
            setTimeout(()=>{ snackbar.className =  snackbar.className.replace('snackbar show', 'snackbar')}, 2000) 
        },
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
        max-height: 800px;
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