<template>
  <div class='Footer'>
    <section class="footer-left">
      <a-popover
              placement="topLeft"
              @visibleChange="visibleChange"
              v-model="visible"
              title="添加便签"
              trigger="click"
      >
        <a-form-model
                slot="content"
                :model="memoForm"
                labelAlign="left"
                ref="memoFormRef"
        >
          <a-form-model-item prop="title" label="名称"><a-input placeholder="便签名称" v-model="memoForm.title" /></a-form-model-item>
          <a-form-model-item prop="type" label="类型">
            <a-select v-model="memoForm.type" placeholder="类型">
              <a-select-option v-for="item in types" :value="item.value" :key="item.value">{{item.label}}</a-select-option>
            </a-select>
          </a-form-model-item>
          <a-form-model-item prop="timestamp" label="时间提醒">
            <a-date-picker
                    v-model="memoForm.timestamp"
                    show-time
                    type="date"
                    valueFormat="x"
                    placeholder="时间提醒"
                    width="100%"
            />
          </a-form-model-item>
          <a-form-model-item style="text-align: right">
            <a-button @click="$refs.memoFormRef.resetFields()" style="margin-right: 10px">重置</a-button>
            <a-button type="primary">添加</a-button>
          </a-form-model-item>
        </a-form-model>
        <a-icon type="plus" class="add-icon" />
      </a-popover>
    </section>
    <section class="footer-right"></section>
  </div>
</template>

<script>
  export default {
    name: "Footer",
    data() {
      return {
        visible:false,
        // 表单
        memoForm: {
          title: '',
          type: 'work',
          timestamp: undefined,
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
          {title: '罗永浩直播',type:'直播',timestamp:1595311164000,},
          {title: '李佳琦直播',type:'直播',timestamp:1595314164000,},
          {title: '向往的生活',type:'综艺',timestamp:1545311264000,},
          {title: '极限挑战',type:'综艺',timestamp:1595314264000,},
          {title: '薇娅直播',type:'直播',timestamp:1591212364000,},
          {title: '薇娅直播',type:'直播',timestamp:1591212364000,},
          {title: '薇娅直播',category:'直播',timestamp:1591212364000,},
          {title: '薇娅直播',category:'直播',timestamp:1591212364000,},
        ],
      }
    },
    mounted() {

    },
    methods: {
      visibleChange(e){

      }
    }
  }
</script>

<style lang="less">
  .Footer {
    height: 100%;
    padding: 0 20px;
    .flex(space-between,center);
    .add-icon{
      cursor: pointer;
    }
  }
</style>
