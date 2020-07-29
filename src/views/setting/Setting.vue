<template>
  <div class='setting'>
    <a-tabs
            class="tabs-area"
            v-model="currentTab"
            tab-position="left"
    >
      <a-tab-pane key="1" tab="通用设置">
        <h2>基本设置</h2>
        <div class="item"><a-checkbox @change="">开机启动</a-checkbox></div>
        <div class="item"><a-checkbox @change="">禁止移动窗体</a-checkbox></div>
        <p class="label">默认字体：</p>
        <a-select default-value="lucy" style="width: 120px" >
          <a-select-option value="jack">Jack</a-select-option>
        </a-select>
        <p class="label">声音提醒：</p>
        <a-select default-value="lucy" style="width: 120px" >
          <a-select-option value="jack">Jack</a-select-option>
        </a-select>
      </a-tab-pane>
      <a-tab-pane key="2" tab="关于便签">
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
      .item{
        margin-bottom: 20px;
      }
      .label{
        margin-top: 20px;
      }
    }
  }
</style>
