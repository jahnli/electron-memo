<template>
  <div class='Lock'  @mousedown="mousedown" @mouseup="mouseup">
    <a-avatar class="item" :size="60" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
    <div class="item input-area ">
      <a-input v-model="psw"  placeholder="解锁密码" />
    </div>
    <a-button class="item" @click="unlock">解锁</a-button>
  </div>
</template>

<script>
  import {mousedown, mouseup} from "../../renderer-process/renderer-process";

  export default {
    name: "Lock",
    data() {
      return {
        psw:'23232',
        userName:'x'
      }
    },
    mounted() {

    },
    methods: {
      unlock(){
        this.$router.go(-1)
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
