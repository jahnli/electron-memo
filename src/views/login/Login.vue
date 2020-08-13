<template>
  <div class='Login'>
    <a-row class="login-context">
      <a-col class="login-img" :span="11" @mousedown.prevent="mousedown" @mouseup.prevent="mouseup">
        <img width="100%" height="100%" src="../../assets/login-bg.jpg" alt="">
      </a-col>
      <a-col class="login-area" :span="13" @mousedown="mousedown" @mouseup="mouseup">
        <div class="handle-area">
          <BaseIcon @click.native="handle('min')" type="iconmove" class="icon-handle "></BaseIcon>
          <BaseIcon @click.native="handle('close')"  type="iconclose" class="icon-handle "></BaseIcon>
        </div>
        <a-form-model  :model="loginForm" ref="ruleForm" :rules="rules">
            <a-form-model-item prop="userName" class="no-drag">
              <a-input  placeholder="用户名" v-model="loginForm.userName" >
                <a-icon slot="prefix" type="user" />
              </a-input>
            </a-form-model-item>
          <a-form-model-item  prop="psw" class="no-drag" >
            <a-input-password placeholder="密码" v-model="loginForm.psw" >
              <a-icon type="edit" slot="prefix" />
            </a-input-password>
          </a-form-model-item>
          <a-form-model-item class="no-drag" v-if="isLogin">
            <a-checkbox-group  :value="loginForm.type" >
              <a-checkbox value="1"  @change="checkboxChange"  name="type"><span class="no-drag">记住密码</span></a-checkbox>
              <a-checkbox value="2"  @change="checkboxChange"  name="type"><span class="no-drag">自动登录</span></a-checkbox>
            </a-checkbox-group>
          </a-form-model-item>
          <a-form-model-item class="no-drag"  >
            <a-button type="primary" :loading="loading" block @click="isLogin ? loginHandle():registerHandle()">{{isLogin ? '登录':'注册'}}</a-button>
          </a-form-model-item>
        </a-form-model>
        <span class="register-area no-drag"  @click="toggleStatus">{{isLogin ? '注册':'登录'}}</span>
      </a-col>
    </a-row>
  </div>
</template>

<script>
  const fs = window.require('fs');
  import {mouseup,mousedown} from "../../renderer-process/renderer-process";
  import BaseIcon from '@/components/icon/icon'
  export default {
    name: "Login",
    data() {
      return {
        loginForm:{
          type:[],
          userName:'',
          psw:''
        },
        isLogin:true,
        loading:false,
        rules: {
          userName: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 3, max: 12, message: '用户名为3-12位数', trigger: 'blur' },
          ],
          psw: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 3, message: '密码过于简单', trigger: 'blur' },
          ],
        },
      }
    },
    created() {
      this.resetSize();
    },
    mounted() {
      this.$nextTick(()=>{
        this.readConfig();
      })
    },
    methods: {
      // 读取配置
      readConfig(){
        try {
          let json = fs.readFileSync('config.json');
          let res = JSON.parse(json);
          if(res.type.length){
            this.loginForm = res;
            if(this.loginForm.type.includes('2')){
              this.loginSubmit();
            }
          }
        } catch (e) {
          console.log(e);
        }
      },
      // 更改状态
      checkboxChange(e){
        let val = e.target.value;
        let checked = e.target.checked;
        if(val == 1 && checked){
          this.loginForm.type = ['1'];
        }else if(val == 1 && !checked){
          this.loginForm.type = [];
        }else if(val == 2 && checked){
          this.loginForm.type = ['1','2'];
        }else if(val == 2 && !checked){
          this.loginForm.type = [];
        }
      },
      // 注册
      registerHandle(){
        this.$refs.ruleForm.validate(async valid => {
          if (valid) {
            let {userName,psw}  = this.loginForm;
            let params = {
              ip:returnCitySN["cip"],
              ip_address: returnCitySN["cname"],
              userName,psw
            }
            let {data:res} = await this.$axios.post(this.$users.registerApi,params);
            this.$apiMessage(res.msg,res.code);
            if(res.code == this.$code.success){
              let {userName,psw} = this.loginForm;
              this.toggleStatus();
              this.loginForm = {userName,psw,type:[]}
            }
          } else {
            this.$message.error('格式错误！')
            return false;
          }
        });
      },
      // 更换状态
      toggleStatus(){
        this.isLogin = !this.isLogin;
        this.loginForm = {};
        this.readConfig()
      },
      // 登录
      async loginSubmit(){
        try {
          let {userName,psw}  = this.loginForm;
          let params = {
            ip:returnCitySN["cip"],
            ip_address: returnCitySN["cname"],
            userName,psw
          }
          this.loading = true;
          let {data:res} = await this.$axios.post(this.$users.loginApi,params);
          this.$apiMessage(res.msg,res.code);
          if(res.code == this.$code.success){
            this.$store.commit('saveUserInfo',res.data);
            this.$router.push({
              path:'/home'
            })
            let screen = this.$electron.remote.screen.getPrimaryDisplay().workAreaSize;
            const bounds = {
              // 减去宽度加上右边距
              x:screen.width - 320 - 100,
              y:150,
              width:320,
              height:710
            };
            this.$electron.ipcRenderer.send('setMainWin',bounds);
            this.createConfig(userName,psw);
          }
          this.loading = false;
        }
        catch (e) {
          this.loading = false;
          console.log(e);
        }
      },
      loginHandle(){
        this.$refs.ruleForm.validate(valid => {
          if (valid) {
            this.loginSubmit();
          } else {
            this.$message.error('格式错误！')
            return false;
          }
        });
      },
      // 创建配置文件
      createConfig(userName,psw){
        let params = {
          userName,psw,type:this.loginForm.type
        }
        fs.writeFile('config.json',JSON.stringify(params),err=>{
        })
      },
      // 重置窗口
      resetSize(){
        this.$electron.remote.getCurrentWindow().resizable = false;
        let screen = this.$electron.remote.screen.getPrimaryDisplay().workAreaSize;
        const bounds = {
          x:screen.width / 2 - 350,
          y:screen.height / 2 - 200,
          width:700,
          height:400
        };
        this.$electron.ipcRenderer.send('setMainWin',bounds);
        this.$electron.ipcRenderer.send('changeTray',false)
      },
      handle(type){
        this.$electron.ipcRenderer.send(type);
      },
      mouseup,
      mousedown:(e)=>mousedown(e),
    },
    components:{BaseIcon}
  }
</script>

<style lang="less">
  .Login {
    .login-context,.login-img,.login-area{
      height: 100%;
    }
    .login-area{
      position: relative;
      .flex(center,center);
      .register-area{
        position: absolute;
        left: 20px;
        cursor: pointer;
        bottom: 20px;
        color: gray;
      }
    }
    .handle-area{
      position: absolute;
      right: 15px;
      top: 15px;
      .icon-handle{
        font-size: 18px;
        margin-left: 10px;
        cursor: pointer;
      }
    }
  }
</style>
