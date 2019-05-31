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


delCookie('page-id');
var pageid = generateUUID();
console.log('pageid==='+pageid)
setCookie('page-id',pageid,'1','localhost');

console.log('cookie==='+getCookie('page-id'));

/* eslint-disable no-new */
router.beforeEach((to,from,next)=>{
  let isLogin = localStorage.getItem('token') ? localStorage.getItem('token') : false
  if(isLogin || to.name == 'Login'){
    next();
  }else{
    next({path:'/login'})
  }
})

 function generateUUID(){
  var d = new Date().getTime();
  var uuid = 'xxxxxxxx-xxxx-yxxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,
  function(c) {
      var r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c == 'x' ? r: (r & 0x3 | 0x8)).toString(16);
  });
  return uuid;
};

function getCookie(name){
  var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
  if(arr=document.cookie.match(reg)){
      return unescape(arr[2]); 
  }else{
      return null; 
  }
}

function delCookie(name){
  var oDate = new Date();     
  oDate.setTime(oDate.getTime() - 1); 
  var cval=getCookie(name); 
  if(cval!=null){
      document.cookie= name + "="+cval+";expires="+oDate.toGMTString(); 
  }
};

function evals(str){
  var Fn = Function;  //一个变量指向Function，防止有些前端编译工具报错
  return new Fn('return ' + 1000 * 60 * 60 * 24 * str)();
};

function setCookie(key,value,t,domain,path){
  //存cookie
  var oDate=new Date();
  t = evals(t);
  domain = domain || '.jiehun.com.cn';
  path = path || '/';
  oDate.setTime(oDate.getTime() + t);
  document.cookie=key+"="+encodeURIComponent(value)+";expires="+oDate.toGMTString()+";domain="+domain+";path="+path;
}



new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
