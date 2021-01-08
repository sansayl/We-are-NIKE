import Vue from 'vue'
import Vuex from 'vuex'




Vue.use(Vuex)
// const router

export default new Vuex.Store({
  state: {
    islogin: true,
    // staffDetailVisible: false, //员工详情弹窗
    powerData: [], //权限列表
  },
  // 方法（对应methods）
  mutations: {
    toTrue(state) {
      state.islogin = true
    },
    toFlase(state) {
      state.islogin = false
    },
    //设置权限
    setPower(state, power) {
      if (power == "" || power == null || typeof (power) == "undefined") {
        state.powerData = {}
      } else
        state.powerData = power;
    },
  },
  //state的计算属性
  getters: {
    //菜单列表
    menuList: function (state, getters) {
      let menuListData = [];
      for (let key in state.powerData) {
        let menuData = {
          id: key,
          powername: key,
          powerurl: "",
          parentId: "",
          children: [],
        };
        state.powerData[key].forEach((item) => {
          menuData.children.push(item);
        });
        menuListData.push(menuData);
      }
      return menuListData;
    },
  },
  // 处理异步
  actions: {

  },
  modules: {}
})