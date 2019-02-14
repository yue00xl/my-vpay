
<!--Promiss-->

<template>
    <div>
        <div class="test_box"></div>
        <div>
            <input type="text" id="input" placeholder="自己实现数据的双向绑定"/>

            <div id="input_data"></div>
        </div>
    </div>
</template>

<script>
export default{
    data(){
        return{
            arr:[1,2,3,4,5,10,2]
        }
    },
    mounted(){
        //console.log(this.isReact(this.arr));
        this.test1()
    },
    methods:{
        test1(){
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
                    //Input.value = value;
                    this.value = value;
                }
            })

            Input.addEventListener('input',function(e){
                data.text = e.target.value;
                console.log(data)
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

