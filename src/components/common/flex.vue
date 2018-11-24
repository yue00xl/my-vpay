
<template>
    <div>
        <!-- <div class="state one">
            <span class="box"></span>
            <span class="box"></span>
            <span class="box"></span>
            <span class="box"></span>
            <span class="box"></span>
            <span class="box"></span>
        </div> -->
        <vpay 
            ref="pays"
            v-model="show"         
            @close="close"
            @forget="forget"
            @input-end="inputEnd">
        </vpay>
    </div>
</template>

<script>
export default{
    data(){
        return{
            show: true,
            arr:[
                {type:'商品',typeLint:'1',name:'商品1'},
                {type:'商品',typeLint:'2',name:'商品2'},
                {type:'商品',typeLint:'3',name:'商品3'},
                {type:'商品',typeLint:'1',name:'商品4'},
                {type:'商品',typeLint:'2',name:'商品5'},
                {type:'商品',typeLint:'3',name:'商品6'},
                {type:'商品',typeLint:'1',name:'商品7'}
            ]
        }
    },
    mounted(){
        console.log(this.sortArr(this.arr,'typeLint'));
    },
    methods:{
        onShowPay () {
            this.show = true;
        },
        // 密码输入完成回调
        inputEnd (val) {
            setTimeout(() => {
                // 模拟支付成功的结果
                if (val == 111111) {
                    // 调用插件的$success方法告知插件支付成功
                    // 并且在then方法里面可以写支付成功的回调，例如可以跳转支付结果页面
                    this.$refs.pays.$success().then(res => {
                        console.log('支付成功')
                        // this.$router.push('/success')
                    })
                // 模拟支付失败的结果    
                } else {
                    this.$refs.pays.$fail()
                }
            }, 1000)
        },
        // 取消支付弹窗关闭的回调
        close() {
            console.log('关闭')
        },
        // 忘记密码跳转
        forget () {
            console.log('触发forge事件');
        },
        sortArr(arr,str){
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
.state{
    width: 100%;
    border: 1px solid red;
    box-sizing: border-box;
}
.box{
    display: block;
    width: 100px;
    height: 100px;
    background: skyblue;
}
.one{
    height: 200px;
    display: flex;
    flex-direction: row; 
    /*设置主轴方向*/
    justify-content:space-around; 
    /* 
        justify-content : flex-start,center,flex-end,space-around,space-between
    */
    align-items: center;
    flex-wrap: wrap;
    /*是否换行   nowrap 不换行  wrap换行*/
}


</style>

