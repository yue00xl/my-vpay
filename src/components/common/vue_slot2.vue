<!--vue-slot应用2-->
<template>
    <div>
        <!-- <vue-slot>
            <p>匿名卡槽</p>
        </vue-slot> -->
        <!--具名卡槽-->
        <!-- <vue-slot>
            <h1 slot="header">feather-header</h1>
            <div>feather-main</div>
            <p slot="footer">feather-footer</p>
        </vue-slot> -->
        
        <!--作用域卡槽   自定义卡槽-->   
        <vue-slot :arrlist="arrList"></vue-slot>

        <vue-slot :arrlist="arrList">
            <template slot-scope="scope">
                <p>id是---{{scope.element.id}}</p> <!--在这里进行自定义 可以插入一个组件-->
            </template>
        </vue-slot>
    </div>
</template>

<script>
import {mapMutations} from 'vuex'
import vueSlot from '@/components/public/slot'
export default{
    components:{
        vueSlot
    },
    data(){
        return{
            arrList:[
                {
                    id:'0',
                    name:'测试',
                    imgurl:'https://img.tthunbohui.cn/dmp/h/cms/1539273600/jh-img-orig-ga_1050652503656210432_330_330_74859.jpg@!330c330'
                }
            ]
        }
    },
    created(){
        this.HEADERTITLE('slot的应用-2');
    },
    methods:{
        ...mapMutations(['HEADERTITLE']),
    }
}
</script>
