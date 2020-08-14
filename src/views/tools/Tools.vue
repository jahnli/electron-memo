<template>
  <div class='Tools'>
    <a-alert message="自制软件，绿色无毒，仅为学习交流使用，请勿用于其它用途 ！" banner  />
    <div class="list-area">
      <a-card hoverable v-for="(item,index) in list" class="item" :key="index">
        <template slot="actions" class="ant-card-actions">
          <a-icon key="setting" type="download" @click="openWebsite(item)"/>
          <span>{{item.createTime}}</span>
        </template>
        <a-card-meta :title="item.name" :description="item.desc">
          <a-avatar
                  slot="avatar"
                  :src="item.img"
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
        list:[]
      }
    },
    created() {
      this.getData();
    },
    methods: {
      openWebsite(item){
        this.$electron.shell.openExternal(item.down)
      },
      async getData(){
        try {
          let {data:res} = await this.$axios.get(this.$tools.getApi);
          this.list = res.data;
        } catch (e) {

        }
      }
    }
  }
</script>

<style lang="less">
  .Tools {
    height: calc(~'100% - 37px');
    .list-area{
      height: 100%;
      overflow: auto;
      padding: 20px 20px 0 20px;
      display: flex;
      justify-content: space-around;
      .base-scroll-bar(8px,0);
      flex-wrap: wrap;
      .ant-card{
        width:45%;
        height: 143px;
        margin-bottom: 20px;
      }
    }
  }
</style>
