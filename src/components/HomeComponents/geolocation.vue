<template>
    <div>
        <a class="geolocation">
            <div>
                <img src="@/assets/Vector.png" class="geolocation__logo">
            </div>
            <div class="geolocation__text">
                <h3>{{city}}</h3>
            </div>
        </a>
    </div>    
</template>

<script>
export default {
    props:['city']
}
</script>

<style scoped>
    .geolocation{
        display: flex;
        padding: 5px;
        margin: 0 10px;
        cursor: pointer;
    }
    .geolocation__logo{
        height: 21px;
        margin: 0 11px 0 0;
    }
    .geolocation__text{
        color: white;
        font-size: 16px;
        padding: 2px 0 0 0;
    }
</style>



