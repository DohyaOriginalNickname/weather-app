<template>
    <div style="display:flex;">
        <div>
            <img src="@/assets/Vector.png" class="geolocation__logo">
        </div>
        <div class="geolocation__text">
            <h3>{{nameCity}}</h3>
        </div>
    </div>    
</template>

<script>
export default {
    props:{
        nameCity:{
            type: String
        },
    }
}
</script>

<style scoped>
    
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



