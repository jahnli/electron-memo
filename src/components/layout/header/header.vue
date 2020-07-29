<template>
  <div class='layout-header'>
    <section class="layout-header-left no-darg">
      <img src="../../../../public/icon.png" class="logo" alt="">
      <span class="title">便签</span>
      <a-tooltip title="提醒">
        <a-badge dot><a-icon class="notification-icon" type="notification" /></a-badge>
      </a-tooltip>
    </section>
    <section class="layout-header-right no-darg">
      <a-tooltip :title="isLock ? '解锁':'锁定'">
        <BaseIcon @click.native="lock" class="handle-icon"  :type="isLock ? 'iconicon':'iconjiesuo01'" ></BaseIcon>
      </a-tooltip>
      <a-tooltip :title="isCollapsed ? '展开':'收起'">
        <BaseIcon @click.native="resetSize" class="handle-icon"  :type="isCollapsed ? 'iconunfold':'iconfold'" ></BaseIcon>
      </a-tooltip>
      <a-tooltip title="最小化">
        <BaseIcon @click.native="handle('min')" class="handle-icon minus-icon"  type="iconmove" ></BaseIcon>
      </a-tooltip>
      <a-tooltip title="关闭">
        <BaseIcon @click.native="handle('close')" class="handle-icon"  type="iconclose" ></BaseIcon>
      </a-tooltip>
    </section>
  </div>
</template>

<script>
  import BaseIcon from '@/components/icon/icon';
  export default {
    name: "layout-header",
    data() {
      return {
        isCollapsed:false,
        isLock:false
      }
    },
    mounted() {

    },
    methods: {
      // 锁定
      lock(){
        this.isLock = !this.isLock;
        this.$emit("lockChange",this.isLock);
      },
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
      margin-left: 10px;
    }
    .notification-icon{
      cursor: pointer;
      font-size: 15px;
    }
  }
</style>
