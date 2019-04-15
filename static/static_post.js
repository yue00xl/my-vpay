

/** 引入最新版本 静态资源文件*/
(function(){
    /**
     * 生成随机时间戳  例：20190229
     */
    var now = new Date();
    var nowStr = now.getFullYear() + '';
    if(now.getMonth() + 1 < 10){
        nowStr += '0' + (now.getMonth() + 1);
    }else{
        nowStr += '' + (now.getMonth() + 1);
    }
    if(now.getDate() + 1 < 10){
        nowStr += '0' + (now.getDate() + 1);
    }else{
        nowStr += '' + (now.getDate() + 1);
    }

    /**
     * cdn静态资源列表
     */
    var cdn_static_list = {
        'postdata':'https://fun.jiehun.com.cn/global-static/postData/1.0.0/post_data.min.js',
        'qukan':'https://fun.jiehun.com.cn/global-static/qukan/qukan-upload_bak.js'
    };


    //原生js没有读取get参数的能力,所有从DOM入手，因为毕竟src是写在页面里面的，这样可以找到对应的<script>元素，把它的src属性读取出来就是了，问题只有一个了，哪个标签才是调用本js的呢？ 因为js是解释型的语言，边加载边执行，那么执行到我这个js的时候，后面的js还没加载到，那么一定是“最后”一个script标签;
    /**
     *  // <script src="https://fun.jiehun.com.cn/global-static?postdata&qukan"></script>
     *  1、 script          获取到当前已经加载 script 标签集合  例：[script,script]
     *  2、 len             最后一个script 索引 
     *  3、 static_list     要加载的静态资源参数列表   例：["postdata", "qukan"]
     */ 
    var script = document.querySelectorAll('script'); 
    var len = script.length - 1; 
    var statics = script[len].getAttribute('src').split('?')[1]; 
    var static_list = statics ? statics.split('&') : [];
    
    
    for(var i=0;i<static_list.length;i++){
        var add_url = cdn_static_list[static_list[i]]+'?'+nowStr;
        add_write(add_url);
    }
    
    //往页面中填入新的script
    function add_write(url){
        document.write("<script type='text/javascript' src='"+url+"'><\/script>");
    }

})()


