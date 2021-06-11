
<template>
    <el-table-column :label="coloumnHeader.label" :prop="coloumnHeader.prop" :label-class-name="coloumnHeader.color" align="center">
        <template v-for="item in coloumnHeader.children" >
            <tableColumn v-if="item.children && item.children.length" :key="item.id" :coloumnHeader="item"></tableColumn>
            <el-table-column 
                v-else 
                :key="item.label" 
                :label="item.label" 
                :prop="item.prop" 
                :label-class-name="item.color" 
                align="center">
                <template slot-scope="scope">
                    <span :style="{'color':scope.row.isShow == 1 ? 'red' : ''}">{{scope.row[item.prop]}}</span>
                </template>
            </el-table-column>
        </template>
    </el-table-column>
</template>

<script>
export default {
    name:'tableColumn',
    props:{
        coloumnHeader:{
            type:Object,
            required:true
        }
    },
    mounted(){
        // console.log(this.coloumnHeader)
    },
    methods:{
        RowStyle({row, rowIndex}){
            console.log(row)
        }
    }
}
</script>

