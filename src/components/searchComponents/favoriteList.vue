<template>
    <div v-if="cities.length !== 0 ">
        <div class="favorite-list border" v-for="log in cities" :key="log.id" @click="toTheStore(log)">
            <div>
                <img src="@/assets/weather-icon/SunCloudy.png" class="favorite-list__image">
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
            <div>
                <img 
                    src="@/assets/Stars/BlueStar.png" 
                    class="favorite-list__star"
                    @click = "DeleteCity(log)"
                >
            </div>
        </div>
        
        <snackbar>Локация удалена</snackbar>
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
        }
    },
    methods:{
        DeleteCity(log){
            for (let i = 0; i < this.cities.length; i++) {
                if (this.cities[i] === log) {
                    this.cities[i].favorite = false
                    this.$store.dispatch('deleteFavoriteCity', this.cities)
                    break
                }
            }
            const x = document.getElementById('snackbar')
            x.className = 'show'
            setTimeout(()=>{ x.className = x.className.replace("show", "") }, 2000)
        },
    },
}
</script>

<style scoped>
    .favorite-list{
        margin-top: 18px;
        display: flex;
        align-items: flex-start;
        padding: 0px;
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
        position: absolute; 
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