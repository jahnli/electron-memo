import Vue from 'vue'
import {
  message,
  Button,Col,Row,Icon,Select,InputNumber,Statistic,DatePicker,TimePicker,Modal,List,Avatar,Divider,Popconfirm,Layout,FormModel,Input,Badge,Checkbox,Popover,Tabs,Tooltip,Alert,Card
} from 'ant-design-vue';
const components = {
  Button,Col,Row,Icon,Select,InputNumber,Statistic,DatePicker,TimePicker,Modal,List,Avatar,Divider,Popconfirm,Layout,FormModel,Input,Badge,Checkbox,Popover,Tabs,Tooltip,Alert,Card
};
message.config({
  maxCount: 3,
});
Vue.prototype.$message = message;
Vue.prototype.$apiMessage = function(msg = '',type = 'info'){
  let newType;
  switch (type) {
    case 0:
      newType = 'warning'
      break;
    case 99:
      newType = 'warning'
      break;
    case 200:
      newType = 'success'
      break;
    case 500:
      newType = 'error'
      break;
    default:
      newType = type
  }
  message[newType]({
    content:msg
  });
}
Vue.prototype.$confirm = Modal.confirm;
Object.keys(components).forEach((key)=>{
  Vue.use(components[key])
})
