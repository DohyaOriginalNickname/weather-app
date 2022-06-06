<template>
    <div style="display:flex;">
        <div>
            <img src="@/assets/icons/Vector.png" class="geolocation__logo">
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
            type: String,
            default: 'Город не определен'
        },
    }
}
</script>

<style scoped lang="scss">
    .geolocation__logo{
        height: 21px;
        margin: 0 11px 0 0;
    }
    .geolocation__text{
        color:$white;
        font-size: $regular-size;
        padding: 2px 0 0 0;
    }
</style>



