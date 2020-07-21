<template>
  <div class='Home'>
    <a-list
            class="memo-list"
            :data-source="data"
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
            <span>{{item.timestamp | dateformat('YYYY-MM-DD HH:mm',true)}}</span>
            <br>
            <span>{{item.category}}</span>
          </div>
          <span slot="title" class="title">{{ item.title }}</span>
          <a-avatar
                  slot="avatar"
                  icon="bell"
                  :size="28"
          />
        </a-list-item-meta>
      </a-list-item>
    </a-list>
    <a-modal
            class="modal-area"
            title="Title"
            okText="确定"
            :maskClosable="false"
            cancelText="取消"
            :visible="modalVisible"
            :confirm-loading="confirmLoading"
            @ok="updateHandle"
            @cancel="modalVisible = false"
    >
      <a-form-model  :model="memoForm" labelAlign="left" :label-col="{span:6}" :wrapper-col="{ span: 12}">
        <a-form-model-item label="名称"><a-input placeholder="请输入便签名称" v-model="memoForm.name" /></a-form-model-item>
        <a-form-model-item label="类型">
          <a-select v-model="memoForm.region" placeholder="请选择类型">
            <a-select-option v-for="item in types" :value="item.value" :key="item.value">{{item.label}}</a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item label="时间提醒">
          <a-date-picker
                  v-model="memoForm.date1"
                  show-time
                  type="date"
                  placeholder="选择时间提醒"
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
          date1: undefined,
          delivery: false,
          resource: '',
          desc: '',
        },
        // select
        types:[
          {label:'工作',value:'work'},
          {label:'生活',value:'life'},
          {label:'娱乐',value:'play'},
          {label:'其他',value:'rest'},
        ],
        // 确定按钮loading
        confirmLoading:false,
        data:[
          {title: '罗永浩直播',category:'直播',timestamp:1595311164000,},
          {title: '李佳琦直播',category:'直播',timestamp:1595314164000,},
          {title: '向往的生活',category:'综艺',timestamp:1545311264000,},
          {title: '极限挑战',category:'综艺',timestamp:1595314264000,},
          {title: '薇娅直播',category:'直播',timestamp:1591212364000,},
          {title: '薇娅直播',category:'直播',timestamp:1591212364000,},
          {title: '薇娅直播',category:'直播',timestamp:1591212364000,},
          {title: '薇娅直播',category:'直播',timestamp:1591212364000,},
        ],
        // modal显示
        modalVisible:false
      }
    },
    mounted() {

    },
    methods: {
      // 更新操作
      updateHandle(){

      },
      // 编辑
      editHandle(item){
        this.modalVisible = true;
      },
      // 删除操作
      deleteHandle(item){
        console.log(item);
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
