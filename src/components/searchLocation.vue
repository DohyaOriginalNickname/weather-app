<template>
    <div >
        <div class="search">
            <a @click.prevent="$router.push('/')">
                <img src="@/assets/arrow.png" alt="" class="search__arrow">
            </a>
            <input 
                type="text" 
                placeholder="Поиск локации" 
                class="search__input" 
                @focus="touch = true" 
                @blur="blur()"
                @input="input()"
                v-model="searchCity"
            >
            <img src="@/assets/focus.png" alt="" class="search__target">
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
                    <search-city :searchCity="searchCity"></search-city>
                </div>
            </div>
        </div>


        <div id="loader" v-if="loading === true">
            <img src="@/assets/Vp3R.gif" alt="">
        </div>
    </div>
</template>

<script>
import favoriteList from './searchComponents/favoriteList.vue'
import SearchCity from './searchComponents/searchCity.vue'
import SearchHistory from './searchComponents/searchHistory.vue'
export default {
    data(){
        return{
            touch: false,
            searchCity: ''
        }
    },
    components:{
        favoriteList,
        SearchHistory,
        SearchCity
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
        blur(){
            setTimeout(()=>{
                this.touch = false
            }, 200)
        },
        input(){
            if(this.searchCity !== ''){
                this.$store.dispatch('fetchWeather', this.searchCity)
            }
        }
    },
}
</script>

<style scoped>
    .search{
        min-width: 343px;
        height: 48px;
        border-radius: 16px ;
        box-shadow: 0px 0px 2px rgba(11, 26, 34, 0.26);
        display: flex;
        margin: 25px 16px;
        align-items: center;
    }   
    .search__arrow{
        width: 24px;
        height: 24px;
        margin: 0 20px;
    }
    .search__input{
        width: 280px;
        height: 24px;
        font-size: 16px;
        line-height: 24px;
    }
    .search__target{
        margin: 0 15px;
        margin-left: auto;
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
    .antisomething{
        top: 108px;
    }

    #loader{
        position: absolute;
        width: 100%;
        height: 667px;
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
</style>