
//pay.vue写我们的组件
import vpay from './pay.vue'

//定义我们的插件
const myPlugin = {
    install(Vue,options){
        Vue.component('vpay',vpay)
    }
}


export default myPlugin;