<template>
    <div class="weather">
        <div >
            <img src="@/assets/weather-icon/Union.png" alt="" class="weather__icon">
        </div>

        <div class="weather__temp">
            <h1>{{temp}}</h1> 
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
            type: String,
            default: '-'
        },
        description:{
            type: String,
            default: '-'
        },
        image:{
            type: String,
            default: '@/assets/weather-icon/Union.png'
        }
    }
}
</script>

<style scoped>
    .weather{
        text-align:  center;
        color: white;
        margin: 110px 0 0 0;
    }
    
    .weather__icon{
        max-width: 148px;
    }
    .weather__temp{
        margin: 20px 0 0 0;
        font-size: 48px;
        font-weight: 600;
        min-width: 346px;
    }

    .weather__description{
        font-size: 20px;
        font-weight: 600;
        min-width: 346px;
        margin: 10px 0;
    }
</style>