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
Vue.prototype.$confirm = Modal.confirm;
Object.keys(components).forEach((key)=>{
  Vue.use(components[key])
})
