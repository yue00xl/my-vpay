// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import vpay from 'yxl_vpay'

Vue.use(vpay);

Vue.config.productionTip = false

import './assets/css/common.css'

/* eslint-disable no-new */
router.beforeEach((to,form,next)=>{
  // console.log(to);
  // console.log(form);
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
