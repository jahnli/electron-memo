import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import  "./plugins/ant";
import './libs/api/config/index'

import Axios from './libs/axios';
Vue.prototype.$axios = Axios;

const electron = window.require('electron');
Vue.prototype.$electron = electron;
Vue.config.productionTip = false;



// 监听Esc退出程序
document.addEventListener('keyup',  (e) => {
  if (e.keyCode == 27) {
    let win = electron.remote.getCurrentWindow();
    if(win.id == 1){
      electron.remote.getCurrentWindow().hide();
    }else{
      electron.remote.getCurrentWindow().close();
    }
  }
})


// 时间格式化
const diffYear = new Date().getFullYear();
import moment from 'moment';
Vue.prototype.$moment = moment;
// 中文简体
moment.locale('zh-cn');
Vue.filter('dateformat', (val, pattern = 'YYYY-MM-DD HH:mm:ss',filter = false) =>{
  if(!val) return ;
  if(typeof val == "string"){
    val = Number(val)
  }
  if(filter){
    let year = new Date(val).getFullYear();
    if(year == diffYear){
      if(+new Date() - val < 86400000){
        return moment(val).format('[今天] HH:mm');
      }
      return moment(val).format('MM-DD HH:mm')
    }else{
      return moment(val).format(pattern)
    }
  }
  return moment(val).format(pattern)
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
