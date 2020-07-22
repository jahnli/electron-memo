<template>
  <div id="app">
    <router-view class="router-view"></router-view>
  </div>
</template>
<script>
  export default {
    data(){
      return{

      }
    },
    methods:{

    },
  }
</script>
<style lang="less">
  html,body{
    .base-scroll-bar(8px,0);
  }
  #app,.router-view{
    height: 100%;
  }
</style>
