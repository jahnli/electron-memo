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
        <a-select default-value="lucy" style="width: 140px" >
          <a-select-option value="jack">Jack</a-select-option>
        </a-select>
        <p class="label">声音提醒：</p>
        <a-select v-model="audio" @change="audioChange" style="width: 140px" >
          <a-select-option value="katong">卡通（默认）</a-select-option>
          <a-select-option value="dingdong">叮咚</a-select-option>
          <a-select-option value="ding">提醒</a-select-option>
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
        restart:null,
        audio:'katong'
      }
    },
    created() {
      this.getSetting()
    },
    methods: {
      // 声音切换
      audioChange(e){
        fs.readFile('config.json', (err, data) => {
          let config = JSON.parse(data);
          fs.writeFile('config.json',JSON.stringify({...config,audio:this.audio}), (err) => {
            this.$electron.ipcRenderer.send('getSetting')
            if (err) throw err;
          });
        });
      },
      // 获取设置
      getSetting(){
        let res = this.$electron.remote.app.getLoginItemSettings();
        this.restart = res.openAtLogin;
        fs.readFile('config.json', (err, data) => {
          let config = JSON.parse(data);
          if(config.audio){
            this.audio = config.audio;
          }
        });
      },
      // 开机启动
      autoStartHandle(e){
        this.$electron.ipcRenderer.send('autoStart',e.target.checked);
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
