<template>
  <div id="app">
    <default-header :title="headersTitle" ref="defaultHeader"></default-header>
    <router-view  class="router_view" :style="{height:routerHeight+'px'}"/>
  </div>
</template>

<script>
import defaultHeader from '@/components/public/defaultHeader'
import {mapState} from 'vuex'
export default {
  name: 'App',
  components:{
    defaultHeader
  },
  data(){
    return{
      Header:'',
      routerHeight:''
    }
  },
  watch:{
    $route(to, from) {
      this.$store.commit('HEADERTITLE',to.name);
      if (window.$action) {
        window.$action._init();
      }
    }
  },
  created(){
    
  },
  mounted(){
    // this.Header = this.$refs.defaultHeader.$refs.defaultHeader.clientHeight;
    // this.routerHeight = window.innerHeight - this.Header;
    window.$action = new postdata({
      appkey:'hunbasha',
      //excludeurl:['suctionTop']
    })
  },
  computed:{
    ...mapState(['headersTitle'])
  },
  methods:{
    
  }
}
</script>

<style>
*{
  margin: 0; padding: 0;
}
body,html{
  width: 100%;
  height: 100%;
}
#app {
  width: 100%;
  height: 100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.router_view{
  height: 100%;
  overflow: auto;
}
</style>
