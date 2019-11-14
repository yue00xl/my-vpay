<template>
  <div >

  </div>
</template>

<script>
export default {
  data(){
    return{
      arr:[ [1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14] ] ] ], 10],
      newarr:[]
    }
  },
  created(){
    this.repeatArr(this.arr)
    console.log([... new Set(this.newarr)].sort((a,b)=>(a - b)))
    console.log([... new Set(this.arr.flat(Infinity))].sort((a,b)=>(a - b)))
   
  },
  mounted(){
    this.$store.commit('HEADERTITLE','ES5/ES6');
  },
  methods:{
    repeatArr(arr){
      //编写一个程序将数组扁平化去并除其中重复部分数据，最终得到一个升序且不重复的数组
      arr.forEach(item =>{
        if(item.length){
          this.repeatArr(item)
        }else{
          this.newarr.push(item)
        }
      })
    }
  }
}
</script>

<style>


</style>
