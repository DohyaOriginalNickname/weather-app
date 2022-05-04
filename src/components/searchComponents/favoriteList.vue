<template>
    <div v-if="favorite === true">
        <div class="favorite-list border" v-for="log in cities" :key="log.id">
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
                    <p>{{log.temp}}</p>
                </div>
            </div>
            <div>
                <img 
                    src="@/assets/BlueStar.png" 
                    @click.prevent="log.delete = true" 
                    @click="DeleteCity"
                >
            </div>
        </div>
        
        <snackbar></snackbar>
    </div>
    <div v-else class="something">
        <p>У вас нету избранных городов</p>
    </div>
</template>

<script>
import snackbar from './snackbar.vue'
export default {
    components: { snackbar },
    props:{
        favorite:{
            type: Boolean
        }
    },
    data(){
        return{
            cities:[
                {city:'Астана',weather:'Переменная облачность',temp:'+7° С', id: '1',},
                {city:'Нидерланды',weather:'Гроза',temp:'+15° С', id:'2',},
                {city:'Будапешт',weather:'Гроза',temp:'+11° С', id:'3',},
            ]
        }
    },
    methods:{
        DeleteCity(){
            this.cities = this.cities.filter(del => del.delete === this.cities.delete)
            const x = document.getElementById('snackbar')
            x.className = 'show'
            setTimeout(()=>{ x.className = x.className.replace("show", "") }, 2000)
        }
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