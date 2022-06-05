<template>
  <div class="wrapper">
    <router-view v-slot="{Component,route}">
      <transition 
        :enter-active-class="route.meta.enterClass" 
        :leave-active-class="route.meta.leaveClass" 
        mode="out-in"
      >
        <component :is="Component"/>
      </transition>
    </router-view>
  </div>
</template>

<script>
export default {
  created(){
    this.$store.dispatch('getHistory')
    this.$store.dispatch('getFavoriteCity')
  }
}
</script>

<style scoped>
  .wrapper{
    min-height: 667px;
  }
</style>

