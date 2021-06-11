
<template>
    <div>
        <el-row>
            <el-button @click="exportWord" type="primary">导出work</el-button>
        </el-row>

        <div v-for="(item,index) in submitData" :key="index">
            <p>{{item.title}}</p>
            <el-table
                :data="item.data"
                style="width: 100%">
                <el-table-column
                    prop="name"
                    label="姓名"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="value"
                    label="地址">
                </el-table-column>
            </el-table>
        </div>

       
    </div>
</template>

<script>
import docxtemplater from 'docxtemplater'
import PizZip from 'pizzip'
import JSZipUtils from 'jszip-utils'
import {saveAs} from 'file-saver'
import { setTimeout } from 'timers';

export default{
    data(){
        return{
            tableData:[
                {name:'姓名',address:'地址'},
                {name:'姓名',address:'地址'}
            ],
            submitData:[
                {
                    title:'11111',
                    data:[
                        {name:'姓名',value:'地址'},
                        {name:'姓名',value:'地址'}
                    ]
                },
                {
                    title:'22222',
                    data:[
                        {name:'姓名2',value:'地址2'},
                        {name:'姓名2',value:'地址2'}
                    ]
                }
            ],
            name:'你好'
        }
    },
    mounted(){
        console.log(this.submitData)
    },
    methods:{
        exportWord() {
            let that = this;
            console.log('JSZipUtils',JSZipUtils)
            JSZipUtils.getBinaryContent('/static/word.docx',function(error, content){
                if (error) {
                    console.log('111111')
                    throw error;
                }
                console.log(error,content)
                
                // 创建一个PizZip实例，内容为模板的内容
                
                let zip = new PizZip(content);
                
                // 创建并加载docxtemplater实例对象
                let doc = new docxtemplater().loadZip(zip);
                // 设置模板变量的值

                doc.setData({
                    table: that.submitData
                });

                try{
                    // 用模板变量的值替换所有模板变量
                    doc.render();
                }catch(error){
                    // 抛出异常
                    let e = {
                        message: error.message,
                        name: error.name,
                        stack: error.stack,
                        properties: error.properties
                    };
                    console.log(JSON.stringify({ error: e }));
                    throw error;
                }

                // 生成一个代表docxtemplater对象的zip文件（不是一个真实的文件，而是在内存中的表示）
                let out = doc.getZip().generate({
                    type: "blob",
                    mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                });
                // 将目标文件对象保存为目标类型的文件，并命名
                saveAs(out, "word导出.docx");
            })
        }
    }
}
</script>