<template>
    <div>
        <digui :data="arr"></digui>
    </div>
</template>

<script>
import {mapMutations} from 'vuex'
import digui from '../public/digui'
var data = require('../../test.json')
export default {
    components:{
        digui
    },
    data(){
        return{
            arr:data
        }
    },
    created(){
        console.log(this.arr)
        this.HEADERTITLE('getBoundingClinet');
    },
    mounted(){
        
    },
    methods:{
        ...mapMutations(['HEADERTITLE']),
    },
   
}
</script>
<style lang="">
img{
  width: 100%;
  display: block;
}
.header{
    
}
</style>