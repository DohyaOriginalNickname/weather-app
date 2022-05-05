<template>
    <div>
        <div 
            v-for="city in arrayCities" 
            :key="city.id"
            @click="$store.dispatch('addToHistory',city)"
        >
            <div class="country">
                <div class="country__text">{{city.country}}</div>
            </div>
            <div class="search-log border" >
                <div>
                    <img src="@/assets/weather-icon/SunCloudy.png" class="search-list__image">
                </div>
                <div style="display:flex;">
                    <div class="search-log__city">
                        <p>{{city.city}}</p>
                    </div>
                    <div class="search-log__temp">
                        <p>{{city.temp}}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props:{
        arrayCities:{
            type: Array
        }
    },
}
</script>

<style scoped>
    .country{
        margin: 16px 16px;
    }

    .country__text{
        width: 343px;
        height: 24px;
        color: #B4B4B4;
        font-size: 16px;
        line-height: 24px;
    }

    .search-log{
        display: flex;
        min-width: 375px;
        height: 40px;
    }
    .search-log__city{
        min-width: 187px;
        height: 24px;
        font-weight: 600;
        font-size: 16px;
        line-height: 24px;
        color: #1C293D;
    }
    .search-log__temp{
        position: absolute;
        right: 0;
        margin: 0 16px 0 0;
        min-width: 108px;
        height: 24px;
        font-size: 16px;
        line-height: 24px;
        text-align: right;
    }
    .search-list__image{
        width: 16.89px; 
        height:16.89px;
        margin: 0 16px;
    }

    .border{
        border-bottom: 1px solid #E9E9E9;
    }
</style>