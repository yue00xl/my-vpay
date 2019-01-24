<template>
    <div>
        <div class="list">
             <a href="javascript:;" id="action_post" class="action_post_web_data" data-action='{"actionName":"tab_gonglve","actionPosition":"cms-ss", "actionValue":"https://m.jiehun.com.cn"}'>
                <div style="width:100px;height:">
                    <h6>测试a链接上绑定事件请求接口</h6>
                </div>
             </a>
        </div>
        
         

        <div class="list" v-if="status == 0">
            <a  href="javascript:;" class="action_post_web_data" data-action='{"actionName":"tab_gonglve0","actionValue":"https://m.jiehun.com.cn"}'>测试a链接上绑定事件请求接口 v-if</a>
        </div>

        <div class="list" v-else>
            <a  href="javascript:;" class="action_post_web_data" data-action='{"actionName":"tab_gonglve333","actionValue":"https://m.jiehun.com.cn"}'>测试a链接上绑定事件请求接口33333 v-else</a>
        </div>



        
        <div class="list">
            <a  href="javascript:;" @click="postDatas('https://m.jiehun.com.cn333')">测试a链接上绑定事件请求接口1</a>
        </div>
        <!-- <div class="list" v-if="status == 2">
            <a  href="javascript:;" class="action_post_web_data" data-action='{"actionName":"tab_gonglve", "actionValue":"https://m.jiehun.com.cn"}'>测试a链接上绑定事件请求接口2</a>
        </div> -->



        <div class="list">
            <div id="getClick" >测试是否绑定了事件</div>
        </div>  

    </div>
</template>


<script>
import axios from 'axios'
import { setTimeout } from 'timers';
export default {
    data(){
        return{
            status:-1  //0 测试0  1 测试1   2 测试2
        }
    },
    created() {
        
    },
    mounted() {
        setTimeout(()=>{
            this.status = 0
        },1000)
        var element=document.getElementById("action_post");

        // $('#action_post').on('click',function(){
        //     console.log('1111')
        // });
        

        // element.onclick = function(){
        //     console.log('111')
        // }

        // var current = this.getDomEvent(element);
        // if(current){
        //     console.log(current)
        //     console.log('绑定了事件')
        // } 
    },
    methods: {
        postDatas(url){
            var params = {actionName:'tab_gonglve', actionValue:url,actionPosition:'cms-ss-ss-ss'};
            window.$action.h_actionDatas(params)
        },
        appendsDom(){
            var postDom = document.querySelector('#postdata')
            var node = document.createElement('div');
            node.innerHTML = '测试'
            postDom.appendChild(node)
        },
        getDomEvent(o){
            //监听是否绑定了事件
            var a="blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(' ');
            var b=[];
            for(var i=0;i<a.length;i++){
                if(o['on'+a[i]] || o["Listener-"+a[i]] || o.getAttribute('on'+a[i])){
                    b.push(a[i]);
                };
            };
            return b;
        },
        requests(){
            var params = {
                actionValue:'https://m.jiehun.com.cn'
            }
            
            window.addEventListener("unload", function(){
                navigator.sendBeacon("http://localhost:8088/open/requests", JSON.stringify(params))
            }, false)
            


            // for(var i=0;i<1000;i++){
            //     console.log(i)
            // }
            // axios.post('http://localhost:8088/open/requests',JSON.stringify(params)).then((res)=>{
            //     console.log(res)
            // }).catch((err)=>{
            //     console.log(err)
            // })
        }
    },
}
</script>


<style  scope>
.list{
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    cursor: pointer;
}
.action_post_web_data{
    display: block;
    width: 100%;
    height: 200px;
    text-align: center;
    display: flex;
    justify-content: center;
    /* border: 1px solid red; */
}
</style>