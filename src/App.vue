<template>
  <div id="app">
    <div class="header-area" @click="toogle">备忘录</div>
    <router-view :class="{'no-show':!show}" v-if="show" class="router-view"/>
    <div class="footer-area"></div>
  </div>
</template>
<script>
  export default {
    data(){
      return{
        show:true
      }
    },
    methods:{
      toogle(){
        this.show = !this.show
        this.$electron.ipcRenderer.send('setMainWin')
      }
    }
  }
</script>
<style lang="less">
  html,body{
    .base-scroll-bar(8px,0);
  }
  #app{
    .router-view{
      padding:0 20px;
      width: 100%;
      height:calc(~'100% - 110px');
      position: absolute;
      .base-scroll-bar(6px,0);
      overflow:auto;
      top: 60px;
    }
    .no-show{
      height: 0;
    }
    .header-area,.footer-area{
      width: 100%;
      position: fixed;
      background-color: #FFFFFF;
    }
    .header-area{
      display: flex;
      justify-content: center;
      font-size: 20px;
      align-items: center;
      height: 60px;
      border-bottom: 1px solid #d9d9d9;
    }
    .footer-area{
      height: 40px;
      bottom: 0;
      border-top: 1px solid #d9d9d9;
    }
  }
</style>
