<!--上传视频-->
<template>
    <div>
        <input type="file" ref="input" @change='changFile' :multiple='multiple'>
        <el-progress :percentage="percentage"></el-progress>
        <el-button @click="uploadAll">start</el-button>
        <el-button @click="stop">stop</el-button>
        <el-button @click="resume">断点续传</el-button>
    </div>
</template>

<script>
import {mapMutations} from 'vuex'
import OSS from 'ali-oss'
import SparkMD5 from 'spark-md5'
import axios from 'axios';

const pointerCache = {
    get(file,name){
        const cache = localStorage.getItem('cacheKey')
        if(!cache) return null;
        const cacheJson = JSON.parse(cache)
        if(cacheJson.name !== name) return null;
        cacheJson.file = file;
        return cacheJson;
    },
    set(pointer){
        localStorage.setItem('cacheKey',JSON.stringify(pointer));
    },
    remove(){
        localStorage.removeItem('cacheKey')
    }
}

export default{
    name:'uploadFile',
    data(){
        return{
            multiple:true,
            options:{}, //视频上传参数
            files:[], //存放file
            percentage:0,

            store:null,
            checkpoints:{} //所有分片上传文件的检查点
        }
    },
    created(){
        this.HEADERTITLE('视频上传');
        // const getOssConfig = (params = {}) => axios.post('/vos/inner/ali/getVoucherByAppkey', params);
    },
    methods:{
        ...mapMutations(['HEADERTITLE']),
        async changFile(){
            const files = this.$refs.input.files || [];
            for(let i = 0; i < files.length;i++){
                const file = files[i]
                const name = file.name;
                const md5name = await this.getName(file);
                if(!this.files.some(item => item.name === name)){
                    this.files.push({
                        file,
                        percent:0,
                        name,
                        md5name
                    })
                }
            }
            console.log(this.files)
        },
        getName(file){
            //将文件md5加密，防止重复上传
            return new Promise((resolve,reject)=>{
                const {name} = file;
                const suffix = name.substr(name.lastIndexOf('.'))
                const spark = new SparkMD5.ArrayBuffer();

                const reader = new FileReader();
                reader.readAsArrayBuffer(file);
                reader.addEventListener('load',(e)=>{
                    spark.append(e.target.result);
                    resolve(spark.end() + suffix)
                })
            })
        },
        async uploadAll(){
            //开始上传
            if(!this.files.length){
                console.log('请上传视频')
                return false;
            }

            for(let i =0; i<this.files.length;i++){
                const {file,name} = this.files[i];
                await this.upload(file,name,i)
            }
        },
        getAccesskey(file){
            return new Promise((resolve)=>{
                axios.post('http://open.test.jiehun.com.cn/vos/inner/ali/getVoucherByAppkey',{
                    appKey:'AzYiTAZAE7WXZWE7'
                }).then(res=>{
                    const option = res.data.data;
                    resolve(option);
                })
            })
        },
        upload(file,name,index){
            //console.log(file,name,index)
            const _this = this;
            this.getAccesskey(file).then(option=>{
                this.store= new OSS({
                    accessKeyId: option.accessKeyId,
                    accessKeySecret: option.accessKeySecret,
                    stsToken: option.securityToken,
                    bucket: option.bucket,
                    endpoint: option.endpoint,
                    region: option.region
                });
                const name = `${option.path}${option.videoIdStr}.${file.name.split('.').pop()}`;
                // _this.files[0].name = name;
                // let checkpoint = pointerCache.get(file, _this.files[0].md5name) // 断点续传指针
                // console.log('checkpoint', checkpoint)
                const result = this.store.multipartUpload(name, file, {
                    progress:_this.onMultipartUploadProgress
                })
            })
        },
        onMultipartUploadProgress(progress, checkpoint){
            //上传进度
            this.percentage = parseInt(progress * 100, 10);
            this.checkpoints[checkpoint.uploadId] = checkpoint;
            console.log(this.checkpoints)

        },
        resumeMultipartUpload(){
            var _this = this;
           Object.values(this.checkpoints).forEach((checkpoint)=>{
               const {uploadId, file, name} = checkpoint
               this.store.multipartUpload(uploadId,file,{
                   progress:_this.onMultipartUploadProgress,
                   checkpoint
               })
           })
        },
        stop(){
            //暂停
            if(this.store){
                this.store.cancel();
            }
        },
        resume(){
            //断点续传
            this.resumeMultipartUpload();
        }
    }
}
</script>

<style>

</style>

