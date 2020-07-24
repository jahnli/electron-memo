<template>
  <div class='about'>
    <h2>关于便签</h2>
    <p>版本信息：1.1.2</p>
    <p>开发者：Jahn</p>
    <a-tooltip>
      <template slot="title">掘金</template>
      <BaseIcon @click="goWebsite('https://juejin.im/user/593422512f301e00585813f1')" type="iconicon_wenzhang" class="icon"></BaseIcon>
    </a-tooltip>
    <a-tooltip>
      <template slot="title">Github</template>
      <BaseIcon @click="goWebsite('https://github.com')" type="icongithub" class="icon"></BaseIcon>
    </a-tooltip>

  </div>
</template>

<script>
  import BaseIcon from '@/components/icon/icon.js';
  export default {
    name: "about",
    data() {
      return {}
    },
    mounted() {

    },
    methods: {
      // 网站跳转
      goWebsite(website){
        this.$electron.shell.openExternal(website);
      }
    },
    components:{BaseIcon}
  }
</script>

<style lang="less">
  .about {
    .icon{
      cursor: pointer;
      font-size: 30px;
    }
    h2,p,.icon{
      margin:20px;
    }
  }
</style>
