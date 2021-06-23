
<template>
    <div>

        <div id="test" class="test" >
            <span>测试</span>
        </div>

        <el-button type="primary" @click="CanvasImgs">合成</el-button>  
        <el-dialog
            title="合成效果图预览"
            :visible.sync="composeimg"
            :close-on-click-modal="false"
            width="650px">
            <el-row class="composeImgs" v-for="(item,index) in prizes_list" :key="index">
                <el-col :span="8" class="composeImgs-left" >
                    <!-- <img class="fixedsImg" src="../../assets/2.png" /> -->
                    
                    <div class="fixeds" :id="'capture' + index"  >
                        <span>{{item.prize_name}}</span>
                    </div>

                </el-col>
                <el-col :span="15" class="composeImgs-right">
                    <p>编辑奖品名称<i>(只影响合成图的名称、不影响奖品原名称)</i></p>
                    <el-input v-model="item.prize_name"  placeholder="请输入奖品名称" class="inputs"></el-input>
                    <el-button type="primary" @click="CanvasImgs(index)">合成</el-button>  
                </el-col>
            </el-row>
            <div class="footer" style="margin-top: 15px;">
                <el-button type="danger" >取 消</el-button>
                <el-button type="primary" >保 存</el-button>
            </div>
        </el-dialog>

        
        <!-- <div id="capture" class="capture">
            <img src="../../assets/2.png" alt="">
            <div class="text">
                22222
            </div>
        </div> -->
        <!-- <div>
            <el-button @click="CanvasImgs">合成</el-button>
            <el-button @click="upsingleimgage">上传</el-button>
        </div> -->
    </div>
</template>


<script>
// import html2canvas from 'html2canvas'
import axios from 'axios';
export default {
    data(){
        return{
            composeimg:false,
            prizes_list:[
                {
                    prize_img:'',
                    prize_name:'222222'
                },
                {
                    prize_img:'',
                    prize_name:'33333'
                },
                {
                    prize_img:'',
                    prize_name:'555555'
                }
            ],
            imgageurl:''
        }
    },
    methods:{
        CanvasImgs(index){

            var width = 100;
            var height = 100;

            var scale = 2;
            var mycanvas = document.createElement('canvas');

            mycanvas.width = width * 2;
            mycanvas.height = height * 2;
            mycanvas.style.width = width  + 'px';
            mycanvas.style.height = height  + 'px';
            var context = mycanvas.getContext('2d');
            // context.scale(scale, scale);
            // var rect = document.querySelector('#test').getBoundingClientRect();//获取元素相对于视察的偏移量
            // context.translate(-rect.left, -rect.top);
	        // context.fillStyle = "red";

            var opts = {
                scale:2,
                canvas: mycanvas,
                backgroundColor: null,
                useCORS: true,
                allowTaint: true
            }


            html2canvas(document.querySelector('#test'),opts).then(canvas => {
               
                this.imgageurl = canvas.toDataURL();//图片地址
                var IMGS = new Image();
                IMGS.width = '200';
                IMGS.height = '200';
                IMGS.src = this.imgageurl;
                document.querySelector('#app').appendChild(IMGS);
            });
        },
        upsingleimgage(){
            let Files = this.dataURLtoFile(this.imgageurl,'111');

            let formDatas = new FormData();
            formDatas.append('bizcode',104)
            formDatas.append('file',Files)
            axios.post('https://oss.test.jiehun.com.cn/oss/image/upsingleimage',formDatas).then(res=>{
                console.log(res)
            })
        },
        dataURLtoFile(dataurl, filename){
            var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
            while(n--){
                u8arr[n] = bstr.charCodeAt(n);
            }
            return new File([u8arr], filename, {type:mime});
        }
    }
}
</script>

<style>
.capture{
    width: 200px;
    height: 240px;
    text-align: center;
    border: 1px solid red;
    position: relative
}
.capture img{
    width: 200px;
    height: 200px;
}
.capture .text{
    /* width: 100%;
    margin-top: 10px; */
    position: absolute;
    top: 0;
    left: 0;
    color: #fff;
}
.composeImgs{
    margin-bottom:20px;
}
.composeImgs .composeImgs-left {position:relative; width:200px; height:200px;  margin-right:20px;}
.composeImgs .composeImgs-left span{ position:absolute; bottom:0; left:0; color:#000; }
.composeImgs .composeImgs-left img{ width:100%; height:100%; }
.composeImgs .composeImgs-right .inputs{margin:10px 0;}
.composeImgs .composeImgs-right p{font-size: 14px;color: #000;}
.composeImgs .composeImgs-right i{font-style: normal;color:#999;}
.fixedsImg{
    position:absolute;
    left:0;
    top:0;
    z-index:1;
}
.fixeds{
    width:200px;
    height:200px;
    border:1px solid green;
    /* position:relative; */
    box-sizing: border-box;
}
.test{
    width:100px;
    height:100px;
    border:1px solid red;
    box-sizing: border-box;
}
</style>

