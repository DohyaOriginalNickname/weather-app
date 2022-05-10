<template>
    <div>
        <div class="info">
            <div class="info__other">
                <div class="flex">
                    <img src="@/assets/wind.png" alt="">
                    <p class="info__other_text">{{wind}} км/ч</p>
                </div>
                <div class="flex">
                    <img src="@/assets/humidity.png" alt="">
                    <p class="info__other_text">{{humidity}}%</p>
                </div>
            </div>
            <div class="info__main">
                <div class="info__text">
                    <div class="info__date">
                        <p>Сегодня</p>
                    </div>
                    <div class="info__temp">
                        <p>{{Math.ceil(tempMax)}} / {{Math.ceil(tempMin)}}° С</p>
                    </div>
                </div>
                <div class="info__data">
                    <div class="info-hour">
                        <div class="info-hour__text" style="font-weight: 600;">
                            <p>Temp</p>
                        </div>
                        <div>
                            <img src="@/assets/weather-icon/SunCloudy.png" class="info-hour__img">
                        </div>
                        <div class="info-hour__text">
                            <p>Hour</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        humidity:{
            type: Number
        },
        wind:{
            type: Number
        },
        tempMax:{
            type: Number
        },
        tempMin:{
            type: Number
        }
    }
}
</script>

<style scoped>
    .info__other{
        color: white;
        display: flex;
        justify-content: space-between;
        width: 93%;
        height: 24px;
        position: absolute;
        left: 16px;
        top: 387px;
        line-height: 24px;
    }

    .flex{
        display: flex;
    }
    .info__other_text{
        margin: 0 10px;
    }
    .info__main{
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 220px;
        background: #FFFFFF;
        border-radius: 24px 24px 0px 0px;
    }
    .info__text{
        display:flex; 
        justify-content: space-between;
        margin: 24px 16px 12px;
    }
    .info__temp{
        width: 171px;
        height: 24px;
        font-size: 16px;
        line-height: 24px;
        text-align: right;
        color: #1C293D;
    }
    .info__date{
        width: 172px;
        height: 24px;
        font-weight: 600;
        font-size: 16px;
        line-height: 24px;
        color: #1C293D;
    }
    .info__data{
        display: flex;
        justify-content: space-around;
    }
    .info-hour{
        width: 64px;
        height: 136px;
        background: #E4F0FA;
        border-radius: 12px;
        padding: 12px 8px;
    }
    .info-hour__text{
        width: 48px;
        height: 24px;
        font-size: 16px;
        line-height: 24px;
        text-align: center;
        color: #1C293D;
    }
    .info-hour__img{
        margin: 12px 4px;
        width: 40px;
        height: 40px;
    }
</style>