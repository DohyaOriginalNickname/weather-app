<template>
    <div>
        <div class="search">
            <a @click.prevent="$router.push('/')">
                <img src="@/assets/arrow.png" alt="" class="search__arrow">
            </a>
            <input 
                type="text" 
                placeholder="Поиск локации" 
                class="search__input" 
                @focus="touch = true" 
                @blur="touch = false"
            >
            <img src="@/assets/focus.png" alt="" class="search__target">
        </div>
        <div class="something">
            <div v-if="touch === false">
                <div v-if="favorite === true">
                    <p>Какие-то избранные города</p>
                </div>
                <div v-else>
                    <p>У вас нету избранных городов</p>
                </div>
            </div>
            <div v-else>
                <p>Введите название города</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            touch: false,
            favorite: false
        }
    }
}
</script>

<style scoped>
    .search{
        min-width: 343px;
        height: 48px;
        border-radius: 16px ;
        box-shadow: 0px 0px 2px rgba(11, 26, 34, 0.26);
        display: flex;
        margin: 25px 16px;
        align-items: center;
    }   
    .search__arrow{
        width: 24px;
        height: 24px;
        margin: 0 20px;
    }
    .search__input{
        width: 280px;
        height: 24px;
        font-size: 16px;
        line-height: 24px;
    }
    .search__target{
        margin: 0 15px;
        margin-left: auto;
    }
    .something{
        position: absolute;
        width: 343px;
        height: 24px;
        left: calc(50% - 343px/2);
        top: calc(50% - 24px/2 + 0.5px);
        font-weight: 400;
        font-size: 16px;
        line-height: 24px;
        text-align: center;
        color: #B4B4B4;
    }
</style>