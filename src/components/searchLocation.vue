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
                v-model="searchCity"
            >
            <img src="@/assets/focus.png" alt="" class="search__target">
        </div>
        <div :class="{ antisomething: touch === false}">
            <div v-if="touch === false">
                <favorite-list :favorite="favorite"></favorite-list>
            </div>
            <div v-else>
                <div v-if=" searchCity === '' ">
                    <p v-if="historyCities.length === 0" class="something">Введите название города</p>
                    <div v-else>
                        <search-history :historyCities = "historyCities" ></search-history>
                    </div>
                </div>
                <div v-else>
                    <search-city :arrayCities = "filtredCity"></search-city>
                </div>
            </div>
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
            favorite: true,
            arrayCities: [
                {country:'Казахстан',city:'Астана',weather:'Переменная облачность',temp:'+7° С', id: '1',},
                {country:'Нидерланды', city:'Амстердам',weather:'Гроза',temp:'+15° С', id:'2',},
                {country:'Венгрия', city:'Будапешт',weather:'Гроза',temp:'+11° С', id:'3',},
            ],
            searchCity: ''
        }
    },
    components:{
        favoriteList,
        SearchHistory,
        SearchCity
    },
    computed:{
        filtredCity(){
            return this.arrayCities.filter(name => {
                return name.city.toLowerCase().indexOf(this.searchCity.toLowerCase()) !== -1
            })
        },
        historyCities(){
            return this.$store.state.history.searchHistory
        }
    },
    methods:{
        blur(){
            setTimeout(()=>{
                this.touch = false
            }, 80)
        }
    },
    created(){
        this.$store.dispatch('getHistory')
    }
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
</style>