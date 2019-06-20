<!--上传视频-->
<template>
    <div id="update">
      <!-- <input type="file" @change="uploadFile"> -->


      <upload-video
          ref="uploadVideo"
          appKey="WHyoQ4cIluPUfNSY"
          v-model="videoList"
          :option="{
            maxSize:'100mb',
            selectUpload:true,
          }"/>

    </div>
</template>

<script>
import {mapMutations} from 'vuex'
import axios from "axios";
import {uploadVideo} from 'hbh-upload'

export default{
    name:'uploadFile',
    data(){
        return{
          videoList:[]
        }
    },
    components:{
      uploadVideo
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
/*上传按钮*/
  .upload-box{
    margin-top:24px;
    margin-bottom:-20px;
  }
  .btn-box{
    margin-bottom:20px;
  }
  .icon-iocn_video{
    /* background:url(../assets/images/video_btn.png) no-repeat center; */
    /* background-size:86px;
    background-color:#F6F6F6; */
  }
  .icon-icon_delete:before{
    /* content:"\e64b"; */
  }
  .preview-box .delete{
    line-height: 1;
  }
  .preview-box:nth-child(3n){
    margin-right:0;
  }
  .preview-box:last-child{
    margin-bottom:20px;
  }
</style>

