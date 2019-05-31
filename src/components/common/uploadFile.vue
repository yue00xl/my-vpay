<!--上传视频-->
<template>
    <div>
        <input type="file" @change="uploadFile">
    </div>
</template>

<script>
import {mapMutations} from 'vuex'
import axios from "axios";
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
        ...mapMutations(['HEADERTITLE']),
        uploadFile(){
            let file = event.target.files[0];
            let formData = new FormData();
            formData.append("file", file);
            axios.post('http://oss.test.jiehun.com.cn/oss/image/uploadsingleimage?bizcode=001',formData,{
              headers:{
                "Content-Type": "multipart/form-data"
              }
            }).then(res=>{
              console.log(res)
            }).catch(err=>{
              console.log(err)
            })
            // let img=event.target.files[0];
            // let form = new FormData(); 
            // form.append('file',img);
            // console.log(img)

            // this.$axios.post('http://oss.test.jiehun.com.cn/oss/image/uploadsingleimage?bizcode=001',form,{
            //     headers:{'Content-Type':'multipart/form-data'}
            // }).then(response => {
            //     console.log(response)
            // }).catch(error => {
            //     //alert('上传图片出错！');
            // })   
        }
    }
}
</script>

<style>

</style>

