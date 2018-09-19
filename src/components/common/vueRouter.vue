
<template>
    <div id="scroll" :style="{height:clientH+'px'}">
        vueRouter
        <router-link to="/vueRouter/one">第一个页面</router-link>
        <router-link to="/vueRouter/two">第二个页面</router-link>

        <keep-alive>
            <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>
        <div style="width:100%;border:1px solid red;">
            <ul>
                <li v-for="item in 1000">
                    {{item}}
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default{
    data(){
        return{
            routers:'测试this是否能获取',
            leaves:true,
            clientH:''
        }
    },
    beforeRouteEnter (to, from, next) {
        //进入路由前
        // 在路由独享守卫后调用 不！能！获取组件实例 `this`，组件实例还没被创建
        next();
    },
    beforeRouteUpdate(to,from,next){
        // 可以获取this
        // console.log(this.routers);
        next();
    },
    beforeRouteLeave(to,from,next){
        // 可以获取this
        // 导航离开改组件的对应路由是调用，我们用他来禁止用户厉害，比如还未保存草稿，或者在用户离开前，将setInterval销毁，防止离开之后，定时器还在调用
        // console.log(this.routers)
        if(this.leaves){
            next();
        }else{
            next(false) //取消离开
        }
    },
    mounted(){
        this.clientH = window.innerHeight
    }
}
</script>

<style>
#scroll{
    -webkit-overflow-scrolling:touch;
    overflow: auto;
}
</style>


