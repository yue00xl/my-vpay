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
      demolist:[]
    }
  },
  created(){
    let routes = this.$router.options.routes;
    let demoList = [];
    routes.forEach((item)=>{
      demoList.push({
        url:item.path,
        name:item.name
      })
    })
    this.demolist = [...demoList]
  },
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
