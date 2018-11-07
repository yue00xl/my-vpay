
<!--v-model数据双向绑定-->
<template>
    <div>
        <p>父组件的数据：{{mylist}}</p>
        <p>name:--{{params.name}}</p>
        <p>id:--{{params.id}}</p>
        <x-button type="primary" @click.native="getData">获取父组件的数据</x-button>
        <my-model :myList="mylist" v-model="params"></my-model>
    </div>
</template>

<script>
import {mapMutations} from 'vuex'
import myModel from '@/components/public/model'
import { XButton } from 'vux'
export default {
    components:{
        myModel,
        XButton
    },
    data(){
        return{
            mylist:[],
            params:{
                name:'params',
                id:1
            }
        }
    },
    created(){
        this.HEADERTITLE('v-model数据双向绑定');
    },
    mounted(){
        
    },
    methods:{
        ...mapMutations(['HEADERTITLE']),
        getData(){
            console.log(this.params)
        }
    }
}

</script>

