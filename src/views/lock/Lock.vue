<template>
  <div class='Lock'  @mousedown="mousedown" @mouseup="mouseup">
    <a-avatar icon="user" :size="60"/>
    <div class="item input-area ">
      <a-input v-model="psw"@keyup.enter="unlock"  placeholder="登录密码" />
    </div>
    <a-button class="item" @click="unlock">解锁</a-button>
  </div>
</template>

<script>
  import {mousedown, mouseup} from "../../renderer-process/renderer-process";
  import {mapState} from "vuex";

  export default {
    name: "Lock",
    data() {
      return {
        psw:''
      }
    },
    mounted() {
    },
    computed: {
      ...mapState({
        userInfo: state => state.user.userInfo,
      }),
    },
    methods: {
      unlock(){
        if(!this.psw){
          this.$message.error('请输入密码 ！');
          return
        }
        if(this.psw == this.userInfo.psw){
          this.$router.go(-1)
        }else{
          this.$message.error('密码错误 ！');
        }
      },
      mouseup,
      mousedown:(e)=>mousedown(e),
    }
  }
</script>

<style lang="less">
  .Lock {
    text-align: center;
    padding:100px 40px 0 40px;
    background-color: #FBFBFB;
    .item{
      margin: 20px 0;
    }
    .input-area{
      width: 220px;
      margin: 30px auto;
    }
  }
</style>

