<template>
  <div class='handle'>
    <a-select v-model="time" @change="timeSelect" class="time-select-area"  >
      <a-select-option :value="item.value" v-for="(item,index) in times" :key="index">{{item.label}}</a-select-option>
    </a-select>
    <a-divider type="vertical" />
    <a-select v-model="type" @change="typeSelect"  class="time-select-area"  >
      <a-select-option :value="item.value" v-for="(item,index) in types" :key="index">{{item.label}}</a-select-option>
    </a-select>
  </div>
</template>

<script>
  export default {
    name: "handle",
    data() {
      return {
        times:[
          {value:'default',label:'默认'},
          {value:1,label:'最先到期'},
          {value:-1,label:'最晚到期'},
        ],
        time:'default',
        types:[
          {label:'全部分类',value:'all'},
          {label:'工作提醒',value:'work'},
          {label:'生活事项',value:'life'},
          {label:'娱乐事项',value:'play'},
          {label:'其他事项',value:'rest'},
        ],
        type:'all'
      }
    },
    mounted() {

    },
    methods: {
      // 时间选择
      timeSelect(e){
        let params = {};
        if( e == 'default') {
          params = {createTime:-1};
        }else{
          params = {remindTime:+e};
        }
        this.$bus.$emit('getData','time', params)
      },
      // 类型选择
      typeSelect(e){
        let params = {};
        if( e == 'all') {
          params = {};
        }else{
          params = {type:e};
        }
        this.$bus.$emit('getData','type', params)
      }
    }
  }
</script>

<style lang="less">
  .handle {
    width: 100%;
    height: 100%;
    .flex(space-around,center);
    .time-select-area{
      width: 100px;
      .ant-select-selection{
        border: none;
        box-shadow: none;
      }
    }
  }
</style>
