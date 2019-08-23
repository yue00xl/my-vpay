// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import vpay from 'yxl_vpay'
import ElementUI from 'element-ui';
import axios from 'axios';

Vue.config.productionTip = false

Vue.use(vpay);
Vue.use(ElementUI);

import 'element-ui/lib/theme-chalk/index.css';
import './assets/css/common.css'

Vue.prototype.$axios = axios;




/* eslint-disable no-new */
router.beforeEach((to,from,next)=>{
  let isLogin = localStorage.getItem('token') ? localStorage.getItem('token') : false
  if(isLogin || to.name == 'Login'){
    next();
  }else{
    next({path:'/login'})
  }
})



new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
