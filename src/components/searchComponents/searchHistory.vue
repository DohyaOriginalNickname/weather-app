<template>
    <div>
        <div class="history">
            <div class="history__text">История поиска</div>
            <div class="history__clear" @click="$store.dispatch('deleteHistory')">Очистить</div>
        </div>
        <div class="scroll">
            <div class="search-log border" v-for="log in dayHours" :key="log" @click="toTheStore(log)">
                <div style="display: flex;">
                    <div>
                        <img :src="log.img" class="search-list__image">
                    </div>
                    <div class="search-log__city">
                        <p>{{log.city}}</p>
                    </div>
                </div>
                <div class="search-log__temp">
                    <p>
                        <a><a v-if="log.tempMax > 0">+</a><a v-else-if="log.tempMax < 0">-</a>{{Math.ceil(log.tempMax)}}°</a> / <a><a v-if="log.tempMax > 0">+</a><a v-else-if="log.tempMax < 0">-</a>{{Math.ceil(log.tempMin)}}°</a>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import toTheStore from '@/mixins/toTheStore.js'
import getImg from '@/mixins/getImgForArray'
export default {
    mixins: [toTheStore,getImg],
    computed:{
        arrayCities(){
            return this.$store.state.history.searchHistory
        }
    },
    created(){
        this.$store.dispatch('updateHistoryCities', JSON.parse(localStorage.getItem('history')))
    }
}
</script>

<style scoped lang="scss">
@import "@/style/template.scss";
@import "@/style/mixin.scss";
    .scroll{
        overflow-y: scroll; 
        max-height: 550px;
    }
    .history{
        display: flex;
        justify-content: space-between;
        margin: 0 16px;
        font-size: $regular-size;
        line-height: $line-height;
    }
    .history__text{
        min-width: 171px;
        height: 24px;
    }
    .history__clear{
        width: 171px;
        text-align: right;
        color: $accentDark;
        cursor: pointer;
    }
    .search-log{
        margin: 16px 0;
        display: flex;
        min-width: 375px;
        height: 40px;
        justify-content: space-between;
    }
    .search-log__city{
        @extend %city-list__city;
    }
    .search-log__temp{
        @include search-log__temp(relative)
    }
    .search-list__image{
        @extend %city-list__image;
    }
    .border{
        @extend %border;
    }
</style>