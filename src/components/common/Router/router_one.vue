
<template>
    <div class="router_one">
        {{keepAlives}}
        <input type="text" v-model="inputText"/>   
    </div>
</template>

<script>
export default{
    data(){
        return{
            keepAlives:'keep',
            inputText:''
        }
    },
    activated(){
        console.log('activated');
        //缓存的组件 每次进入会调用
    },
    deactivated(){
        console.log('deactivated');
        //缓存的组件 每次离开会调用
    },
    mounted(){
        console.log('mounted');
        setTimeout(()=>{
            this.keepAlives = 'change'
        },2000)
    },
    beforeRouteEnter(to,from,next){
        next();
    }
}
</script>

<style>
.router_one{
    margin-top: 100px;
}
input{
    border: 1px solid #000;
}
</style>

