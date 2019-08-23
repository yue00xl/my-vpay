
<template>
    <div>
        <div class="box">
            <div :ref="'editor'+keys" :id="'editor'+keys" :class="'editor'+keys">{{keys}}</div>
        </div>
    </div>
</template>

<script>
import E from 'wangeditor'
import { setTimeout } from 'timers';
export default{
    props:['value','keys'],
    data(){
        return{
            editor:null,
            content:''
        }
    },
    watch:{
        keys(val){
            //console.log(val)
            if(this.editor){
                this.editor.txt.clear();
                this.editor.txt.html(this.value)
            }
        }
    },
    mounted(){
        this.init();
    },
    methods:{
        init(){
            var _this = this;
            this.$nextTick(()=>{
                this.editor = new E(`#editor${this.keys}`)
                this.editor.customConfig.zIndex = 100;
                this.editor.customConfig.onchange = (html) => {
                    console.log(html)
                    this.$emit('input', html) // 将内容同步到父组件中
                }
                this.editor.customConfig.pasteFilterStyle = true;
                this.editor.customConfig.pasteTextHandle = function (content) {
                    // content 即粘贴过来的内容（html 或 纯文本），可进行自定义处理然后返回
                    var result = /<body[^>]*>([\s\S]*)<\/body>/.exec(content);
                    if(result && result.length === 2){
                        content = result[1];
                    }
                    content = content.replace(/<[^<>]+>/g,"");
                    content = content.replace(/(\r\n)+|(\n)+/g,'<br/>');
                    return content;
                };
                this.editor.customConfig.linkCheck = function (text, link) {
                    var href = /^http/g.test(link);
                    if(href){
                        return true;
                    }else{
                        return '请插入完整的链接（以‘http’或‘https’开头）'
                    }
                };
                this.editor.create()
                this.editor.txt.html(this.value)
            })
        }
    }
}
</script>

<style>
    /* .box{
        height: 100px;
    } */
</style>