

<template>
    <div>
        <el-table
            :data="value"
            border
            :row-key="sortIndex"
            style="width: 100%"
            align='center'
            :row-style="{height:'60px'}">
            <slot></slot>
        </el-table>
        <div class="sort-el-pagination" v-if="option">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[10, 20, 50]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
            </el-pagination>
        </div>
        <div class="srot-btn" v-if="sortIndex">
            <p class="srot-text">拖拽排序</p>
            <div>
                <el-button type="primary" @click="success">保存排序分组</el-button>
            </div>
        </div>
    </div>
</template>

<script>
import Sortable from 'sortablejs' 
export default{
    name:'sort-table',
    props:{
        value:{
            type:Array,
            default:function(){
                return []
            }
        },
        sortIndex:{
            type:String,  //是否可以拖动排序,如果传key值则可以拖动，否则不可以
        },
        option:{
            type:Object   //分页数据
        }
    },
    data(){
        return{
            currentPage:this.option ? this.option.currentPage : '',
            pageSize:this.option ? this.option.pageSize : '',
            total:this.option ? this.option.total : ''
        }
    },
    mounted(){
        if(this.sortIndex){
            this.rowDrop();
        }
    },
    methods:{
        rowDrop() {
            const tbody = document.querySelector('.el-table__body-wrapper tbody')
            const _this = this
            Sortable.create(tbody, {
                onEnd({ newIndex, oldIndex }) {
                    const currRow = _this.value.splice(oldIndex, 1)[0]
                    _this.value.splice(newIndex, 0, currRow)
                }
            })
        },
        success(){
            //拍好的顺序
            let sortArr = [];
            this.value.forEach((item)=>{
                sortArr.push(item.index);
            })
            this.$emit('sort',sortArr)
        },
        handleSizeChange(val){
            this.$emit('handleSizeChange',val)
        },
        handleCurrentChange(val){
            this.$emit('handleCurrentChange',val)
        }
    }
}
</script>


<style>
.el-table__body-wrapper{
    cursor: pointer;
}
.srot-btn{
    margin-left: 20px;
}
p.srot-text{
    height: 40px;
    line-height: 40px;
}
.sort-el-pagination{
    width: 100%;
    margin: 20px 0 10px 0;
    text-align: center;
}
</style>