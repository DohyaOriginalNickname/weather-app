<template>
  <div class="wrapper">
    <router-view></router-view>
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
    position: relative;
    min-height: 667px;
  }
</style>

