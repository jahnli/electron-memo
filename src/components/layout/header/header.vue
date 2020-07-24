<template>
  <div class='layout-header'>
    <section class="layout-header-left no-darg">
      <img src="../../../../public/icon.png" class="logo" alt="">
      <span class="title">便签</span>
      <a-badge dot><a-icon class="notification-icon" type="notification" /></a-badge>
    </section>
    <section class="layout-header-right no-darg">
      <BaseIcon @click.native="resetSize" class="handle-icon"  :type="isCollapsed ? 'iconunfold':'iconfold'" ></BaseIcon>
      <BaseIcon @click.native="handle('min')" class="handle-icon minus-icon"  type="iconmove" ></BaseIcon>
      <BaseIcon @click.native="handle('close')" class="handle-icon"  type="iconclose" ></BaseIcon>
    </section>
  </div>
</template>

<script>
  import BaseIcon from '@/components/icon/icon';
  export default {
    name: "layout-header",
    data() {
      return {
        isCollapsed:false
      }
    },
    mounted() {

    },
    methods: {
      // 重置窗口
      resetSize(){
        let bounds = this.$electron.remote.getCurrentWindow().getBounds();
        let {height} = bounds;
        if(height == 710){
          bounds = {...bounds,height:120}
        }else{
          bounds = {...bounds,height:710}
        }
        this.$electron.ipcRenderer.send('setMainWin',bounds)
        this.isCollapsed = !this.isCollapsed;
        this.$emit("collapseChange",this.isCollapsed);
      },
      handle(type){
        this.$electron.ipcRenderer.send(type);
      }
    },
    components:{BaseIcon}
  }
</script>

<style lang="less">
  .layout-header {
    padding: 0 20px;
    .flex(space-between,center);
    height: 40px;
    .layout-header-left,.layout-header-right{
      .flex(flex-start,center);
    }
    .logo{
      width: 20px;
    }
    .title{
      font-size: 16px;
      margin: 0 16px 0 10px;
      cursor: default;
    }
    .handle-icon{
      cursor: pointer;
      font-size: 18px;
    }
    .notification-icon{
      cursor: pointer;
      font-size: 15px;
    }
    .minus-icon{
      margin: 0 10px;
    }
  }
</style>
