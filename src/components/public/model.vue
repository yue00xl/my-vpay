

<template>
    <div>
        <p>子组件的数据：{{myList}} {{value}}</p>
        <x-button type="primary" @click.native="propsData">将数据传递到父组件</x-button>
    </div>
</template>

<script>
import { XButton } from 'vux'
export default{
    components:{
        XButton
    },
    name:'myModel',
    props:{
        'myList':{
            type:Array,
            default:function(){
                return []
            }
        },
        value:{
            type:Object,
            default:function(){
                return {}
            }
        }
    },
    data(){
        return{

        }
    },
    methods:{
        propsData(){
            console.log(this.value)
            this.$set(this.value,'name','propsData')
            this.$emit('input',this.value);
        }
    }
}
</script>
