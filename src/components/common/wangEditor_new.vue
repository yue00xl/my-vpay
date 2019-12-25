<template>
    <div>
        <select ref="fontSize" v-model="fontSize" class="select">
            <option v-for="(item, index) in fontSizeList" :key="index" :value="item.value" class="option">{{ item.name }}</option>
        </select>

        <div id="div1" class="toolbar">
            <colorPicker ref="colorPicker" id="colorPicker" v-model="color"  v-on:change="headleChangeColor"/>
        </div>
        <div style="padding: 10px 0; color: #ccc">中间隔离带</div>
        <div id="div2" class="text">
            <p>请输入内容</p>
        </div>
    
    </div>
</template>

<script>
import Vue from 'vue';
import vcolorpicker from 'vcolorpicker'
import E from 'wangeditor'

Vue.use(vcolorpicker)
export default {
    data(){
       return {
            color:'',
            editor: null,
            // 当前字号
            fontSize: '16px',
            // 字号列表
            fontSizeList: [
                {name: '12px', value: '12px'},
                {name: '14px', value: '14px'},
                {name: '15px', value: '15px'},
                {name: '16px', value: '16px'},
                {name: '18px', value: '18px'},
                {name: '20px', value: '20px'},
                {name: '24px', value: '24px'},
                {name: '50px', value: '50px'}
            ]
       }
    },
    watch: {
        // 监听 fontSize 是否改变
        fontSize() {
            // 获取选区数据，修改字号
            let container = this.editor.selection.getSelectionContainerElem()[0]
            if (container.style.fontSize !== this.fontSize) {
                container.style.fontSize = this.fontSize
            }
        }
    },
    methods:{
        headleChangeColor(val){
            console.log('color',val)
        }
    },
    mounted(){
        this.editor = new E('#div1', '#div2')
        E.viewsource = {
            init: function(editorSelector) {
                $('.toolbar').append('<div class="w-e-menu"><a id="_wangEditor_btn_viewsource" class="_wangEditor_btn_viewsource" href="javascript:;">颜色</a></div>');
                this.targetClick();
            },
            toggleViewsource: function(editorSelector) {
                console.log(33333)
            },
            targetClick:function(){
                var _this = this;
                document.getElementById("_wangEditor_btn_viewsource").addEventListener('click',function(){
                    _this.toggleViewsource();
                })
            }
        }

        // 当编辑器内容变化的时候通知父组件
        this.editor.customConfig.onchange = (html) => {
            // 设置当前选区内容字号跟选择的一致
            let container = this.editor.selection.getSelectionContainerElem()[0]
            if (container.style.fontSize === '') {
                container.style.fontSize = this.fontSize
            } else {
                this.fontSize = container.style.fontSize
            }
            this.editorContent = html
        }
        // 当获取焦点时再检查一次选区内容和字号
        this.editor.customConfig.onfocus = () => {
            let container = this.editor.selection.getSelectionContainerElem()[0]
            if (container.style.fontSize === '') {
                container.style.fontSize = this.fontSize
            } else {
                this.fontSize = container.style.fontSize
            }
        }
        // 自定义菜单配置
        this.editor.customConfig.menus = [
            'head',  // 标题
            'bold',  // 粗体
            'italic',  // 斜体
            'underline',  // 下划线
            'strikeThrough',  // 删除线
            'foreColor',  // 文字颜色
            'backColor',  // 背景颜色
            'link',  // 插入链接
            'list',  // 列表
            'justify',  // 对齐方式
            'quote',  // 引用
            'image',  // 插入图片
            'video',  // 插入视频
            'undo',  // 撤销
            'redo'  // 重复
        ]
        this.editor.create()
        E.viewsource.init('#div1');
    }
}
</script>

<style scoped>
select{
  width: 100px;
  height: 30px;
  border-radius: 5px;
  margin-bottom: 5px;
  text-align: center;
}
.text{
    height:300px;
    border: 1px solid #ccc;
}


</style>