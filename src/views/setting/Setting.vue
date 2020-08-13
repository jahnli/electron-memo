<template>
  <div class='setting'>
    <a-tabs
            class="tabs-area"
            v-model="currentTab"
            tab-position="left"
    >
      <a-tab-pane key="1" tab="通用设置">
        <h2>基本设置</h2>
        <div class="item"><a-checkbox v-model="restart" @change="autoStartHandle">开机启动</a-checkbox></div>
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
  const fs = window.require('fs');
  export default {
    name: "setting",
    data() {
      return {
        currentTab:'1',
        restart:null
      }
    },
    mounted() {
      this.readConfig();
    },
    methods: {
      // 读取配置
      readConfig(){
        try {
          let json = fs.readFileSync('config.json');
          let res = JSON.parse(json);
          this.restart = res.restart;
        } catch (e) {
          console.log(e);
        }
      },
      // 开机启动
      autoStartHandle(e){
        this.$electron.ipcRenderer.send('autoStart',e.target.checked);
        try {
          let config = fs.readFileSync('config.json');
          if(config){
            let res  = JSON.parse(config);
            fs.writeFile('config.json',JSON.stringify({...res,restart:e.target.checked}),err=>{})
          }
        }catch (e){

        }
      }
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
