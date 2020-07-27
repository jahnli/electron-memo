import Vue from 'vue';
let files = require.context('../', false, /.js/);
files.keys().forEach(api=>{
  let module = api.substring(2,api.length - 3);
  Vue.prototype[`$${module}`] = files(api).default;
})

export const code = {
  success:200,
  err:500,
  warn:99,
  exist:0
}

Vue.prototype.$code =  code
