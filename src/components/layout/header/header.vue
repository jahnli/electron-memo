<template>
  <div class='layout-header'>
    <section class="layout-header-left">
      <a-avatar :size="19"  style="backgroundColor:#87d068" icon="notification" />
      <span class="title">便签</span>
      <a-badge dot><a-icon style="font-size: 15px" type="notification" /></a-badge>
    </section>
    <section class="layout-header-right">
      <a-icon @click.native="handle('collapse')" class="handle-icon no-drag" style="font-size: 18px"   type="up-square" />
      <a-icon @click.native="handle('min')" class="minus-icon handle-icon no-drag" style="font-size: 18px"  type="minus-square" />
      <a-icon @click.native="handle('close')" class="handle-icon no-drag" style="font-size: 18px"  type="close-square" />
    </section>
  </div>
</template>

<script>
  export default {
    name: "layout-header",
    data() {
      return {}
    },
    mounted() {

    },
    methods: {
      handle(type){
        this.$electron.ipcRenderer.send(type);
      }
    }
  }
</script>

<style lang="less">
  .layout-header {
    -webkit-app-region: drag;
    padding: 0 20px;
    .flex(space-between,center);
    height: 40px;
    .layout-header-left,.layout-header-right{
      .flex(flex-start,center);
    }
    .title{
      font-size: 16px;
      margin: 0 16px 0 10px;
    }
    .handle-icon{
      cursor: pointer;
    }
    .minus-icon{
      margin: 0 10px;
    }
  }
</style>
