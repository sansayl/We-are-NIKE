import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false
import axios from 'axios'

// 过滤
Vue.filter("format", function(value, arg) {
  function dateFormat(date, format) {
      if (typeof date === "string") {
          var mts = date.match(/(\/Date\((\d+)\)\/)/);
          if (mts && mts.length >= 3) {
              date = parseInt(mts[2]);
          }
      }
      date = new Date(date);
      if (!date || date.toUTCString() == "Invalid Date") {
          return "";
      }
      var map = {
          M: date.getMonth() + 1, //月份
          d: date.getDate(), //日
          h: date.getHours(), //小时
          m: date.getMinutes(), //分
          s: date.getSeconds(), //秒
          q: Math.floor((date.getMonth() + 3) / 3), //季度
          S: date.getMilliseconds(), //毫秒
      };

      format = format.replace(/([yMdhmsqS])+/g, function(all, t) {
          var v = map[t];
          if (v !== undefined) {
              if (all.length > 1) {
                  v = "0" + v;
                  v = v.substr(v.length - 2);
              }
              return v;
          } else if (t === "y") {
              return (date.getFullYear() + "").substr(4 - all.length);
          }
          return all;
      });
      return format;
  }
  return dateFormat(value, arg);
});
Vue.filter('status', function(val) {
  switch (val) {
      case '1':
          val = '待出库';
          break;
      case '2':
          val = '已出库';
          break;
      case '3':
          val = '待签收';
          break;
      case '4':
          val = '已签收';
          break;
  }
  return val
})






//添加请求拦截
axios.interceptors.request.use(
  config => {
    config.headers = {
      
    }
    console.log("我请求了");
    return config;
  },
  error => {
    return Promise.reject(error); // 固定写法
  }
)
Vue.prototype.$axios=axios

Vue.use(ElementUI);
new Vue({
  router,
  store, 
  render: h => h(App)
}).$mount('#app')
