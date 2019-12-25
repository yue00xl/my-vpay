
<template>
    <div>
        <div class="flex">
            <div class="box">
                <div :ref="'editor'+keys" :id="'editor'+keys" :class="'editor'+keys">
                   
                </div>
            </div>
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
            content:'',
            status:true
        }
    },
    watch:{
        keys(val){
            // console.log(val)
            if(this.editor){
                this.editor.txt.clear();
                this.editor.txt.html(this.value)
            }
        }
    },
    mounted(){
        // console.log(this.value)
        this.init();
    },
    methods:{
        init(){
            var _this = this;
            this.$nextTick(()=>{
                //document.querySelector('.w-e-toolbar').appendChild('<div>ss</div>')
                this.editor = new E(`#editor${this.keys}`)
                
                this.editor.customConfig.menus = [
                    'head',  // 标题
                    'bold',  // 粗体
                    'fontSize',  // 字号
                    'fontName',  // 字体
                    'italic',  // 斜体
                    'underline',  // 下划线
                    'strikeThrough',  // 删除线
                    'foreColor',  // 文字颜色
                    'backColor',  // 背景颜色
                    'link',  // 插入链接
                    'justify',  // 对齐方式
                    'image',  // 插入图片
                ]

                this.editor.customConfig.colors = [
                    '#000000',
                    '#eeece0',
                    '#1c487f'
                ]

                this.editor.customConfig.zIndex = 100;
                this.editor.customConfig.pasteFilterStyle = true;
                
                this.editor.customConfig.onchange = (html) => {
                    console.log('111',html)
                    this.$emit('input', html) // 将内容同步到父组件中
                }
                
                //this.editor.customConfig.pasteFilterStyle = true;
                this.editor.customConfig.pasteTextHandle = function (content) {
                    // content 即粘贴过来的内容（html 或 纯文本），可进行自定义处理然后返回
                    var result = /<body[^>]*>([\s\S]*)<\/body>/.exec(content);
                    if(result && result.length === 2){
                        content = result[1];
                    }
                    content = content.replace(/<[^<>]+>/g,"");
                    content = content.replace(/(\r\n)+|(\n)+/g,'<br/>');

                    // //  清除注释块
                    // pasteHtml = pasteHtml.replace(/<!--[\w\W\r\n]*?-->/gmi, '');
                    // //  清除<w:xxx> 这样的标签
                    // pasteHtml = pasteHtml.replace(/<(w.*).+?>/igm, '');
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
                this.editor.txt.append(this.value)

                this.timer = null;
                document.getElementById(`editor${this.keys}`).addEventListener('mouseover',function(){
                    if(_this.status){
                        _this.editor.change && _this.editor.change()
                        _this.status = false;
                    }  
                })

                // this.editor.$textElem.attr('contenteditable', false)
                // setTimeout(() => {
                //     this.editor.$textElem.attr('contenteditable', true)
                // },10)
                
            })
        },
        changes(){
            this.editor && this.editor.change();
        }
    }
}
</script>

<style>
.w-e-toolbar{
    display: flex;
}
.flex{
    /* display: flex; */
}
.flex-left{
    margin-right:20px;
}
.copys1-style{
    width:100px;
    height: 100px;
    border: 1px solid red;
    border-radius:10px;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>