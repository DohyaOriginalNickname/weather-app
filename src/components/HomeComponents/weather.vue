<template>
    <div class="weather">
        <div >
            <img :src='image' class="weather__icon">
        </div>
        
        <div class="weather__temp" >
            <h1 v-if="parseInt(temp) > 0">+{{temp}}</h1>
            <h1 v-else-if="parseInt(temp) < 0">-{{temp}}</h1> 
            <h1 v-else>{{temp}}</h1>  
        </div>

        <div class="weather__description">
            <h2 >{{description}}</h2>
        </div>
    </div>
</template>

<script>
export default {
    props:{
        temp:{
            type: String || Number,
            default: '-'
        },
        description:{
            type: String,
            default: '-'
        },
        image:{
            type: String,
        }
    },
}
</script>

<style scoped lang="scss">
    .weather{
        text-align:  center;
        color:$white;
        margin: 50px 0 0 0;
    }
    .weather__temp{
        margin-top: 5px;
        height: 56px;
        font-size: 48px;
        font-weight: $bold;
        min-width: 346px;
    }

    .weather__description{
        font-size: $bigger-size;
        font-weight: $bold;
        min-width: 346px;
        line-height: 20px;
    }
</style>