<template>
    <div>
        <div class="info">
            <div class="info__other">
                <div class="flex">
                    <img src="@/assets/wind.png" alt="">
                    <p class="info__other_text">{{city.wind}} км/ч</p>
                </div>
                <div class="flex">
                    <img src="@/assets/humidity.png" alt="">
                    <p class="info__other_text">{{city.humidity}}%</p>
                </div>
            </div>
            <div class="info__main">
                <div class="info__text">
                    <div class="info__date">
                        <p>Сегодня {{todayDate}}</p>
                    </div>
                    <div class="info__temp">
                        <p>{{Math.ceil(city.tempMax)}} / {{Math.ceil(city.tempMin)}}° С</p>
                    </div>
                </div>
                <div class="info__data">
                    <div v-for="hour in dayHours" :key="hour">
                        <div class="info-hour">
                            <div class="info-hour__text" style="font-weight: 600;">
                                <p>{{hour.temp}}</p>
                            </div>
                            <div>
                                <img :src="hour.img" class="info-hour__img">
                            </div>
                            <div class="info-hour__text">
                                <p>{{hour.time}}</p>
                            </div>
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
        city:{
            type: Object
        }
    },
    computed: {
        dayHours(){
            const dayHours = []
            for (let i = 0; i < this.city.dayHours.length; i++) {
                let data = {
                    temp: this.city.dayHours[i].temp_c, 
                    img: '', 
                    time: this.city.dayHours[i].time.slice(11)
                }
                switch (this.city.dayHours[i].condition.text) {
                    case 'Partly cloudy':
                        data.img = require('@/assets/weather-icon/SunCloudy.png')
                        break;
                    case 'Sunny':
                        data.img = require('@/assets/weather-icon/Sun.png')
                        break;
                    case 'Light rain':
                        data.img = require('@/assets/weather-icon/Rain.png')
                        break;
                    case 'Moderate rain':
                        data.img = require('@/assets/weather-icon/Rain.png')
                        break;
                    case 'Light rain shower':
                        data.img = require('@/assets/weather-icon/Rain.png')
                        break;
                    case 'Light drizzle':
                        data.img = require('@/assets/weather-icon/Rain.png')
                        break;
                    case 'Patchy rain possible':
                        data.img = require('@/assets/weather-icon/Rain.png')
                        break;
                    case 'Moderate or heavy rain with thunder':
                        data.img = require('@/assets/weather-icon/Thunder.png')
                        break;
                    case 'Patchy light rain with thunder':
                        data.img = require('@/assets/weather-icon/Thunder.png')
                        break;
                    default:
                        data.img = require('@/assets/weather-icon/Union.png')
                        break;
                }
                dayHours.push(data)
            }
            return dayHours
        },
        todayDate(){
            let todayDate
            const mounths = {
                '01':'янв',
                '02': 'фев',
                '03':'марта',
                '04':'апр',
                '05':'мая',
                '06':'июня',
                '07':'июля',
                '08':'авг',
                '09':'сен',
                '10':'окт',
                '11':'нояб',
                '12':'дек'
            }
            
            for (let i = 0; i <Object.keys(mounths).length; i++) {
                if(Object.keys(mounths)[i] === this.city.dayHours[0].time.slice(5,7)){
                    todayDate = `${this.city.dayHours[0].time.slice(8,11)} ${Object.values(mounths)[i]}`
                }
            }
            return todayDate
        }
    }
}
</script>

<style scoped>
    .info{
        position: absolute;
        width: 100%;
        bottom: 0;
    }
    .info__other{
        color: white;
        display: flex;
        justify-content: space-between;
        min-width: 95%;
        height: 24px;
        margin: 0 16px 36px;
        line-height: 24px;
    }

    .flex{
        display: flex;
    }
    .info__other_text{
        margin: 0 10px;
    }
    .info__main{
        height: 220px;
        background: #FFFFFF;
        border-radius: 24px 24px 0px 0px;
    }
    .info__text{
        padding-top: 22px;
        display:flex; 
        justify-content: space-between;
        margin: 0 16px 20px;
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
        padding: 0 10px;
        display: flex;
        justify-content: space-between;
        gap: 16px;
        overflow-x: scroll;
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