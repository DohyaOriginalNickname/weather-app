<template>
    <div>
        <div 
            @click="toTheStore(city)"
        >
            <div class="country">
                <!--The API translates "Iran" as "I ran" for some reason...-->
                <div class="country__text" v-if="city.country === 'Я побежал'">Иран</div> 
                <div class="country__text" v-else>{{city.country}}</div>
            </div>
            <div class="search-log border" >
                <div>
                    <img :src="getImg" class="search-list__image">
                </div>
                <div style="display:flex;">
                    <div class="search-log__city">
                        <p>{{city.city}}</p>
                    </div>
                    <div class="search-log__temp">
                        <p>{{city.tempMax}}°/{{city.tempMin}}°</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import getImg from '@/mixins/getImg'
export default {
    mixins:[getImg],
    computed:{
        city(){
            return this.$store.state.search.city
        }
    },
    methods: {
        toTheStore(city){
            localStorage.setItem('selectedCity', JSON.stringify(city))
            this.$store.dispatch('addToHistory',city)
            this.$store.commit('changeCity', city)
            this.$router.push('/')
        }
    },
}
</script>

<style scoped lang="scss">
@import "@/style/template.scss";
@import "@/style/mixin.scss";
    .country{
        margin: 16px 16px;
    }
    .country__text{
        width: 343px;
        height: 24px;
        color: $secondary;
        font-size: $regular-size;
        line-height: $line-height;
    }
    .search-log{
        display: flex;
        min-width: 375px;
        height: 40px;
    }
    .search-log__city{
        @extend %city-list__city;
    }
    .search-log__temp{
        @include search-log__temp(absolute)
    }
    .search-list__image{
        @extend %city-list__image;
    }
    .border{
        @extend %border;
    }
</style>