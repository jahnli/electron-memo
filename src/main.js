import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import  "./plugins/ant";
const electron = window.require('electron');
Vue.prototype.$electron = electron;
Vue.config.productionTip = false;

// 时间格式化
const diffYear = new Date().getFullYear();
import moment from 'moment';
// 中文简体
moment.locale('zh-cn');
Vue.filter('dateformat', (val, pattern = 'YYYY-MM-DD HH:mm:ss',filter = false) =>{
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
