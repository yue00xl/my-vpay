

<!-- JS的节流、防抖及使用场景 -->
<template>
    <div>
        <div>
            <label>没有防抖的input</label>
            <input type="text" @input="unDebounce" v-model="unDebounceTest"/>
        </div>
        <div>
            <label>防抖的input</label>
            <input type="text" @input="debounceAjax" v-model="unDebounceTest"/>
        </div>
        <div :style="{height:Height+'px'}">

        </div>
    </div>
</template>

<script>
import { _debounce } from '@/public'
export default{
    data(){
        return{
            Height:1120,
            unDebounceTest:''
        }
    },
    mounted(){
        window.addEventListener('scroll', this._throttle(this.handleScroll,300));
    },
    methods:{
        handleScroll(){
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
            console.log(scrollTop)
        },
        debounceAjax(){
            _debounce(this.unDebounce,500)();
        },
        unDebounce(){
            setTimeout(()=>{
                console.log('ajax request+'+this.unDebounceTest);
            },200)
        },
        _debounce(fun, delay){
            return function (args) {
                let that = this
                let _args = args
                clearTimeout(fun.id)
                fun.id = setTimeout(function () {
                    fun.call(that, _args)
                }, delay)
            }
        },
        _throttle(fun, delay){
            let last, deferTimer
            return function (args) {
                let that = this
                let _args = arguments
                let now = +new Date()
                if (last && now < last + delay) {
                    clearTimeout(deferTimer)
                    deferTimer = setTimeout(function () {
                        last = now
                        fun.apply(that, _args)
                    }, delay)
                }else {
                    last = now
                    fun.apply(that,_args)
                }
            }
        }
    }
}
</script>

<style>
input{
    border: 1px solid #000;
}
</style>

