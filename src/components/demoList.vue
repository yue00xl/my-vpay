<template>
  <div class="hello">
     <ul>
        <li class="list" v-for="(item,index) in demolist" :key="index">
            <router-link :to="item.url">{{item.name}}</router-link>
        </li>
     </ul>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: '各类好玩的demo集合',
      demolist:[
        { 
          name:'吸顶效果',
          url:'/suctionTop'
        },
        {
          name:'ES6',
          url:'/promises'
        },
        {
          name:'封装npm包使用',
          url:'/flex'
        },
        {
          name:'vueRouter',
          url:'/vueRouter'
        },
        {
          name:'JS的节流、防抖及使用场景',
          url:'/debounce'
        },
        {
          name:'Input各种坑',
          url:'/Inputs'
        },
        {
          name:'监听浏览器返回',
          url:'/popstate'
        },
        {
          name:'上传视频前进行预览',
          url:'/uploadfile'
        },
        {
          name:'数组和对象的一些操作',
          url:'/array'
        },
        {
          name:'函数传参更优雅的方式',
          url:'/function'
        },
        {
          name:'vue-slot的使用-1',
          url:'/vue_slot'
        },
        {
          name:'vue-slot的使用-2',
          url:'/vue_slot2'
        },
        {
          name:'JavaScript 复杂判断的更优雅写法',
          url:'/else_switch'
        },
        {
          name:'vue双向绑定v-model',
          url:'/vuemodel'
        },
        {
          name:'js基础算法',
          url:'/algorithm'
        },
        {
          name:'基于element-ui table拖动排序',
          url:'/sortTable'
        },
        {
          name:'wangEditor富文本编辑器',
          url:'/wangEditor'
        },
        {
          name:'a链接上绑定事件请求接口',
          url:'/wx'
        },
        {
          name:'数据上报',
          url:'/indexDB?status=2'
        },
        {
          name:'getBoundingClientRect',
          url:'/getBoundingClientRect'
        }
      ]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.list{
  width: 100%;
  height: 40px;
  border: 1px solid #ccc;
}
.list a{
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
