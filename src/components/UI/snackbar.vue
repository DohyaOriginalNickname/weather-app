<template>
    <div class="snackbar">
        <img src="@/assets/icons/Succses.png" alt="">
        <p class="snackbar__text"><slot></slot></p>
        <p class="snackbar__return" v-if="!showUndoBtn" @click="canselDelete()">Отменить</p>
    </div>
</template>

<script>
export default {
    props: {
        showUndoBtn:{
            type: Boolean,
            default: false
        }
    },
    data(){
        return{
            revokeDelete: false
        }
    },
    methods: {
        canselDelete(){
            this.revokeDelete = true
            this.$emit('canselDelete', this.revokeDelete)
        }
    }
}
</script>


<style scoped lang="scss">
    .snackbar{
        visibility: hidden;
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        padding: 16px;
        min-width: 283px;
        height: 56px;
        text-align: center; 
        position: fixed; 
        left: calc(50% - 283px/2);
        bottom: 24px; 
        background: $white;
        border: 1px solid $lines;
        box-sizing: border-box;
        box-shadow: 2px 2px 4px rgba(11, 26, 34, 0.12);
        border-radius: 8px;
    }
    .show {
        visibility: visible;
        animation: fadein .6s, fadeout 0.8s 1.5s;
    }

    @keyframes fadein {
        from { opacity: 0;}
        to {opacity: 1;}
    }
    @keyframes fadeout {
        from { opacity: 1;}
        to { opacity: 0;}
    }
    .snackbar__text{
        min-width: 123px;
        height: 24px;
        left: calc(50% - 123px/2 - 32px);
        top: calc(50% - 24px/2);
        margin: 0px 8px;
        font-size: $regular-size;
        line-height: $line-height;
    }
    .snackbar__return{
        width: 88px;
        height: 24px;
        left: calc(50% - 88px/2 + 81.5px);
        top: calc(50% - 24px/2);
        font-size: $regular-size;
        line-height: $line-height;
        text-align: right;
        color: $accentDark;
        margin: 0px 8px;
    }
</style>