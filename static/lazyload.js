
/**
 * 图片延迟加载组件
 * version 1.0.0
 * delay 延时多少毫秒加载
 * failure_limit  距离顶部多少开始加载图片
 */

!(function($){
    $.fn.lazyload = function(option){
        var defaults = {
            delay:30,
            pics:0,
            failure_limit:200,
            placeholder:"data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
        }
        var options = $.extend(defaults,option);
        this.each(function(){
            $(function(){
                var delay = options['delay'];
                var loadIndex = options['pics'];
                // 暂时只做这个选择
                var imgs = document.querySelectorAll('img[data-hbh]');
                imgs.forEach(function(item){
                    $(item).css({opacity: 0.3,filter:'alpha(opacity=30)'})
                })

                if('IntersectionObserver' in window){
                    //执行新属性 IntersectionObserver
                    var io = new IntersectionObserver(callback);
                    function callback(entries){
                        entries.forEach(function(item){
                            if(item.isIntersecting){
                                $(imgs).fadeTo("slow",1);
                                item.target.src = item.target.dataset.hbh;
                                io.unobserve(item.target)
                            }
                        })
                    }
                    for(var i=0;i<imgs.length;i++){
                        io.observe(imgs[i])
                    }
                }else{
                    //兼容低版本浏览器
                    // 设定了首次加载个数
                    if(loadIndex){
                        imgs.forEach(function(item,index){
                            if(index <= loadIndex-1){
                                item.src = item.getAttribute('data-hbh');
                            }
                        });
                    }else{
                        // 激活图片平铺迭代器
                        loadFirstScreen(imgs,loadIndex);
                    }
                    window.addEventListener("scroll",_debounce(function(){
                        imgs.forEach(function(item,index){
                            var src = item.src;
                            if(src){
                                var status = isInViewPortOfOne(item);
                                if(status){
                                    $(item).fadeTo("slow",1);
                                    item.src = item.getAttribute('data-hbh');
                                }
                            }
                        });
                    },delay));
                }
            })
        });
        /**
         * 迭代加载第一屏所有图片，可以考虑使用Worker预加载
         */
        function loadFirstScreen(imgs,index){
            if(index >= imgs.length){ return;}
            var img = new Image();
            img.src = imgs[index].getAttribute('data-hbh');
            img.addEventListener("load",function(){
                $(imgs[index]).fadeTo("slow",1);
                imgs[index].src = this.src;
                var status = isInViewPortOfOne(imgs[index]);
                if(status){
                    //继续迭代加载图片，直到第一屏铺满
                    index = index + 1;
                    loadFirstScreen(imgs,index);
                }
            });
            img.addEventListener("error",function(){
                $(imgs[index]).fadeTo("slow",1);
                imgs[index].src = options.placeholder;
                var status = isInViewPortOfOne(imgs[index]);
                if(status){
                    //继续迭代加载图片，直到第一屏铺满
                    index = index + 1;
                    loadFirstScreen(imgs,index);
                }
            });
        }
        /**
         * 检测距离顶部的位置
         */
        function isInViewPortOfOne (el) {
            var viewPortHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
            var top = el.getBoundingClientRect() && el.getBoundingClientRect().top
            return top  <= viewPortHeight + options.failure_limit
        }
        /**
         * 防抖处理
         */
        function _debounce(func,wait){
            var timeout, args, context, timestamp;
            var later = function(){
                var last = Date.now()-timestamp;
                if(last < wait && last > 0){
                    timeout = setTimeout(later, wait - last);
                }else{
                    timeout = null;
                    func.apply(context, args);
                    if (!timeout) context = args = null;
                }
            }
            return function(){
                context = this;
                args = arguments;
                timestamp = Date.now();
                // 如果延时不存在，重新设定延时
                if(!timeout){ timeout = setTimeout(later,wait)};
            }
        }
        return this;
    };
})(window.jQuery)

