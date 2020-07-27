<template>
  <div class='handle'>
    <a-select v-model="time" class="time-select-area"  >
      <a-select-option :value="item.value" v-for="(item,index) in times" :key="index">{{item.label}}</a-select-option>
    </a-select>
    <a-divider type="vertical" />
    <a-select v-model="type" class="time-select-area"  >
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
          {value:'default',label:'默认时间'},
          {value:'before',label:'最先到期'},
          {value:'later',label:'最晚到期'},
        ],
        time:'default',
        types:[
          {value:'all',label:'全部分类'},
          {value:'before',label:'生活'},
          {value:'later',label:'娱乐'},
        ],
        type:'all'
      }
    },
    mounted() {

    },
    methods: {}
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
