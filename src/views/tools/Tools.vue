<template>
  <div class='Tools'>
    <a-alert message="自制软件，仅为学习交流使用，请勿用于其它用途 ！" banner  />
    <div class="list-area">
      <a-card hoverable v-for="(item,index) in list" :key="index">
        <template slot="actions" class="ant-card-actions">
          <a-icon key="setting" type="download" />
          <span>{{item.timestamp}}</span>
        </template>
        <a-card-meta :title="item.title" :description="item.desc">
          <a-avatar
                  slot="avatar"
                  src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
          />
        </a-card-meta>
      </a-card>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Tools",
    data() {
      return {
        list:[
          {name:'准时关机',icon:'',timestamp:'2020-03-20',desc:'一个可以个可以定时关机的软件'},
          {name:'准时关机，一个可以定时关机的软件',icon:'',timestamp:'2020-03-20',desc:'一个可以定时关机的软件'},
          {name:'准时关机',icon:'',timestamp:'2020-03-20',desc:'一个可以定时关机的软件'},
        ]
      }
    },
    mounted() {

    },
    methods: {}
  }
</script>

<style lang="less">
  .Tools {
    .list-area{
      padding: 0 20px;
      .flex(space-around,center);
      margin-top: 30px;
      .ant-card{
        flex: 1;
        margin-right: 20px;
      }
    }
  }
</style>
