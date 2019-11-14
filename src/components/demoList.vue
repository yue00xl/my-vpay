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
import router from '@/router'
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: '各类好玩的demo集合',
      routes:router.options.routes,
      demolist:[]
    }
  },
  created(){
    this.routes.forEach(item =>{
      this.demolist.push({
        name:item.name,
        url:item.path
      })
    })
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
