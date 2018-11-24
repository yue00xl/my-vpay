

<template>
    <div>
        <sort-table 
        v-model="tableData" 
        sortIndex="index"
        :option="option" 
        @sort="sortdatas"
        @handleSizeChange="handleSizeChange"
        @handleCurrentChange="handleCurrentChange">
            <template>
                <el-table-column
                        prop="index"
                        label="ID">
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="姓名">
                </el-table-column>
                <el-table-column
                        prop="address"
                        label="地址">
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button type="text" size="small">查看</el-button>
                        <el-button type="text" size="small">编辑</el-button>
                    </template>
                </el-table-column>
            </template>
        </sort-table>

        <el-tree :data="trees"  style="margin-top: 20px;">
            <span class="custom-tree-node" slot-scope="{ node, data }">
                <p v-if="!data.leaf" style="font-size: 14px;"> {{data.name}}</p>
                <el-checkbox v-if="data.leaf" @change="changesCheck(data.name)">{{data.name}}</el-checkbox>
            </span>
        </el-tree>
    </div>
</template>


<script>
import sortTable from '../../lib/sortable'
import {mapMutations} from 'vuex'
export default{
    components:{
        sortTable
    },
    data(){
        return{
            trees: [{
                name: '一级目录1',
                leaf:false,
                children: [{
                    name: '二级分类名称',
                    leaf:true
                },{
                    name: '二级分类名称',
                    leaf:true
                },{
                    name: '二级分类名称',
                    leaf:true
                }]
            }, {
                name: '一级目录2',
                leaf:false,
                children: [{
                    name: '二级目录1',
                    leaf:true
                }, {
                    name: '二级目录2',
                    leaf:true
                }]
            }],
            tableData:[
            {
                index:'1',
                name:'测试',
                address:'北京'
            },
            {
                index:'2',
                name:'测试',
                address:'北京s'
            },
            {
                index:'3',
                name:'测试',
                address:'张家口'
            }],
            option:{
                currentPage:1, //分页 - 当前页数
                pageSize:10,  //分页 - 每页多少个
                total:100 //分页 - 总数
            }
        }
    },
    created(){
        this.HEADERTITLE('table拖拽排序');
    },
    methods:{
        ...mapMutations(['HEADERTITLE']),
        sortdatas(data){
            console.log(data)
        },
        handleSizeChange(val){
            console.log(val)
        },
        handleCurrentChange(val){
            console.log(val);
        },
        changesCheck(){}
    }
}
</script>