<template>
  <div class='setting'>
    <a-tabs
            class="tabs-area"
            v-model="currentTab"
            tab-position="left"
    >
      <a-tab-pane key="1" tab="账号设置">
        Content of Tab Pane 1
      </a-tab-pane>
      <a-tab-pane key="2" tab="通用设置">
        Content of Tab Pane 2
      </a-tab-pane>
      <a-tab-pane key="3" tab="提醒设置">
        Content of Tab Pane 2
      </a-tab-pane>
      <a-tab-pane key="4" tab="关于便签">
        <About></About>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
  import About from './About.vue';
  export default {
    name: "setting",
    data() {
      return {
        currentTab:'1'
      }
    },
    mounted() {

    },
    methods: {

    },
    components:{About}
  }
</script>

<style lang="less">
  .setting {
    .tabs-area{
      height: 100%;
    }
  }
</style>
