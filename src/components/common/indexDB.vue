
<template>
    <div>
        <div id="container"></div>

        <button @click="action">事件上报</button>
        <!-- <a href="https://m.jiehun.com.cn/baike/">测试referer</a> -->

        <div class="action_post_web_data" data-action="{ actionName:'tab_gonglve',    actionValue:' https://m.jiehun.com.cn'}">action_post_web_data</div>

    </div>
</template>


<script>
import {mapMutations} from 'vuex'
export default {
    data(){
        return{
            temp:1,
            temp1:'tempq',
            temp2:{obj:1}
        }
    },
    created(){
        this.HEADERTITLE('数据上报');
         var scm_data = {
            'scm':'123',
            'scm_name':'indexOB'
        }
        window.sessionStorage.setItem('scm_data',JSON.stringify(scm_data))
    },
    mounted(){
            var temp = 1;
            var temp1 = 'tempq';
            var temp2 = {obj:1};
        console.log({temp,temp1,temp2})
        
        //console.log(window.location.href)
        //this.newBuild()
        //this.contains();
    },
    methods:{
        ...mapMutations(['HEADERTITLE']),
        action(){
            var params = {
                "actionName":"tab",
                "actionValue":"https://m.jiehun.com.cn",
                "actionType":'view'
            }
            window.$action.h_actionDatas(params,function(){
                console.log(res)
            });
        },
        contains(){
            //1-load:3.56s;
            // for(let i=0;i<1000;i++){
            //     document.getElementById('container').innerHTML += '<span>我是一个小测试</span>'
            // }

            //2-load:3.56s;
            // let container = document.getElementById('container')
            // for(let i=0;i<1000;i++){
            //     container.innerHTML += '<span>我是一个小测试</span>'
            // }

            //3-load:1.55s;
            let container = document.getElementById('container')
            let content=''
            for(let i=0;i<1000;i++){
                content += '<span>我是一个小测试</span>'
            }
            container.innerHTML = content;
            
            //4-load:1.9s;
            // let container = document.getElementById('container')
            // // 创建一个DOM Fragment对象作为容器
            // let content = document.createDocumentFragment()
            // for(let count=0;count<10000;count++){
            // // span此时可以通过DOM API去创建
            // let oSpan = document.createElement("span")
            // oSpan.innerHTML = '我是一个小测试'
            // // 像操作真实DOM一样操作DOM Fragment对象
            // content.appendChild(oSpan)
            // }
            // // 内容处理好了,最后再触发真实DOM的更改
            // container.appendChild(content)

        },

        newBuild(){
            //1打开/创建一个 IndexDB 数据库（当该数据库不存在时，open 方法会直接创建一个名为 xiaoceDB 新数据库）。
            let db;
            const request = window.indexedDB.open("ceshDB", 1)
            
            request.onerror = function(event) {
                console.log('无法使用IndexDB')
            }
            request.onsuccess = function(event){
                db = event.target.result;
                console.log(db)
                console.log("你打开了IndexDB")
                //2 创建一个 object store（object store 对标到数据库中的“表”单位）。
                request.onupgradeneeded = function(event){
                    let objectStore
                    // 如果同名表未被创建过，则新建test表

                    if(!db.objectStoreNames.contains('test')){
                        objectStore = db.createObjectStore('test',{ keyPath : 'id' })
                    }
                }
                //3 构建一个事务来执行一些数据库操作，像增加或提取数据等。
                let transaction = db.transaction(["test"],"readwrite")
                console.log(transaction)
                // const objectStore = transaction.objectStore("test")
                // objectStore.add({id: 1, name: 'xiuyan'})
            }
        }
    }
}
</script>


<style scoped>
button{
    width: 100px;
    height: 30px;
    border: 1px solid #ccc;
}
</style>