<template>
  <div class='Footer'>
    <section class="footer-left">
      <a-tooltip title="添加提醒">
        <a-popover
                placement="topLeft"
                @visibleChange="visibleChange"
                v-model="visible"
                title="添加便签"
                trigger="click"
        >
          <a-form-model
                  :rules="rules"
                  slot="content"
                  :model="memoForm"
                  labelAlign="left"
                  ref="memoFormRef"
          >
            <a-form-model-item prop="name" label="名称"><a-input placeholder="便签名称" v-model="memoForm.name" /></a-form-model-item>
            <a-form-model-item prop="type" label="类型">
              <a-select v-model="memoForm.type" placeholder="类型">
                <a-select-option v-for="item in types" :value="item.value" :key="item.value">{{item.label}}</a-select-option>
              </a-select>
            </a-form-model-item>
            <a-form-model-item prop="timestamp" label="时间提醒">
              <a-date-picker
                      v-model="memoForm.timestamp"
                      show-time
                      type="date"
                      valueFormat="x"
                      placeholder="时间提醒"
                      width="100%"
              />
            </a-form-model-item>
            <a-form-model-item style="text-align: right">
              <a-button @click="$refs.memoFormRef.resetFields()" style="margin-right: 10px">重置</a-button>
              <a-button type="primary" @click="addMemo">添加</a-button>
            </a-form-model-item>
          </a-form-model>
          <a-icon style="font-size: 18px"  type="plus" class="add-icon" />
        </a-popover>
      </a-tooltip>
      <a-tooltip title="更多工具">
        <BaseIcon style="font-size: 18px" @click="openTools" class="icon tools-icon"  type="icongongju" ></BaseIcon>
      </a-tooltip>
    </section>
    <section class="footer-right">
      <a-tooltip title="系统设置">
        <a-icon @click="openSetting" type="setting" style="font-size: 18px" class="icon" />
      </a-tooltip>
    </section>
  </div>
</template>

<script>
  import BaseIcon from '@/components/icon/icon.js';
  const { BrowserWindow } = window.require('electron').remote;
  const path = require('path');
  import {mapState} from 'vuex';
  export default {
    name: "Footer",
    data() {
      return {
        visible:false,
        // 表单
        memoForm: {
          name: '',
          type: 'work',
          timestamp: undefined,
        },
        // select
        types:[
          {label:'工作提醒',value:'work'},
          {label:'生活事项',value:'life'},
          {label:'娱乐事项',value:'play'},
          {label:'其他事项',value:'rest'},
        ],
        rules: {
          name: [
            { required: true, message: '请输入标题', trigger: 'blur' }
          ],
        },
        // 窗口
        settingWin:null,
        toolsWin:null,
      }
    },
    mounted() {

    },
    methods: {
      // 添加标签
      addMemo(){
        try {
          this.$refs.memoFormRef.validate(async valid => {
            let {name,type,timestamp} = this.memoForm;
            if (valid) {
              let params = {
                ip:returnCitySN["cip"],
                ip_address: returnCitySN["cname"],
                name,type,remindTime:timestamp,
                pid:this.userInfo.userName
              }
              let {data:res} = await this.$axios.post(this.$memos.addApi,params);
              if(res.code == this.$code.success){
                this.visible = false;
                this.$refs.memoFormRef.resetFields();
                this.$bus.$emit('getData')
              }
            } else {
              return false;
            }
          });
        }
        catch (e) {
          console.log(e);
        }
      },
      // 打开更多工具
      openTools(){
        if(this.toolsWin){
          return
        }else{
          this.createWin('toolsWin','更多工具','tools')
        }
      },
      // 打开设置
      openSetting(){
        if(this.settingWin){
          return
        }else{
          this.createWin('settingWin','软件设置','setting')
        }
      },
      // 创建窗口
      createWin(field,title = '便签',routerPath,args = {}){
        let options = {
          width:800,
          height:500,
          title:title,
          icon:path.join(__static + '/icon.png'),
          useContentSize:true,
          webPreferences: {
            nodeIntegration: true
          },
          resizable:false
        };
        this[field] = new BrowserWindow({...options,...args});
        this[field].setMenu(null);
        if (process.env.NODE_ENV !== 'production') {
          this[field].loadURL(`http://localhost:8080/#/${routerPath}`)
          this[field].openDevTools();
        } else {
          this[field].loadURL(`app://./index.html#/${routerPath}`)
        }
        this[field].openDevTools();
        this[field].on('closed', () => {
          this[field] = null
        })
      },
      visibleChange(e){

      }
    },
    computed: {
      ...mapState({
        userInfo:state=>state.user.userInfo
      })
    },
    components:{BaseIcon}
  }
</script>

<style lang="less">
  .Footer {
    height: 100%;
    padding: 0 20px;
    .flex(space-between,center);
    .add-icon{
      cursor: pointer;
    }
    .icon{
      cursor: pointer;
    }
    .tools-icon{
      margin-left: 20px;
    }
  }
</style>
