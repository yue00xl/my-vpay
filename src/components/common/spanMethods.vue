
<template>
    <div>
        <el-table
            :data="tableData"
            border
            style="width: 100%; margin-top:20px;"
            :header-cell-style="headerCellClassName"
            :cell-style="cellStyle">
            <template v-for="item in tableHeader">
                <table-column v-if="item.children && item.children.length" :key="item.id" :coloumnHeader="item"></table-column>
                <el-table-column v-else 
                :key="item.id" 
                :label="item.label" 
                :prop="item.prop" 
                :label-class-name="item.color" 
                align="center">
                </el-table-column>
            </template>
        </el-table>
    </div>
</template>


<script>
import TableColumn from '../public/TableColumn'
export default {
    components:{
        TableColumn
    },
    data(){
        return{
            tableData: [
                {
                    zhouri: '新会员',
                    youxiao: '2',
                    zhuangji: '3',
                    zhuangjilv: '4',
                    zhuangji1: '5',
                    zhuangji2: '6',
                    zhuangji3: '7',
                    login: '8',
                    loginlv:'9',
                    loginlv1:'10',
                    loginlv2:'11',
                    isShow:0
                },
                {
                    zhouri: '新会员 汇总',
                    youxiao: '2',
                    zhuangji: '3',
                    zhuangjilv: '4',
                    zhuangji1: '5',
                    zhuangji2: '6',
                    zhuangji3: '7',
                    login: '8',
                    loginlv:'9',
                    loginlv1:'10',
                    loginlv2:'11',
                    isShow:1
                },
                {
                    zhouri: 'vip',
                    youxiao: '2',
                    zhuangji: '3',
                    zhuangjilv: '4',
                    zhuangji1: '5',
                    zhuangji2: '6',
                    zhuangji3: '7',
                    login: '8',
                    loginlv:'9',
                    loginlv1:'10',
                    loginlv2:'11'
                },
                {
                    zhouri: '合计',
                    youxiao: '2',
                    zhuangji: '3',
                    zhuangjilv: '4',
                    zhuangji1: '5',
                    zhuangji2: '6',
                    zhuangji3: '7',
                    login: '8',
                    loginlv:'9',
                    loginlv1:'10',
                    loginlv2:'11'
                }
            ],
            tableHeader:[
                {
                    id:100,
                    label:'21春 - 上海[APP装机]',
                    prop:'',
                    color:'FFFC40',
                    children:[
                        {
                            id: 110,
                            label: '4月9日',
                            prop: '',
                            color:'FFBC40',
                            children:[
                                {
                                    id: 111,
                                    label: '周日',
                                    // color:'FFBC40',
                                    prop: 'zhouri',
                                    children:[]
                                }
                            ]
                        },
                        {
                            id: 120,
                            label: 'APP装机',
                            prop: '',
                            color:'',
                            children:[
                                {
                                    id: 121,
                                    label: '有效',
                                    prop: 'youxiao',
                                },
                                {
                                    id: 122,
                                    label: '装机',
                                    prop: 'zhuangji',
                                },
                                {
                                    id: 123,
                                    label: '装机率',
                                    prop: 'zhuangjilv',
                                }
                            ]
                        },
                        {
                            id: 130,
                            label: 'APP装机率',
                            prop: '',
                            children:[
                                {
                                    id: 131,
                                    label: '21春-20冬',
                                    prop: 'zhuangji1',
                                },
                                {
                                    id: 132,
                                    label: '21春-20秋',
                                    prop: 'zhuangji2',
                                },
                                {
                                    id: 133,
                                    label: '21春-19春',
                                    prop: 'zhuangji3',
                                }
                            ]
                        },
                        {
                            id: 140,
                            label: '登录',
                            prop: '',
                            children:[
                                {
                                    id: 141,
                                    label: '登录',
                                    prop: 'login',
                                },
                                {
                                    id: 142,
                                    label: '登录率',
                                    prop: 'loginlv',
                                }
                            ]
                        },
                        {
                            id: 150,
                            label: '登录率差值',
                            prop: '',
                            children:[
                                {
                                    id: 151,
                                    label: '21春-20冬',
                                    prop: 'loginlv1',
                                },
                                {
                                    id: 152,
                                    label: '21春-20秋',
                                    prop: 'loginlv2',
                                }
                            ]
                        }
                    ]
                },
                {
                    id:200,
                    label:'同期情况',
                    prop:'',
                    color:'E88E89',
                    children:[
                        {
                            id: 210,
                            label: '20冬-同期',
                            prop: '',
                            color:'FFBC40',
                            children:[
                                {
                                    id: 211,
                                    label: '有效',
                                    prop: '',
                                },
                                {
                                    id: 212,
                                    label: '装机',
                                    prop: '',
                                },
                                {
                                    id: 213,
                                    label: '装机率',
                                    prop: '',
                                },
                                {
                                    id: 214,
                                    label: '登录',
                                    prop: '',
                                },
                                {
                                    id: 215,
                                    label: '登录率',
                                    prop: '',
                                }
                            ]
                        },
                        {
                            id: 220,
                            label: '20秋-同期',
                            prop: '',
                            color:'40FFFF',
                            children:[
                                {
                                    id: 221,
                                    label: '有效',
                                    prop: '',
                                    color:'40FFFF',
                                },
                                {
                                    id: 222,
                                    label: '装机',
                                    prop: '',
                                    color:'40FFFF',
                                },
                                {
                                    id: 223,
                                    label: '装机率',
                                    prop: '',
                                    color:'40FFFF',
                                },
                                {
                                    id: 224,
                                    label: '登录',
                                    prop: '',
                                    color:'40FFFF',
                                },
                                {
                                    id: 225,
                                    label: '登录率',
                                    prop: '',
                                    color:'40FFFF',
                                }
                            ]
                        },
                    ]
                },
                {
                    id:300,
                    label:'最终-展前周五',
                    prop:'',
                    color:'40C6FF',
                    children:[
                        {
                            id: 310,
                            label: '20冬-同期',
                            prop: '',
                            children:[
                                {
                                    id: 311,
                                    label: '有效',
                                    prop: '',
                                },
                                {
                                    id: 312,
                                    label: '装机',
                                    prop: '',
                                },
                                {
                                    id: 313,
                                    label: '装机率',
                                    prop: '',
                                },
                                {
                                    id: 314,
                                    label: '登录',
                                    prop: '',
                                },
                                {
                                    id: 315,
                                    label: '登录率',
                                    prop: '',
                                }
                            ]
                        },
                        {
                            id: 320,
                            label: '20秋同期',
                            prop: '',
                            children:[
                                {
                                    id: 321,
                                    label: '有效',
                                    prop: '',
                                },
                                {
                                    id: 322,
                                    label: '装机',
                                    prop: '',
                                },
                                {
                                    id: 323,
                                    label: '装机率',
                                    prop: '',
                                },
                                {
                                    id: 224,
                                    label: '登录',
                                    prop: '',
                                },
                                {
                                    id: 325,
                                    label: '登录率',
                                    prop: '',
                                }
                            ]
                        },
                    ]
                }
            ],
        }
    },
    mounted(){
        // console.log(this.tableHeader)
    },
    methods:{
        headerCellClassName({row, column, rowIndex, columnIndex}){
            return {
                background:column.labelClassName ? `#${column.labelClassName}` : '#fff'
            }
        },
        cellStyle({row, column, rowIndex, columnIndex}){
            console.log(column)
            return {
                background:column.labelClassName ? `#${column.labelClassName}` : '#fff'
            }
        }
    }
}
</script>


<style>
.el-table thead{
    color: #000;
    
}
.el-table--border:after,.el-table--group:after,.el-table:before {
    background-color: #000;
}
.el-table--border,.el-table--group {
    border-color: #000;
}
.el-table td,.el-table th.is-leaf {
    border-bottom: 1px solid #000;
}
.el-table--border th,.el-table--border th.gutter:last-of-type {
    border-bottom: 1px solid #000;
}
.el-table--border td,.el-table--border th {
    border-right: 1px solid #000;
}
</style>

