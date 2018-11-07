<template>
    <div>
        <h1>判断逻辑复杂的情况</h1>
        <div class="title">
            1 - 一元条件判断
        </div>
        <div>
            <h1>1-1 - if-else</h1>
            <p>初始值 - {{status}}</p>
            <p>最终状态 - {{if_else_text}}</p>
        </div>

        <div>
            <h1>1-2 - switch</h1>
            <p>初始值 - {{status}}</p>
            <p>最终状态 - {{switch_text}}</p>
        </div>

        <div>
            <h1>1-3 - Object</h1>
            <p>初始值 - {{status}}</p>
            <p>最终状态 - {{object_text}}</p>
        </div>

         <div>
            <h1>1-4 - Map</h1>
            <p>初始值 - {{status}}</p>
            <p>最终状态 - {{map_text}}</p>
        </div>
        <div class="title">
            2 - 多元条件判断
        </div>
        <div>
            <h1>2-1 - Map多元条件判断</h1>
            <p>初始值 - {{identity}} - {{status}}</p>
            <p>最终状态 - {{map_text_2_1}}</p>
        </div>
        <div>
            <h1>2-2 - Map多元条件判断逻辑处理相同-</h1>
            <p>初始值 - {{identity}} - {{status}}</p>
            <p>最终状态 - {{map_text_2_2}}</p>
        </div>
    </div>
</template>

<script>
import {mapMutations} from 'vuex'
/**
* @param {string} status 活动状态：1 开团进行中 2 开团失败 3 商品售罄 4 开团成功
* @param {string} identity 身份标识 guest客态  master主态
*/
export default{
    data(){
        return{
           status:2,
           identity:'guest',
           if_else_text:'',
           switch_text:'',
           object_text:'',
           map_text:'',
           map_text_2_1:'',
           map_text_2_2:''
        }
    },
    created(){
        this.HEADERTITLE('Js复杂判断的更优雅写法');
    },
    mounted(){
        /**第一种写法  if-else */
        if(this.status === 1){
            this.if_else_text = 'status == 1 开团进行中'
        }else if(this.status === 2){
            this.if_else_text = 'status == 2 开团失败'
        }else if(this.status === 3){
            this.if_else_text = 'status == 3 商品售罄'
        }else{
            this.if_else_text = 'status == 4 开团成功'
        }
        /**第二种写法  if-else */
        switch(this.status){
            case 1:
                this.switch_text = 'status == 1 开团进行中'
                break;
            case 2:
                this.switch_text = 'status == 2 开团失败'
                break;
            case 3:
                this.switch_text = 'status == 3 商品售罄'
                break;
            default:
                this.switch_text = 'status == 4 开团成功'
        }

        /**第三种写法  根据对象进行判断*/
        this.actionsInit(this.status);

        /**第四种写法  根据map对象进行判断 升级*/
        this.actionsMap(this.status);

        /**多元判断条件  根据map对象进行判断 升级*/
        this.MaryactionsMap();
        
        /**多元判断条件  根据map对象进行判断 升级 -- 如果多个判断条件处理的逻辑相同*/
        this.MaryactionsMapId();
    },
    methods:{
        ...mapMutations(['HEADERTITLE']),
        actionsInit(status){
            const actions = {
                '1':['开团进行中'],
                '2':['开团失败'],
                '3':['商品售罄'],
                'default':['开团成功']
            };

            let action = actions[status] || actions['default']
            this.object_text = `status==${status} ${action[0]}`;
        },
        actionsMap(status){
            const actions = new Map([
                [1,['开团进行中']],
                [2,['开团失败']],
                [3,['商品售罄']],
                ['default',['开团成功']]
            ])
            let action = actions.get(status) || actions.get('default')
            this.map_text = `status==${status} ${action[0]}`;
        },
        MaryactionsMap(){
            var _this = this;
            function text(identity,status){
                _this.map_text_2_1 = `身份标识是${identity} - 状态是${status}`
            }
            const actions = new Map([
                ['guest-1',()=>{text('guest','1')}],
                ['guest-2',()=>{text('guest','2')}],
                ['guest-3',()=>{text('guest','3')}],
                ['master-1',()=>{text('master','1')}],
                ['master-2',()=>{text('master','2')}],
                ['master-3',()=>{text('master','3')}],
                ['default',()=>{text('guest','1')}]
            ])

            let action = actions.get(`${this.identity}-${this.status}`) || actions.get('default')
            action.call(this)
        },
        MaryactionsMapId(){
            /**如果 guest 1-2 处理的逻辑是相同的 */
            const actions = new Map([
                [/^guest-[1-2]$/,()=>{}],
                [/^guest-3$/,()=>{}],
                [/^master-1$/,()=>{}]
            ])
        }
    }
}
</script>

<style scoped>
.title{font-size: 14px;margin-top: 20px; color: red;}
</style>
