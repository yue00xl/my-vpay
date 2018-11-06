
<template>
    <div>
        <!-- <slot>
            <p>我是子组件</p>
        </slot>    -->

        <!-- <header>
            <slot name="header">
                <h1>默认header</h1>
            </slot>
        </header>
        <main>
            <slot>
                <p>默认main</p>
            </slot>
        </main>
        <footer>
            <slot name="footer">
                <p>默认footer</p>
            </slot>
        </footer> -->

        <div>
            <ul>
                <li class="list" v-for="item in arrlist" @click="getInfo(item)">
                    <div>
                        <img :src="item.imgurl" alt="">
                        <p>
                            <h6>{{item.name}}</h6>
                            <slot :element="item">
                                <p>{{item.id}}</p>
                            </slot>
                        </p>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default{
    props:{
        arrlist:{
            type:Array,
            default:function(){
                return []
            }
        }
    },
    data(){
        return{
            
        }
    },
    methods:{
        getInfo(item){
            console.log(item);
        }
    }
}
</script>

<style scoped>
.list{
    width: 100%;
    /* height: 40px;
    line-height: 40px; */
    border:1px solid #ccc;
}
</style>

