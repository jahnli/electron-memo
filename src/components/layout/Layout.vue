<template>
  <div class='Layout'>
    <div class="system-bar" @mousedown.prevent="mousedown" @mouseup.prevent="mouseup">
      <LayoutHeader></LayoutHeader>
    </div>
    <div class="header-area" @mousedown.prevent="mousedown" @mouseup.prevent="mouseup">备忘录</div>
    <router-view class="router-view"/>
    <div class="footer-area" @mousedown.prevent="mousedown" @mouseup.prevent="mouseup">
    </div>
  </div>
</template>

<script>
  import LayoutHeader from '@/components/layout/header/header.vue'
  import {mousedown, mouseup} from "../../renderer-process/renderer-process";
  export default {
    name: "Layout",
    data() {
      return {
        show:true
      }
    },
    created() {
      this.$electron.remote.getCurrentWindow().resizable = true;
    },
    mounted() {

    },
    methods: {
      mouseup,
      mousedown:(e)=>mousedown(e),
    },
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
