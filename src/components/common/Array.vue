

<template>
    <div>
        <p>1- 将数组中具有相同值的对象 组成一个新的数组</p>
        <ul>
            <li v-for="item in sortArray">{{item}}</li>
        </ul>
        <p>2 -将多个对象合并成一个对象</p>
        <div>{{o1}}</div>
        <p>3 - </p>
    </div>
</template>

<script>
export default{
    data(){
        return{
            sortArray:[
                {name:1,type:1},
                {name:1,type:2},
                {name:2,type:3},
                {name:2,type:4},
            ],
            o1:{type:1,name:'Objects'},
        }
    },
    mounted(){
        this.sortArray = this.sortArr(this.sortArray,'name')
        
        // this.o1 = Object.assign(this.o1,{a:1,b:2})  //不会触发更新
        this.o1 = Object.assign({},this.o1,{a:1,b:2}) // 会触发更新  
    },
    methods:{
        sortArr(arr,str){
            //将数组中具有相同值的对象 组成一个新的数组
            var _arr = [],
                _t = [],
                // 临时的变量
                _tmp;
            // 按照特定的参数将数组排序将具有相同值得排在一起
            arr.sort(function(a, b) {
                var s = a[str],
                    t = b[str];
                return s < t ? -1 : 1;
            });

            if ( arr.length ){
              _tmp = arr[0][str];
            }
            // 将相同类别的对象添加到统一个数组
            for (var i in arr) {
                if ( arr[i][str] === _tmp ){
                    _t.push( arr[i] );
                } else {
                    _tmp = arr[i][str];
                    _arr.push( _t );
                    _t = [arr[i]];
                }
            }
            // 将最后的内容推出新数组
            _arr.push( _t );
            return _arr;
        }
    }
}
</script>

<style scoped>
p{
    border-bottom: 1px solid #ccc;
    margin: 15px 0;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>


