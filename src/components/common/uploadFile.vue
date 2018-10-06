<!--上传视频-->
<template>
    <div>

    </div>
</template>

<script>
import {mapMutations} from 'vuex'
export default{
    name:'uploadFile',
    data(){
        return{

        }
    },
    created(){
        this.HEADERTITLE('视频上传');
    },
    methods:{
        ...mapMutations(['HEADERTITLE'])
    }
}
</script>

<style>

</style>

