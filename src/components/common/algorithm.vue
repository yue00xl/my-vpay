
<!--js基础算法-->
<template>
    <div>
        <div>
            <label for="">初始值：</label>
            <i v-for="item in initArr">{{item}}/</i>
        </div>
        <div class="marginTop">
            <x-button type="primary" @click.native="sortThm">sort排序</x-button>
            <label for="">sort排序之后的值:</label>
            <i v-for="item in sortArrs">{{item}}/</i>
        </div>
        <div class="marginTop">
            <x-button type="primary" @click.native="maopaoThm">冒泡排序</x-button>
            <label for="">冒泡排序之后的值:</label>
            <i v-for="item in maopaoArrs">{{item}}/</i>
        </div>
        <div class="marginTop">
            <x-button type="primary" @click.native="xuanzeThm">选择排序</x-button>
            <label for="">选择排序之后的值:</label>
            <i v-for="item in xuanzeArrs">{{item}}/</i>
        </div>
        <div class="marginTop">
            <x-button type="primary" @click.native="kuaisuThm(kuaisuArrs)">***快速排序</x-button>
            <label for="">快速排序之后的值:</label>
            <i v-for="item in kuaisuArrs">{{item}}/</i>
        </div>
    </div>
</template>

<script>
import {mapMutations} from 'vuex'
import { XButton } from 'vux'
import { sep } from 'path';
export default{
    components:{XButton},
    data(){
        return{
            initArr:[1,2,5,3,33,6,5],
            sortArrs:[],
            maopaoArrs:[],
            xuanzeArrs:[],
            kuaisuArrs:[]
        }
    },
    created(){
        this.HEADERTITLE('js基础算法');
        this.kuaisuArrs = [...this.initArr]
    },
    methods:{
        ...mapMutations(['HEADERTITLE']),
        sortThm(){
            //sort排序
            this.sortArrs = [...this.initArr]
            this.sortArrs.sort((a,b)=>{
                return a - b;
            })
        },
        maopaoThm(){
            //冒泡排序
            this.maopaoArrs = [...this.initArr]
            let len = this.maopaoArrs.length;
            for(let outer = len; outer >=2; outer--){
                for(let inner =0; inner <= outer-1; inner++){
                    if(this.maopaoArrs[inner] > this.maopaoArrs[inner+1]){
                        // let temp = this.maopaoArrs[inner];
                        // this.maopaoArrs[inner] = this.maopaoArrs[inner+1];
                        // this.maopaoArrs[inner+1] = temp;
                        [this.maopaoArrs[inner],this.maopaoArrs[inner+1]] = [this.maopaoArrs[inner+1],this.maopaoArrs[inner]]  //ES6优化写法
                    }
                }
            }
        },
        xuanzeThm(){
            //选择排序  将第一个元素和其他元素作比较，检查完所有的元素后，最小的放在第一个位置，接下来再开始从第二个元素开始，重复以上一直到最后。
            this.xuanzeArrs = [...this.initArr]
            let len = this.xuanzeArrs.length;
            for(let inner = 0; inner < len -1; inner ++ ){
                for(let outer = inner; outer < len; outer++){
                    if(this.xuanzeArrs[outer] < this.xuanzeArrs[inner]){
                        [this.xuanzeArrs[outer],this.xuanzeArrs[inner]] = [this.xuanzeArrs[inner],this.xuanzeArrs[outer]]
                    }
                }
            }
        },
        kuaisuThm(arr){
            //快速排序  快速排序可以说是对于前端最最最最重要的排序算法，没有之一
            /***
             * 
             *简单说： 找到一个数作为参考，比这个数字大的放在数字左边，比它小的放在右边； 然后分别再对左边和右变的序列做相同的操作:
                选择一个基准元素，将列表分割成两个子序列；
                对列表重新排序，将所有小于基准值的元素放在基准值前面，所有大于基准值的元素放在基准值的后面；
                分别对较小元素的子序列和较大元素的子序列重复步骤1和2
             */
            if(arr.length <= 1){
                return arr;
            }
            var left = [],
                right = [],
                current = arr.splice(0,1)
            for(let i = 0; i < arr.length; i++) {
                if(arr[i] < current) {
                    left.push(arr[i])  //放在左边
                } else {
                    right.push(arr[i]) //放在右边
                }
            } 
            return this.kuaisuThm(left).concat(current,this.kuaisuThm(right)); //递归
        }
    }
}
</script>

<style>
.marginTop{margin-top: 20px;}
</style>
