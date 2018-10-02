<!--input各种坑-->
<template>
    <div>
        <div class="input_main">
            <h6></h6>
            <ul><li v-for="(item,index) in 100">{{item}}</li></ul>
        </div>
        <input type="text" placeholder="说点什么吧..." @focus="scrollContent">
    </div>
</template>

<script>
export default {
    data(){
        return{
            timers:''
        }
    },
    methods:{
        scrollContent(){
            this.timers = setInterval(()=>{
                this.scrollToEnd();
            },500)
        },
        scrollToEnd(){
            document.body.scrollTop = document.body.scrollHeight;
        }
    }
}
</script>

<style>
.input_main{
    position: absolute;
    width: 100%;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    overflow: scroll;
    -webkit-overflow-scrolling: touch;
}
input{
    width: 90%;
    height: 36px;
    border:1px solid #000;
    position: fixed;
    bottom: 0;
    left: 0;
}

</style>
