
<!--监听浏览器的返回-->
<template>
    <div>
        <confirm v-model="show"
        title="sdfsd"
        @on-cancel="onCancel"
        @on-confirm="onConfirm">
            <p style="text-align:center;">sdfs</p>
      </confirm>
    </div>
</template>

<script>
import {mapMutations} from 'vuex'
import { Confirm } from 'vux'
export default{
    components:{
        Confirm
    },
    data(){
        return{
            show:false
        }
    },
    mounted(){
        this.HEADERTITLE('监听浏览器的返回');
        if (window.history && window.history.pushState) {   
            history.pushState(null, null, document.URL);    
            window.addEventListener('popstate', this.pushHistory, false);  
        }
        // this.pushHistory();
        // window.addEventListener('popstate',function(e){
        //     alert('我监听到了浏览器的返回按钮事件啦'); 
        // },false)
    },
    methods:{
        ...mapMutations(['HEADERTITLE']),
        pushHistory(){
            this.$router.replace({path: '/'});
        },
        onCancel () {
            console.log('on cancel')
        },
        onConfirm (msg) {
            console.log('on confirm')
        },
    }
}
</script>
