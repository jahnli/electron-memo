<template>
   <div class='Home'>
      <a-list
              class="memo-list"
              :data-source="list"
      >
        <a-list-item class="memo-list-item" :class="{'tag-area':item.type == 'tag'}" slot="renderItem" slot-scope="item,index">
          <a slot="actions" v-if="item.type !== 'tag'" >
            <a-tooltip :title="item.status == 1 ? '编辑':''">
              <a-icon
                      @click="item.status == 1 ? editHandle(item):''"
                      type="edit"
                      :style="{color:item.status ==  1 ? '#1890ff':'rgba(0, 0, 0, 0.25)'}"
              />
            </a-tooltip>
          </a>
          <a slot="actions" v-if="item.type !== 'tag'">
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
          <a slot="actions" v-if="item.type !== 'tag'">
            <a-tooltip placement="left" :title="item.status == 1 ? '完成':'撤销完成'">
              <a-icon
                      @click="finishHandle(item)"
                      :type="item.status == 1 ? 'check':'undo'"
                      :style="{color:item.status ==  1 ? '#1890ff':'rgba(0, 0, 0, 0.25)'}"
              />
            </a-tooltip>
          </a>
          <a-list-item-meta>
            <div slot="description">
              <div v-if="item.type !== 'tag'">
                <span>{{item.type | typeFilter}}</span>
                <div></div>
                <span>{{item.remindTime | dateformat('YYYY-MM-DD HH:mm',true)}}</span>
              </div>
              <div v-else class="tag-area">
                <a-tag :color="tagColor(item.name)">{{item.name}}</a-tag>
              </div>
            </div>
            <span  v-if="item.type !== 'tag'" slot="title" class="title">{{ item.name }}</span>
            <a-avatar
                    v-if="item.type !== 'tag'"
                    slot="avatar"
                    :icon="item.remindTime ? 'bell':'flag'"
                    :size="28"
                    :style="item.remindTime ? {backgroundColor: '#fde3cf'}:''"
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
  import {mapState} from 'vuex';
  import moment from "moment";
  export default {
    name: "Home",
    data() {
      return {
        // 表单
        memoForm: {
          name: '',
          type: 'work',
          remindTime: undefined,
          status:1
        },
        // select
        types:[
          {label:'工作提醒',value:'work'},
          {label:'生活事项',value:'life'},
          {label:'娱乐事项',value:'play'},
          {label:'其他事项',value:'rest'},
        ],
        list:[],
        // modal显示
        modalVisible:false,
        // 头部筛选
        filterType:'',
        timefilter:{},
        typefilter:{}
      }
    },
    created() {
      this.getData();
      this.resetSize();
      this.$bus.$on('getData', (type,params)=>{
        if(type == 'time'){
          this.timefilter = params
        }
        if(type == 'type'){
          this.typefilter = params
        }
        this.getData()
      })
    },
    mounted() {
    },
    methods: {
      // 完成 、撤销
      finishHandle(item){
        item.status = item.status == 2 ? 1:2;
        this.memoForm = item;
        this.updateHandle();
      },
      // 获取便签
      async getData(){
        try {
          let params = {
            pid:this.userInfo.userName
          };
          if(Object.keys(this.timefilter).length){
            params.sort = this.timefilter
          }
          if(Object.keys(this.typefilter).length){
            params.filter = this.typefilter
          }
          let {data:res} = await this.$axios.post(this.$memos.getApi,params);
          if(res.code == this.$code.success){
            if(this.timefilter.remindTime){
              let beforeIndex = res.data.findIndex((item)=> moment(+item.remindTime).isBefore(moment().startOf('day')));
              if(beforeIndex !== -1){
                res.data.splice(beforeIndex,0,{name:'超时',type:'tag'})
              }
              let afterIndex = res.data.findIndex((item)=> moment(+item.remindTime).isAfter(moment().endOf('day')));
              if(afterIndex !== -1){
                res.data.splice(afterIndex,0,{name:'未来',type:'tag'})
              }
              let todayIndex = res.data.findIndex(item=>moment(+item.remindTime).isBetween(moment().startOf('day'), moment().endOf('day')))
              if(todayIndex !== -1){
                res.data.splice(todayIndex,0,{name:'今天',type:'tag'})
              }
            }
            this.list = res.data;
          }else{
            this.$apiMessage(res.msg,res.code);
          }
        }
        catch (e) {
          console.log(e);
        }
      },
      // 更新操作
      async updateHandle(){
        try {
          let {data:res} = await this.$axios.patch(this.$memos.updateApi,this.memoForm);
          if(res.code == this.$code.success){
            this.modalVisible = false;
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
    computed: {
      ...mapState({
        userInfo:state=>state.user.userInfo,
      }),
      tagColor(val){
        return function (type) {
          switch (type) {
            case '超时':
              return 'red';
              break;
            case '今天':
              return 'pink';
              break;
            case '未来':
              return 'blue';
              break;
            default:
              return ''
          }
        }
      }
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
        border-bottom: 1px solid #f5f5f5;
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
      padding: 0 20px;
      overflow: auto;
      .base-scroll-bar(6px,0);
      .ant-form-item-label{
        line-height: 39.9999px;
      }
    }
  }
  .tag-area{
    border-bottom: none !important;
  }
</style>
