

<template>
    <div>
        {{o1}}
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
        // console.log(this.sortArr(this.sortArray,'name'))
        // this.o1 = Object.assign(this.o1,{a:1,b:2})  //不会触发更新
        // this.o1 = Object.assign({},this.o1,{a:1,b:2}) // 会触发更新  
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

