
<!-- slot 的使用-->
<template>
    <div>
        <drop-down :scroll-state="scrollState" @onpull="getList" ref="myScroll">
            <div slot="scrollList">
                <ul class="list">
                    <li  v-for="(item,index) in listData" :key="index">
                        <img :src="item.imgUrl" alt="">
                        <p>{{item.name}}</p>
                    </li>
                </ul>
            </div>
        </drop-down>
    </div>
</template>

<script>
let obj = {
    name:'途牛旅拍',
    imgUrl:'https://img.tthunbohui.cn/dmp/h/cms/1539273600/jh-img-orig-ga_1050652503656210432_330_330_74859.jpg@!330c330'
}
import {mapMutations} from 'vuex'
import dropDown from '@/components/public/drop_down'
export default{
    name:'vue-slot',
    components:{
        dropDown
    },
    data(){
        return{
            scrollState:true,
            listData:[]
        }
    },
    created(){
        this.HEADERTITLE('slot的应用-1');
        for(let i = 0; i<10;i++){
            this.listData.push(obj);
        }
    },
    methods:{
        ...mapMutations(['HEADERTITLE']),
        getList(num){
            // console.log(num)
            this.$refs.myScroll.setState(1)
            if(this.listData.length <= 40){
                for(let i = 0; i<10;i++){
                    this.listData.push(obj);
                }
            }else{
                this.$refs.myScroll.setState(2)
            }
        }
    }
}
</script>

<style>
.list{
    display: flex;
    flex-wrap: wrap;
}
.list li{
    width: 50%;
    box-sizing: border-box;
    margin-top:10px;
    text-align: center;
}
.list li img{
    width: 170px;
    height: 170px;
    border-radius: 6px;
}
.list li p{
    width: 100%;
    text-align: center;
}
</style>
