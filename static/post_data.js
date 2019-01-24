'use strict';
//数据上报
function postdata(){
    //初始化cookie中的参数
    this.params = {
        authorization : '',  //用户登录信息
        city_id : 0,  //城市ID
        app_key : 'hunbasha_wap',   //APP标识
        jid:'',  //浏览器id
        app_channel:'', //安装(升级)渠道
        app_version:'',  //APP版本号
        pageId:'',  //页面浏览id
        device_id:'',  //设备标示符
        view_id:'',  //打开APP生成的id
        lat : '',  //纬度
        lng : '',   //经度
        url:arguments[0].url || '//open.jiehun.com.cn/user/sdk/post-web-data',
        domain:arguments[0].domain || '.jiehun.com.cn'
    };
    //生成一个随机的uuid值
    this.generateUUID = function(){
        var d = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-yxxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,
        function(c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r: (r & 0x3 | 0x8)).toString(16);
        });
        return uuid;
    };
    //事件上报新增参数
    this.actionlist = {
        'actionName': '',
        'actionValue': '',
        'actionType':'tap',          
        'actionPath': location.href,
        'actionPosition':'',
        'actionId':this.generateUUID()
    };
    this.getCookie = function(name){
        var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
        if(arr=document.cookie.match(reg)){
            return unescape(arr[2]); 
        }else{
            return null; 
        }
    };
    this.setCookie = function(key,value,t,domain){
        //存cookie
        var oDate=new Date();
        var path = '/';
        var t = t ? this.eval(t) : 0;
        oDate.setTime(oDate.getTime() + t);
        document.cookie=key+"="+encodeURIComponent(value)+";expires="+oDate.toGMTString()+";domain="+domain+";path="+path;
    };
    this.eval = function(str){
        var Fn = Function;  //一个变量指向Function，防止有些前端编译工具报错
        return new Fn('return ' + str)();
    };

    //事件委托
    this.delegateEvent = function(interfaceEle,selector,type,fn){
        var that = this;
        if(interfaceEle.addEventListener){
            interfaceEle.addEventListener(type,eventfn);
        }else{
            interfaceEle.attachEvent("on"+type,eventfn);
        }
        function eventfn(e){
            var e = e || window.event;
            var target = e.target || e.srcElement;
            that.isParentNode(target,selector,fn,e)
        }
    };
    this.isParentNode = function(target,selector,fn,e){
        var that = this;
        if(that.matchSelector(target, selector)){
            if(fn){
                fn.call(target,e);
            }
        }else{
            if(target.parentNode){
                target = target.parentNode;
                that.isParentNode(target,selector,fn,e);
            }
        }
    };
    //判断事件的作用目标是否与选择器匹配；匹配则返回true
    this.matchSelector = function(ele, selector){
        if(ele == null)return;
        // 如果选择器为ID
        if (selector.charAt(0) === "#") {            
            return ele.id === selector.slice(1);   
        }
        //如果选择器为Class
        if (selector.charAt(0) === ".") {
            return (" " + ele.className + " ").indexOf(" " + selector.slice(1) + " ") != -1;
        }
    };

    this.Object_assign = function(init_data,new_data){
        var data = {};
        if (typeof Object.assign != 'function') {
            Object.assign = function(target) {
                'use strict';
                if (target == null) {
                    throw new TypeError('Cannot convert undefined or null to object');
                }
                target = Object(target);
                for (var index = 1; index < arguments.length; index++){
                    var source = arguments[index];
                    if (source != null) {
                        for (var key in source) {
                            if (Object.prototype.hasOwnProperty.call(source, key)) {
                                target[key] = source[key];
                            }
                        }
                    }
                }
                return target;
            };
            data = Object.assign({},init_data,new_data);
        }else{
            data = Object.assign({},init_data,new_data);
        }
        return data;
    };

    this.pageDatas = function(){
        this.params = this.Head(document.cookie);
        var params = this.dataListFun();
        this.postWebData(params) //页面上报
    };
    this.init_data = function(){
        this.pageDatas();  //页面上报
        this.actionDatas();  //事件上报
    };
    this._init();
};

postdata.prototype._init = function(){
    this.pageDatas();  //页面上报
    this.actionDatas();  //事件上报
};


/**
 * 封装简易的ajax
 * @param type 请求方式
 * @param url 请求接口地址
 * @param async 同步／异步 
 * @param data 请求数据
 * @param dataType 数据格式
 * @param headers 自定义请求头
 * @param success 请求成功
 * @param error 请求失败
 */
postdata.prototype.$Ajax = function(){
    var ajaxData = { 
        type: (arguments[0].type || "GET").toUpperCase(),  
        url: arguments[0].url || "",  
        async: arguments[0].async || "true", 
        data: arguments[0].data || null, 
        dataType: arguments[0].dataType || "json", 
        headers:arguments[0].headers || {}, 
        beforeSend: arguments[0].beforeSend || function(){}, 
        success: arguments[0].success || function(){},  
        error: arguments[0].error || function(){}  
    };
    ajaxData.beforeSend();
    var xhr = this.createxmlHttpRequest();  
    xhr.responseType=ajaxData.dataType; 
    xhr.open(ajaxData.type,ajaxData.url,ajaxData.async);  
    xhr.setRequestHeader("Content-Type",'application/json;charset=UTF-8'); 
    xhr.setRequestHeader("Accept",'application/json, text/plain, */*'); 
    for(var i in ajaxData.headers){
        xhr.setRequestHeader(i,ajaxData.headers[i]);  
    }
    xhr.send(JSON.stringify(ajaxData.data));  
    xhr.onreadystatechange = function() {  
        if (xhr.readyState == 4) {  
            if(xhr.status == 200){ 
                ajaxData.success(xhr.response); 
            }else{ 
                ajaxData.error();
            }  
        } 
    }  
};

postdata.prototype.createxmlHttpRequest = function(){
    if (window.ActiveXObject) {  
        return new ActiveXObject("Microsoft.XMLHTTP");  
    } else if (window.XMLHttpRequest) {  
        return new XMLHttpRequest();  
    }  
};

postdata.prototype.postWebData = function(params){
    this.$Ajax({ 
        type:"post", 
        url:this.params.url,
        dataType:"json", 
        data:params, 
        headers:{
            "Authorization":this.params.authorization || '',
            "city-id":this.params.city_id || 0,
            "app-key":this.params.app_key || 'hunbasha_wap',
            "jid":this.params.jid,
            "client-id":this.params.jid,
            "device-id":this.params.device_id || '',
            "app-version":this.params.app_version || '',
            "app-channel":this.params.app_channel || '',
            "page-id":this.params.pageId,
        },
        success:function(msg){ 
            //console.log(msg) 
        }, 
        error:function(){ 
            //console.log("error") 
        } 
    })
};
/**
 *  将cookie中的各种参数取出来
 */
postdata.prototype.Head = function(cookielist){
    if(cookielist) {
        var cookieArr = cookielist.split(';');
        for (var i in cookieArr) {
            var cookie = cookieArr[i].replace(/(^\s*)|(\s*$)/g,"");
            var index = cookie.indexOf('=');
            var name = cookie.substr(0,index);
            var value = decodeURIComponent(cookie.substr(index+1));
            switch (name) {
                case 'Authorization':
                    if(value){
                        if(/^dmp/.test(value)){
                            this.params.authorization = value
                        }else{
                            this.params.authorization = 'dmp ' + value
                        }  
                    };     
                    break;
                case 'jhu':
                    if(value){
                        if(/^dmp/.test(value)){
                            this.params.authorization = value
                        }else{
                            this.params.authorization = 'dmp ' + value
                        }    
                    };         
                    break;
                case 'city-id':
                    this.params.city_id = value;
                    break;
                case 'app-key':
                    this.params.app_key = value;
                    break;
                case 'jid':
                    this.params.jid = value;
                    break;
                case 'client-id':
                    this.params.jid = value;
                    break;
                case 'app-channel':
                    this.params.app_channel = value;
                    break;
                case 'app-version':
                    this.params.app_version = value;
                    break;
                case 'page-id':
                    this.params.pageId = value;
                    break;
                case 'device-id':
                    this.params.device_id = value;
                    break;  
                case 'view-id':
                    this.params.view_id = value;
                    break;
                case 'lat':
                    this.params.lat = value;
                    break;
                case 'lng':
                    this.params.lng = value;
                    break;
            }
        }
    }
    /**
    * 判断有没有jid 如果没有的话生成并且保存在cookie中
    */
    if(!this.params.jid || this.params.jid=='undefined'){
        this.params.jid =this.generateUUID().split("-").join("");
        this.setCookie('jid',this.params.jid,'1000 * 60 * 60 * 24 * 365',this.params.domain);
    }
    /**
    * 判断有没有pageId 如果没有的话生成并且保存在cookie中
    */
    if(!this.params.pageId){
        this.params.pageId = this.generateUUID();
        this.setCookie('page-id',this.params.pageId);
    }
    return this.params;  
};

/**
 * 数据上报body中所需要的数据
 */
postdata.prototype.dataListFun = function(){
    var params = {
        "data":[{
            visitCityName: "", // 定位城市name,通过IP地址获取
            cityId: parseInt(this.params.city_id) || 0,
            pageName: location.href,
            pageTitle: document.title ? document.title : '',
            viewId: this.params.view_id || "", // 当在APP中打开WAP时，需要上报；普通浏览器中为空 "" 
            authorization:this.params.authorization || "",
            pageId: this.params.pageId || this.generateUUID(), //pageview唯一码  
            actionTime: new Date().getTime().toString(),
            latitude: this.params.lat|| "",
            longitude: this.params.lng || "",
            referer:document.referrer ? document.referrer : ''
        }]
    };
    return params;
};
/**事件上报 -- 根据唯一标识class 去触发上报 */
postdata.prototype.actionDatas = function(){
    var that = this;
    var pageData = that.dataListFun();
    var current = window.document;
    if(current){
        this.delegateEvent(current,'.action_post_web_data','click',function(){
            console.log('action_post_web_data')
            var postData;
            try{
                //JSON格式正确
                var action = this.getAttribute('data-action') ? this.getAttribute('data-action') : '{}';
                var data = JSON.parse(action);
                postData = that.Object_assign(that.actionlist,data);
            }catch(err){
                //JSON格式不正确，自己拼接
                var tapParams = this.getAttribute('data-action').replace(/(^{)|(}$)/g, "").split(',');
                var obj = {};
                for(var i=0;i<tapParams.length;i++){
                    var data_action = tapParams[i].replace(/\s+/g,"").replace(/:/,'^').split('^');
                    data_action[0] = data_action[0].replace(/(^'|")|('|"$)/g, "");
                    data_action[1] = data_action[1].replace(/(^'|")|('|"$)/g, "");
                    obj[data_action[0]] = data_action[1];
                }
                postData = that.Object_assign(that.actionlist,obj);
            }
            var list = that.Object_assign(pageData.data[0],postData);
            var params = {
                "data":[list]
            };
            that.postWebData(params); //事件上报
        })
    }
};

/**事件上报 -- 手动触发事件上报 */
postdata.prototype.h_actionDatas = function(data){
    if(data == undefined)return;
    var that = this;
    var pageData = that.dataListFun();
    var postData;
    if(typeof(data) == 'object' && Object.prototype.toString.call(data).toLowerCase() == "[object object]"){
        //object
        postData = that.Object_assign(that.actionlist,data);
    }else{
        //string
        postData = that.Object_assign(that.actionlist,JSON.parse(data));
    }
    var list = that.Object_assign(pageData.data[0],postData);
    var params = {
        "data":[list]
    };
    that.postWebData(params); //事件上报
};








