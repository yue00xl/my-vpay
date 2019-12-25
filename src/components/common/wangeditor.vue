
<!--wangeditor-->
<template>
    <div>
        <!-- <div v-for="(item,index) in formData">
            <wang-editors v-model="item.text" :keys="item.index" ></wang-editors>
        </div> -->


        <wang-editors v-model="copys" keys="1" ></wang-editors>
        
        <el-button type="primary" class="primarys" @click="get_content">保存内容</el-button>
        <el-button type="primary" class="primarys" @click="jiaohuan">换位置</el-button>
        <el-button type="primary" class="primarys" @click="add">新增一个</el-button>
        <!-- <div>
            {{this.content}}
        </div> -->

        <div>
            <div v-html="copys"></div>
        </div>
    </div>
</template>

<script>
import wangEditors from '@/components/public/wangediters'
import {mapMutations} from 'vuex'
export default{
    components:{
        wangEditors
    },
    data(){
        return{
            index:0,
            sortArr:[],
            formData:[
                {text:'<p>水电费水电费水电费水电费</p>'},
                {text:'<p>温热温热污染物</p>'}
            ],
            copys:''
        }
    },
    created(){
        this.HEADERTITLE('wangEditor');
        var count=10;
        for (var i=0;i<count;i++){
            this.sortArr[i]=i+1;
        }
        for(let i=0;i<this.formData.length;i++){
            this.formData[i].index = this.sortArr[i];
        }
        this.sortArr.splice(0,this.formData.length)
    },
    mounted(){
        
    },
    methods:{
        ...mapMutations(['HEADERTITLE']),
        get_content(){
            // for(let i=0; i<this.formData.length;i++){
            //     if(this.formData[i]['index']){
            //         delete this.formData[i].index;
            //     }
            // }

            console.log(this.copys)
        },
        add(){
            //新增一个
            var obj = {text:''};
            obj.index = this.sortArr[0];
            this.formData.unshift(obj)
            this.sortArr.splice(0,1)
        },
        jiaohuan(){
            //交换位置
            this.swapArr(this.formData,0,1)
        },
        swapArr(arr, index1, index2){ 
            arr[index1] = arr.splice(index2, 1, arr[index1])[0];
            return arr;
        },
        getId(index){
            let num = Math.random()
            let mathIndex = Math.ceil(num*10)
            return String(index) + String(mathIndex);
        }
    }
}
</script>

<style  scoped>
.primarys{
    margin: 20px 0 0 10px;
}
h5{
    color: red;
    font-size: 100px;
}
</style>