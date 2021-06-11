import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import demoList from '@/components/demoList'


const _import = file => require('@/components/common' + file + '.vue').default

// console.log(require('../components'));
// console.log(process.env.NODE_ENV);

import suctionTop from '@/components/common/suctionTop'
import Promises from '@/components/common/promise'
import flex from '@/components/common/flex'
import debounce from '@/components/common/debounce'
import Input from '@/components/common/Input'
import popState from '@/components/common/popstate'
import uploadFile from '@/components/common/uploadFile'
import Arrays from '@/components/common/Array'
import Functions from '@/components/common/function'
import elseSwitch from '@/components/common/elseSwitch'
import vueModel from '@/components/common/vue_model'
import algorithm from '@/components/common/algorithm'
import sortTable from '@/components/common/Sortable'
import questElement from '@/components/common/quest_element'
import spanMethods from '@/components/common/spanMethods'

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
      name: '吸顶效果',
      component: suctionTop,
    },
    {
      path: '/promises',
      name: 'ES6 promise',
      component: Promises,
    },
    {
      path: '/npms',
      name: '封装npm包使用',
      component: flex,
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
      path: '/questelement',
      name: '前端导出word',
      component: questElement
    },
    {
      path: '/spanMethods',
      name: '合并单元格',
      component: spanMethods
    }
  ]
})
