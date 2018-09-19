
/**
 * 防抖函数
 * @param fun    执行的请求
 * @param delay  延时的时间
 */
const _debounce = (fun, delay)=>{
    return function (args) {
        let that = this
        let _args = args
        clearTimeout(fun.id)
        fun.id = setTimeout(function () {
            fun.call(that, _args)
        }, delay)
    }
}

/**
 * 节流函数
 * @param fun    执行的请求
 * @param delay  延时的时间
 */
const _throttle = (fun, delay)=>{
    let last, deferTimer
    return function (args) {
        let that = this
        let _args = arguments
        let now = +new Date()
        if (last && now < last + delay) {
            clearTimeout(deferTimer)
            deferTimer = setTimeout(function () {
                last = now
                fun.apply(that, _args)
            }, delay)
        }else {
            last = now
            fun.apply(that,_args)
        }
    }
}

export  {
    _debounce,
    _throttle
}