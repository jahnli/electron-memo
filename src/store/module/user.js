export default {
  state:{
    // 用户信息
    userInfo: null
  },
  getters:{

  },
  actions:{
  },
  mutations:{
    // 保存用户名
    saveUserInfo(state,userInfo){
      state.userInfo = userInfo;
    },
  }
}
