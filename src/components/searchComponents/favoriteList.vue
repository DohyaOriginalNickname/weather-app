<template>
    <div v-if="arrayCities.length !== 0 " class="scroll">
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
                        <p v-if="log.temp > 0">+{{log.temp}}° С</p>
                        <p v-else-if="log.temp < 0">{{log.temp}}° С</p>
                        <p v-else>{{log.temp}}° С</p>
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
import getImg from '@/mixins/getImgForArray'
export default {
    components: { snackbar },
    mixins: [toTheStore,getImg],
    data(){
        return{
            revokeDelete: false
        }
    },
    computed: {
        arrayCities(){
            return this.$store.state.favorite.favoriteCities
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

<style scoped lang="scss">
@import "@/style/template.scss";
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
        @extend %city-list__info;
    }
    .favorite-list__info_weather{
        @extend %city-list__info_weather;
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
        @extend %border;
    }
    .something{
        @extend %something;
    }
</style>