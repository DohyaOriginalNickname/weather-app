<template>
    <div class="weather">
        <div class="weather__icon">
            <img src="../assets/weather-icon/Union.png" alt="">
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
    props:['temp','description']
}
</script>

<style scoped>
    .weather{
        text-align:  center;
        color: white;
        margin: 110px 0 0 0;
    }
    .weather__temp{
        font-size: 48px;
        font-weight: 600;
        min-width: 346px;
    }

    .weather__description{
        font-size: 20px;
        font-weight: 600;
        min-width: 346px;
    }
</style>