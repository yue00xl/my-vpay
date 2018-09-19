<template>
  <div class="hello">
     <h1>{{msg}}</h1>
     <ul>
        <li v-for="(item,index) in demolist" :key="index">
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
          name:'flex',
          url:'/flex'
        },
        {
          name:'vueRouter',
          url:'/vueRouter'
        },
        {
          name:'JS的节流、防抖及使用场景',
          url:'/debounce'
        }
      ]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
