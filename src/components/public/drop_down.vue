
<!--下拉加载更多组件-->
<template>
    <div id="scrolls">
        <div class="my-scroll" ref="myScroll" :class="[scrollState?'prohibit':'allow']"
        @scroll.passive="onScroll($event)"  @touchmove="onScroll($event)">
            <!-- top -->
            <div class="scroll-list">
                <slot name='scrollList'></slot>
                <div class="scroll-bottom">
                    <div v-if="state==1">努力加载中</div>
                    <div v-if="state==2">走到世界尽头...</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default{
    name:'dropDown',
    props:{
        'scrollState': {
            type:Boolean,
            default(){
                return true
            }
        }
    },
    data(){
        return{
            timeoutId:null,
            myScroll:null,
            state:2,
            pageIndex:0
        }
    },
    mounted(){
        // this.myScroll = this.$refs.myScroll // 获取滑条dom
    },
    methods:{
        setState(index){
            this.state = index
        },
        onScroll(){
            const _this = this
            const scrollTop = _this.$refs.myScroll.scrollTop;
            if (window.innerHeight + scrollTop >= _this.$refs.myScroll.children[0].offsetHeight) {
                clearTimeout(this.timeoutId)
                _this.timeoutId = setTimeout(() => {
                    _this.bottomCallback()
                }, 1000)
            }
        },
        bottomCallback(){
            this.pageIndex = this.pageIndex + 1;
            this.$emit('onpull',this.pageIndex);
        }
    }
}
</script>

<style>
#scrolls{
    height: 100%;
    /* overflow: hidden; */
}
.allow{ 
    overflow:hidden;
    height: auto;
}
.prohibit{
    max-width: 100%;
    max-height: 100%;
    height: 100%;
    overflow:hidden;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    will-change: transform;
    transition: all 450ms;
    backface-visibility: hidden;
    perspective: 1000;
    box-sizing: border-box;
}
.my-scroll{
    position: relative;
	color: #999;
}
.my-scroll .scroll-top{
    text-align: center;
    display:flex;
    position:absolute;
    top:0;
    left:0;
    width:100%;
    overflow: hidden;
}
.my-scroll .scroll-list{
    overflow:hidden;
    min-height: 100%;
}
.my-scroll .scroll-bottom{
    text-align: center;
    padding-bottom: 10px;
}
</style>

