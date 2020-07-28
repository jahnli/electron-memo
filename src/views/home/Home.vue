<template>
   <div class='Home'>
      <a-list
              class="memo-list"
              :data-source="list"
      >
        <a-list-item class="memo-list-item" slot="renderItem" slot-scope="item,index">
          <a slot="actions"><a-icon @click="editHandle(item)" type="edit" /></a>
          <a slot="actions">
            <a-popconfirm
                    title="确定删除 ?"
                    ok-text="确定"
                    placement="left"
                    cancel-text="取消"
                    @confirm="deleteHandle(item)"
            >
              <a-icon theme="twoTone" two-tone-color="#f5222d" type="delete" />
            </a-popconfirm>
          </a>
          <a-list-item-meta>
            <div slot="description">
              <span>{{item.type | typeFilter}}</span>
              <div></div>
              <span>{{item.remindTime | dateformat('YYYY-MM-DD HH:mm')}}</span>
            </div>
            <span slot="title" class="title">{{ item.name }}</span>
            <a-avatar
                    slot="avatar"
                    icon="bell"
                    :size="28"
            />
          </a-list-item-meta>
        </a-list-item>
      </a-list>
      <a-modal
              destroyOnClose
              class="modal-area"
              title="编辑便签"
              okText="确定"
              :maskClosable="false"
              cancelText="取消"
              :visible="modalVisible"
              :confirm-loading="confirmLoading"
              @ok="updateHandle"
              @cancel="onCancel"
      >
        <a-form-model
                :model="memoForm"
                labelAlign="left"
                :label-col="{span:6}"
                :wrapper-col="{ span: 12}"
                ref="memoFormRef"
        >
          <a-form-model-item  prop="name" label="名称"><a-input placeholder="便签名称" v-model="memoForm.name" /></a-form-model-item>
          <a-form-model-item  prop="type" label="类型">
            <a-select v-model="memoForm.type" placeholder="类型">
              <a-select-option v-for="item in types" :value="item.value" :key="item.value">{{item.label}}</a-select-option>
            </a-select>
          </a-form-model-item>
          <a-form-model-item prop="remindTime" label="时间提醒">
            <a-date-picker
                    v-model="memoForm.remindTime"
                    show-time
                    type="date"
                    valueFormat="x"
                    placeholder="时间提醒"
                    style="width: 100%;"
            />
          </a-form-model-item>
        </a-form-model>
      </a-modal>
    </div>
</template>

<script>

  export default {
    name: "Home",
    data() {
      return {
        // 表单
        memoForm: {
          name: '',
          type: 'work',
          remindTime: undefined,
        },
        // select
        types:[
          {label:'工作提醒',value:'work'},
          {label:'生活事项',value:'life'},
          {label:'娱乐事项',value:'play'},
          {label:'其他事项',value:'rest'},
        ],
        // 确定按钮loading
        confirmLoading:false,
        list:[],
        // modal显示
        modalVisible:false
      }
    },
    created() {
      this.resetSize();
      this.getData();
    },
    mounted() {
    },
    methods: {
      // 获取便签
      async getData(){
        try {
          let {data:res} = await this.$axios(this.$memos.getApi);
          this.list = res.data;
        }
        catch (e) {

        }
      },
      // 更新操作
      async updateHandle(){
        try {
          let {data:res} = await this.$axios.patch(this.$memos.updateApi,this.memoForm);
          if(res.code == this.$code.success){
            this.modalVisible = false;
            this.$apiMessage(res.msg,res.code);
            this.getData();
          }
        }
        catch (e) {
          this.$message.error('客户端错误！')
        }
      },
      onCancel(){
        this.modalVisible = false;
        this.memoForm = {}
      },
      // 打开编辑
      editHandle(item){
        this.modalVisible = true;
        let temp = JSON.stringify({
          ...item,
          remindTime:item.remindTime ? this.$moment(+item.remindTime).format('x'):''
        });
        this.memoForm = JSON.parse(temp);
      },
      // 删除操作
      async deleteHandle(item){
        try {
          let {data:res} = await this.$axios.delete(this.$memos.deleteApi,{data:{_id:item._id}});
          if(res.code == this.$code.success){
            this.getData();
          }
          this.$apiMessage(res.msg,res.code);
        }
        catch (e) {

        }
      },
      // 初始化窗口，托盘
      resetSize(){
        this.$electron.ipcRenderer.send('changeTray',true)
      },
    },
    filters:{
      typeFilter(val){
        switch (val) {
          case 'work':
            return '工作提醒';
            break;
          case 'life':
            return '生活事项';
            break;
          case 'play':
            return '娱乐事项';
            break;
          case 'rest':
            return '其他事项';
            break;
        }
      }
    }
  }
</script>

<style lang="less">
  .Home {
    .memo-list{
      &-item{
        .title{
          font-size: 16px;
          color: #333;
        }
      }
    }
  }
  .modal-area{
    .ant-modal-body{
      height: 300px;
      overflow: auto;
      .base-scroll-bar(6px,0);
      .ant-form-item-label{
        line-height: 39.9999px;
      }
    }
  }
</style>
