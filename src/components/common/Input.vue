<!--input各种坑-->
<template>
    <div>
        <el-form :model="form">
            <div v-for="(item,index) in uid_data">
                <el-form-item label="xx">
                    <el-input v-model="form.uid[index]"></el-input>
                </el-form-item>
            </div>
            <el-button type="primary" @click="submitForm">保存</el-button>
        </el-form>
        <!-- <div class="input_main">
            <h6></h6>
            <ul><li v-for="(item,index) in 100">{{item}}</li></ul>
        </div>
        <input type="text" placeholder="说点什么吧..." @focus="scrollContent"> -->

    </div>
</template>

<script>
var data = {"婚博会索票":{"来源":[{"title":"2","url":"\/api\/ticket\/2","uid":"2"},{"title":"3","url":"\/api\/ticket\/3","uid":"3"},{"title":"4","url":"\/api\/ticket\/4","uid":"4"},{"title":"5","url":"\/api\/ticket\/5","uid":"5"},{"title":"6","url":"\/api\/ticket\/6","uid":"6"},{"title":"7","url":"\/api\/ticket\/7","uid":"7"},{"title":"1","url":"\/api\/ticket\/1","uid":"1"}]}};
export default {
    data(){
        return{
            timers:'',
            uid_data:[1,2],
            form:{
                uid:[]
            },
            arr:data
        }
    },
    methods:{
        submitForm(){
            console.log(this.form)
        },
        scrollContent(){
            this.timers = setInterval(()=>{
                this.scrollToEnd();
            },500)
        },
        scrollToEnd(){
            document.body.scrollTop = document.body.scrollHeight;
        }
    },
    mounted(){
        console.log(this.arr)
    }
}
</script>

<style scoped>
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
