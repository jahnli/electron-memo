<template>
  <div id="app">
    <div class="system-bar">
      <LayoutHeader></LayoutHeader>
    </div>
    <div class="header-area">备忘录</div>
    <router-view :class="{'no-show':!show}" v-if="show" class="router-view"/>
    <div class="footer-area"></div>
  </div>
</template>
<script>
  import LayoutHeader from '@/components/layout/header/header.vue'
  export default {
    data(){
      return{
        show:true
      }
    },
    methods:{

    },
    components:{LayoutHeader}
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
      top: 80px;
    }
    .no-show{
      height: 0;
    }
    .header-area,.footer-area{
      width: 100%;
      position: fixed;
      background-color: #FFFFFF;
      -webkit-app-region: drag;
    }
    .header-area{
      display: flex;
      justify-content: center;
      font-size: 20px;
      align-items: center;
      height: 40px;
      border-bottom: 1px solid #d9d9d9;
    }
    .footer-area{
      height: 40px;
      bottom: 0;
      border-top: 1px solid #d9d9d9;
    }
  }
</style>
