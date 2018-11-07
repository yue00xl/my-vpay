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
import Input from '@/components/common/Input'
import popState from '@/components/common/popstate'
import uploadFile from '@/components/common/uploadFile'
import Arrays from '@/components/common/Array'
import Functions from '@/components/common/function'
import vueSlot from '@/components/common/vue_slot'
import vueSlot2 from '@/components/common/vue_slot2'
import elseSwitch from '@/components/common/elseSwitch'

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
    },
    {
      path: '/Inputs',
      name: 'Input',
      component: Input,
    },
    {
      path: '/popstate',
      name: 'popState',
      component: popState,
    },
    {
      path: '/uploadfile',
      name: 'uploadFile',
      component: uploadFile
    },
    {
      path: '/array',
      name: 'array',
      component: Arrays
    },
    {
      path: '/function',
      name: 'function',
      component: Functions
    },
    {
      path: '/vue_slot',
      name: 'slot',
      component: vueSlot
    },
    {
      path: '/vue_slot2',
      name: 'slot2',
      component: vueSlot2
    },
    {
      path: '/else_switch',
      name: 'elseSwitch',
      component: elseSwitch
    },
  ]
})
