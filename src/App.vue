<template>
  <div id="app">
    <default-header :title="headersTitle"></default-header>
    <router-view/>
    <div>sfsdssss</div>
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
      
    }
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
  text-align: center;
  color: #2c3e50;
}
</style>
