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
    .list-area{
      padding: 0 20px;
      .flex(space-between,center);
      margin-top: 30px;
      .ant-card{
        width: 33%;
        margin-right: 20px;
      }
    }
  }
</style>
