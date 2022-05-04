<template>
    <div>
        <div class="history">
            <div class="history__text">История поиска</div>
            <div class="history__clear" @click="$store.commit('deleteHistory')">Очистить</div>
        </div>
        <div class="search-log border" v-for="log in historyCities" :key="log">
            <div>
                <img src="@/assets/weather-icon/SunCloudy.png" class="search-list__image">
            </div>
            <div style="display:flex;">
                <div class="search-log__city">
                    <p>{{log.city}}</p>
                </div>
                <div class="search-log__temp">
                    <p>{{log.temp}}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        historyCities:{
            type: Array
        }
    },
}
</script>

<style scoped>

    .history{
        display: flex;
        justify-content: space-between;
        margin: 0 16px;
        font-size: 16px;
        line-height: 24px;
    }

    .history__text{
        width: 172px;
        height: 24px;
    }

    .history__clear{
        width: 171px;
        text-align: right;
        color: #47B1E6;
    }

    .search-log{
        margin: 16px 0;
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