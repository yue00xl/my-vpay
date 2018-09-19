import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import demoList from '@/components/demoList'
import suctionTop from '@/components/common/suctionTop'
import Promises from '@/components/common/Promise'
import flex from '@/components/common/flex'
import vueRouter from '@/components/common/vueRouter'
import routerOne from '@/components/common/Router/router_one'
import routerTwo from '@/components/common/Router/router_two'
import debounce from '@/components/common/debounce'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'demoList',
      component: demoList,
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/suctionTop',
      name: 'suctionTop',
      component: suctionTop,
    },
    {
      path: '/promises',
      name: 'Promises',
      component: Promises,
    },
    {
      path: '/flex',
      name: 'flex',
      component: flex,
    },
    {
      path: '/vueRouter',
      name: 'vueRouter',
      component: vueRouter,
      children:[
        {path:'one',name:'routerOne',component:routerOne,meta:{keepAlive:true}},
        {path:'two',name:'routerTwo',component:routerTwo,meta:{keepAlive:false}}
      ]
    },
    {
      path: '/debounce',
      name: 'debounce',
      component: debounce,
    }
  ]
})
