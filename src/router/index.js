import Vue from 'vue'
import Router from 'vue-router'

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
import vueModel from '@/components/common/vue_model'
import algorithm from '@/components/common/algorithm'
import sortTable from '@/components/common/Sortable'
import wangeditor from '@/components/common/wangeditor'
import wx from '@/components/common/wx'
import indexDB from '@/components/common/indexDB'
import digui from '@/components/common/digui'
import mintui from '@/components/common/mintui'
import wangeditor_config from '@/components/common/wangeditor_new'


Vue.use(Router)


export default new Router({
  routes: [
    {
      path: '/',
      name: 'demoList',
      component: demoList,
    },
    {
      path: '/suctionTop',
      name: '吸顶效果',
      component: suctionTop,
    },
    {
      path: '/promises',
      name: 'promises',
      component: Promises,
    },
    {
      path: '/npm',
      name: '封装npm包使用',
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
      name: 'JS的节流、防抖及使用场景',
      component: debounce,
    },
    {
      path: '/Inputs',
      name: 'Input各种坑',
      component: Input,
    },
    {
      path: '/popstate',
      name: '监听浏览器返回',
      component: popState,
    },
    {
      path: '/uploadfile',
      name: '上传视频前进行预览',
      component: uploadFile
    },
    {
      path: '/array',
      name: '数组和对象的一些操作',
      component: Arrays
    },
    {
      path: '/function',
      name: '函数传参更优雅的方式',
      component: Functions
    },
    {
      path: '/vue_slot',
      name: 'vue-slot的使用-1',
      component: vueSlot
    },
    {
      path: '/vue-slot的使用-2',
      name: 'slot2',
      component: vueSlot2
    },
    {
      path: '/else_switch',
      name: 'JavaScript 复杂判断的更优雅写法',
      component: elseSwitch
    },
    {
      path: '/vuemodel',
      name: 'vue双向绑定v-model',
      component: vueModel
    },
    {
      path: '/algorithm',
      name: 'js基础算法',
      component: algorithm
    },
    {
      path: '/sortTable',
      name: '基于element-ui table拖动排序',
      component: sortTable
    },
    {
      path: '/wangeditor',
      name: 'wangEditor富文本编辑器',
      component: wangeditor
    },
    {
      path: '/wangeditor_config',
      name: 'wangEditor富文本编辑器2',
      component: wangeditor_config
    },
    {
      path: '/wx',
      name: '浏览器缓存',
      component: wx
    },
    {
      path: '/indexDB',
      name: '数据上报',
      component: indexDB
    },
    {
      path: '/digui',
      name: '递归',
      component: digui
    },
    {
      path:'/mintui',
      name:'ES5/ES6',
      component:mintui
    }
  ]
})
