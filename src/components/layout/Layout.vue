<template>
  <div class='Layout'>
    <div class="system-bar">
      <LayoutHeader></LayoutHeader>
    </div>
    <div class="header-area">备忘录</div>
    <router-view class="router-view"/>
    <div class="footer-area">
      <div class="drag" style="width:100%;height: 100%"></div>
    </div>
  </div>
</template>

<script>
  import LayoutHeader from '@/components/layout/header/header.vue'
  export default {
    name: "Layout",
    data() {
      return {
        show:true
      }
    },
    mounted() {

    },
    methods: {},
    components:{LayoutHeader}
  }
</script>

<style lang="less">
  .Layout {
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
