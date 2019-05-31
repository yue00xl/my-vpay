
<!--Promiss-->

<template>
    <div>
        <div class="test_box"></div>
        <div>
            <input type="text" id="input" placeholder="自己实现数据的双向绑定"/>

            <div id="input_data">双向绑定的数据：{{ceshi_data}}</div>
        </div>

        <button @click="action">事件上报</button>
    </div>
</template>

<script>
var PENDING = 0; // 进行中
var FULFILLED = 1; // 成功
var REJECTED = 2; // 失败
export default{
    data(){
        return{
            arr:[1,2,3,4,5,10,2],
            ceshi_data:''
        }
    },
    created() {
        var scm_data = {
            'scm':'456'
        }
        window.sessionStorage.setItem('scm_data',JSON.stringify(scm_data))
    },
    mounted(){
        //console.log(this.isReact(this.arr));
        //this.test1()
        this.Promise_es(0,'callback').then((res)=>{
            console.log(res)
        })
        this.Promise_res();
    },
    methods:{
        action(){
            console.log(11)
            var params = {
                "actionName":"tab-333",
                "actionValue":"https://m.jiehun.com.cn"
            }
            window.$action.h_actionDatas(params);
        },
        Promise_res(fn){
            var state = PENDING;
            var value = null;
            var handlers = [];

            //success
            function fulfill(result){
                state = FULFILLED;
                value = result;
                handlers.forEach(handle)
                handlers = null;
            }

            function reject(error){
                state = REJECTED;
                value = error;
                handlers.forEach(handle)
                handlers = null;
            }
            

        
        },

        Promise_es(status,text){
            return new Promise((resolve,reject)=>{
                if(status === 0){
                    text = 'new_callback'
                    resolve(text)
                }else{
                    reject('err')
                }
            })
        },
        test1(){
            var that = this;
            //自己实现数据双向绑定
            // const Input = document.getElementById('input')
            // const Input_data = document.getElementById('input_data')

            // Input.addEventListener('input',function(event){
            //     console.log(event.target.value)
            //     Input_data.innerHTML = event.target.value;
            // },false)

            const data = {};
            const Input = document.getElementById('input')
            Object.defineProperty(data,'text',{
                set(value){
                    Input.value = value;
                    this.value = value;
                }
            })

            Input.addEventListener('input',function(e){
                data.text = e.target.value;
                that.ceshi_data = e.target.value;
            
            },false)

        },
        isReact(arr){
            var hash = {};
            for(var i in arr) {
                if(hash[arr[i]])
                    return true;
                hash[arr[i]] = true;
            }
            return false;
        }
    }
}
</script>

<style>
.test_box{
    width: 100px;
    height: 100px;
    border: 1px solid #ccc;
    text-align: center;
    line-height: 100px;
}
input{
    width: 200px;
    height: 30px;
    border: 1px solid #000;
}
</style>

