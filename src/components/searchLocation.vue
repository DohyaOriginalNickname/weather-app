<template>
    <div>
        <div class="popupBg" v-if="popup === true"></div>
        <div class="padding" :class="{ notTouch: popup === true}">
            <div v-if="touch === false">
                <div class="search" >
                    <a @click.prevent="$router.push('/')">
                        <img src="@/assets/icons/arrow.png" alt="" class="search__arrow">
                    </a>
                    <input 
                        type="text" 
                        placeholder="Поиск локации" 
                        class="search__input"
                        @focus="touch = true" 
                    >
                    <img src="@/assets/icons/focus.png" alt="" class="search__target" @click.stop="getCurrentLoc()">
                </div>
            </div>
            
            <div v-else>
                <div class="search-focus" >
                    <a @click.prevent="touch = false">
                        <img src="@/assets/icons/arrow.png" alt="" class="search__arrow">
                    </a>
                    <input 
                        type="text" 
                        placeholder="Поиск локации" 
                        class="search__input"
                        @keyup="input()"
                        v-model="searchCity"
                    >
                    <img src="@/assets/icons/focus.png" alt="" class="search__target" v-if="searchCity === ''">
                    <img src="@/assets/icons/Color.png" alt="" class="search__target" v-else @click="clearInput()">
                </div>
                <div class="border-bottom"></div>
            </div>
            

            <div :class="{ antisomething: touch === false}">
                <div v-if="touch === false">
                    <favorite-list></favorite-list>
                </div>
                <div v-else>
                    <div v-if=" searchCity === '' ">
                        <p v-if="historyCities.length === 0" class="something">Введите название города</p>
                        <div v-else>
                            <search-history></search-history>
                        </div>
                    </div>
                    <div v-else>
                        <search-city></search-city>
                    </div>
                </div>
            </div>

            <pop-up :popup="popup" @closePopUp="closePopUp" ></pop-up>

            <div id="loader" v-if="loading === true">
                <img src="@/assets/gif/Vp3R.gif" alt="">
            </div>
        </div>
    </div>
</template>

<script>
import favoriteList from './searchComponents/favoriteList.vue'
import SearchCity from './searchComponents/searchCity.vue'
import SearchHistory from './searchComponents/searchHistory.vue'
import popUp from './searchComponents/popUp.vue'
export default {
    data(){
        return{
            touch: false,
            searchCity: '',
            popup: false
        }
    },
    components:{
        favoriteList,
        SearchHistory,
        SearchCity,
        popUp
    },
    computed:{
        historyCities(){
            return this.$store.state.history.searchHistory
        },
        loading(){
            return this.$store.getters.loading
        }
    },
    methods:{
        input(){
            let typingTimer
            let doneTypingInterval = 500
            clearTimeout(typingTimer)
            typingTimer = setTimeout(()=>{
                if(this.searchCity !== ''){
                    this.$store.dispatch('fetchWeather', this.searchCity)
                }
            },doneTypingInterval)
        },
        clearInput(){
            this.searchCity = ''
        },
        getCurrentLoc(){
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const server = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&key=AIzaSyAUDwkgoD41c6QCUqRZ40R7bm5Ccg_J9y0`
                    const response = await fetch(server,{method: 'GET'})
                    const responseResult = await response.json()
                    this.$store.dispatch(
                        'getWeatherPossibleCity', 
                        responseResult.plus_code.compound_code.slice(
                            responseResult.plus_code.compound_code.indexOf(" "),
                            responseResult.plus_code.compound_code.indexOf(",")
                        ).trim()
                    )
                }
            )
            setTimeout(()=>{
                this.popup = true
            },150)
            
        },
        closePopUp(){
            this.popup = false
        }
    },
}
</script>

<style scoped lang="scss">
@import "@/style/template.scss";
    .padding{
        padding-top:25px;
    }
    .search{
        min-width: 300px;
        height: 48px;
        border-radius: 16px;
        box-shadow: 0px 0px 2px rgba(11, 26, 34, 0.26);
        display: flex;
        margin: 0px 16px;
        align-items: center;
    }
    .search-focus{
        display: flex;
        margin: 0px 16px 5px;
        align-items: center;
        min-width: 343px;
        height: 36px;
    }
    .border-bottom{
        min-width: 343px;
        height: 1px;
        background:$lines;
        margin: 0 0 25px 0;
    }   
    .search__arrow{
        width: 24px;
        height: 24px;
        margin: 0 20px;
    }
    .search__input{
        width: 280px;
        height: 24px;
        font-size: $regular-size;
        line-height: $line-height;
    }
    .search__target{
        margin: 0 15px;
        margin-left: auto;
    }
    .something{
        @extend %something;
    }
    .antisomething{
        top: 108px;
    }

    #loader{
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0px;
        top: 0px;

        background: rgba(255, 255, 255, 0.2);
        backdrop-filter: blur(8px);
    }
    #loader img {
		width: 36px;
        height: 36px;
		text-align: center;
		position: fixed;
		z-index: 999;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		margin: auto
	}
    .popupBg{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        background:rgba(0, 0, 0, 0.5) ;
        opacity: 0.5;
        transition: 0.5s all;
    }
    .notTouch{
        pointer-events: none; 
    }
</style>