// 点击返回顶部函数 
function backTop(btnId) {
    var btn = document.getElementById(btnId);
    var d = document.documentElement; //获取整个HTML页面
    var b = document.body;
    // console.log(d.scrollTop,b.scrollTop)
    window.onscroll = set;
    btn.style.display = "none";
    btn.onclick = function () {
        btn.style.display = "none";
        window.onscroll = null;
        this.timer = setInterval(function () {
            //   Math.ceil 向上取整 返回大于或等于函数参数 并且与之最接近的整数
            d.scrollTop -= Math.ceil((d.scrollTop + b.scrollTop) * 0.1);
            b.scrollTop -= Math.ceil((d.scrollTop + b.scrollTop) * 0.1);
            if (d.scrollTop + b.scrollTop == 0)
                clearInterval(btn.timer, (window.onscroll = set));
        }, 10);
    };
    function set() {
        btn.style.display = d.scrollTop + b.scrollTop > 100 ? "block" : "none";
    }
}

// 时间格式化函数 fmt: YYYY-mm-dd-HH-MM-SS
function dateFormat(fmt, date) {
    let ret;
    const opt = {
        "Y+": date.getFullYear().toString(),        // 年
        "m+": (date.getMonth() + 1).toString(),     // 月
        "d+": date.getDate().toString(),            // 日
        "H+": date.getHours().toString(),           // 时
        "M+": date.getMinutes().toString(),         // 分
        "S+": date.getSeconds().toString()          // 秒
    };
    for (let k in opt) {
        ret = new RegExp("(" + k + ")").exec(fmt);
        if (ret) {
            /**
             * padStart 根据给定的长度在字符串前面补充想要补充的字符串 padStart(len,str)
             *  len: 转换后的长度
             *  str: 想要补充的字符串
             * padEnd(len,str) 在字符串的后面补充字符串
             * (opt[k].padStart(ret[1].length, "0"))
             */
            fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
        };
    };
    return fmt;
}

export {backTop,dateFormat}
