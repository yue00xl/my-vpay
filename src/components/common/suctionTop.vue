

<template>
    <div class="suctionTop">
        <div class="top"></div>
        <h2 id="fixedHeaderRoot" :class="{'isFixed':headerFixed}">测试标题</h2>
        <div class="bottom">
            <ul>
                <li v-for="item in 100">{{item}}</li>
            </ul>
        </div>
    </div>
</template>

<script>
export default{
    data(){
        return{
            offsetTop:'',
            offsetHeight:'',
            headerFixed:false
        }
    },
    mounted(){
        // handleScroll为页面滚动的监听回调
        window.addEventListener('scroll', this.handleScroll);
        this.init();
    },
    destroyed(){
        window.removeEventListener('scroll', this.handleScroll);
    },
    methods:{
        init(){
            this.$nextTick(function(){
                //这里fixedHeaderRoot是吸顶元素的ID
                let header = document.querySelector('#fixedHeaderRoot');
                this.offsetTop = header.offsetTop;
                this.offsetHeight = header.offsetHeight;
                console.log('offsetTop'+ this.offsetTop +'==='+'offsetHeight'+this.offsetHeight)
            })
        },
        handleScroll(){
            // 得到页面滚动的距离
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
            // 判断页面滚动的距离是否大于吸顶元素的位置
            this.headerFixed = scrollTop > (this.offsetTop - this.offsetHeight);
            console.log(this.headerFixed)
        }
    }
}
</script>

<style scoped>
.suctionTop{}
.top{
    width: 100%;
    height: 200px;
    border: 1px solid red;
    box-sizing: border-box
}
.bottom{
    width: 100%;
    border: 1px solid red;
    box-sizing: border-box
}
h2{
    width: 100%;
    height: 50px;
    line-height: 50px;
    background: #fff;
    border: 1px solid #000;
    box-sizing: border-box
}
.isFixed{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
}
</style>


