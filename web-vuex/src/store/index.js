import Vue from 'vue'
import Vuex from 'vuex'




Vue.use(Vuex)
// const router

export default new Vuex.Store({
  state: {
    islogin:true
    // staffDetailVisible: false, //员工详情弹窗
  },
  // 方法（对应methods）
  mutations: {
      toTrue(state){
        state.islogin=true
      },
      toFlase(state){
        state.islogin=false
      }
  },
  // 计算
  actions: {
  },
  modules: {
  }
})

