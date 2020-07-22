<template>
  <div class='Login'>
    <a-row class="login-context">
      <a-col class="login-img" :span="11">
        <img width="100%" height="100%" src="../../assets/login-bg.jpg" alt="">
      </a-col>
      <a-col class="login-area" :span="13">
        <a-form-model :model="loginForm">
          <a-form-model-item class="no-drag"><a-input placeholder="用户名" v-model="loginForm.userName" /></a-form-model-item>
          <a-form-model-item class="no-drag" ><a-input placeholder="密码" v-model="loginForm.psw" /></a-form-model-item>
          <a-form-model-item class="no-drag">
            <a-checkbox-group v-model="loginForm.type">
              <a-checkbox value="1" name="type">记住密码</a-checkbox>
              <a-checkbox value="2" name="type">自动登录</a-checkbox>
            </a-checkbox-group>
          </a-form-model-item>
          <a-form-model-item class="no-drag"  >
            <a-button type="primary" block @click="loginHandle">登录</a-button>
          </a-form-model-item>
        </a-form-model>
        <span class="register-area no-drag">注册账号</span>
      </a-col>
    </a-row>
  </div>
</template>

<script>
  export default {
    name: "Login",
    data() {
      return {
        loginForm:{
          type:[],
          userName:'',
          psw:''
        }
      }
    },
    created() {
      this.resetSize();
    },
    mounted() {

    },
    methods: {
      loginHandle(){
        this.$router.push({
          path:'/home'
        })
      },
      // 重置窗口
      resetSize(){
        let screen = this.$electron.remote.screen.getPrimaryDisplay().workAreaSize;
        const bounds = {
          x:screen.width / 2 - 350,
          y:screen.height / 2 - 200,
          width:700,
          height:400
        };
        this.$electron.ipcRenderer.send('setMainWin',bounds)
      }
    }
  }
</script>

<style lang="less">
  .Login {
    -webkit-app-region: drag;
    .login-context,.login-img,.login-area{
      height: 100%;
    }
    .login-area{
      .flex(center,center);
      .register-area{
        position: absolute;
        left: 20px;
        cursor: pointer;
        bottom: 20px;
        color: gray;
      }
    }
  }
</style>
