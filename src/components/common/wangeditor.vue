
<!--wangeditor-->
<template>
    <div>

        <div v-for="item in formData">
            {{item.id}}
            <wang-editors v-model="item.text" :keys="item.id"></wang-editors>
        </div>

        
        <el-button type="primary" class="primarys" @click="get_content">保存内容</el-button>
        <el-button type="primary" class="primarys" @click="jiaohuan">换位置</el-button>
        <el-button type="primary" class="primarys" @click="add">新增一个</el-button>
        <!-- <div>
            {{this.content}}
        </div> -->
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
            formData:[
                {text:'<p>000</p>',id:0},
                {text:'<p>111</p>',id:1}
            ],
        }
    },
    created(){
        this.HEADERTITLE('wangEditor');
    },
    mounted(){
        
    },
    methods:{
        ...mapMutations(['HEADERTITLE']),
        get_content(){
            console.log(this.formData)
        },
        add(){
            //新增一个
            var obj = {text:'',id:2};
            this.formData.unshift(obj)
            console.log(this.formData)
        },
        jiaohuan(){
            //交换位置
            this.swapArr(this.formData,0,1)
        },
        swapArr(arr, index1, index2){
            arr[index1] = arr.splice(index2, 1, arr[index1])[0];
            return arr;
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