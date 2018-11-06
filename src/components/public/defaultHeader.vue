<template>
    <div>
        <div class="headers" ref="defaultHeader">
            <span @click="goback">返回</span>
            <h1>{{title}}</h1>
        </div>
    </div>
</template>


<script>
export default{
    props:{
        title: {
            type: String,
            default: '默认头部'
        },
    },
    data(){
        return{}
    },
    mounted(){
        
    },
    methods:{
        goback(){
            this.$store.commit('HEADERTITLE','首页');
            this.$router.go(-1)
        }
    }
}
</script>


<style>
.headers{
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid #ccc;
    position: relative;
    background: #fff;
    z-index: 999;
}
h1{
    height: 36px;
    line-height: 36px;
}
span{
    position: absolute;
    left: 20px;
}
</style>
