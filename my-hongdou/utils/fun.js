// 获取地址栏参数
function getQueryString(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    }
    return null;
}
// 判断浏览器内核，手机类型
function checkVersion() {
    var u = navigator.userAgent,
        app = navigator.appVersion;
    return {
        trident: u.indexOf('Trident') > -1, //IE内核
        presto: u.indexOf('Presto') > -1, //opera内核
        webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
        gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
        mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
        ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
        android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1, //android终端
        iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
        iPad: u.indexOf('iPad') > -1, //是否iPad
        webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
        weixin: u.indexOf('MicroMessenger') > -1, //是否微信
        qq: u.match(/\sQQ/i) == " qq", //是否QQ
        app: u.indexOf('erbanApp') > -1 //是否在app内
    };
}

// 图片预加载
function preloadImage(obj) {
    var loadLength = 0,
        newImages = [];
    for (var i = 0; i < obj.imageArr.length; i++) {
        newImages[i] = new Image();
        newImages[i].src = obj.imageArr[i];
        newImages[i].onload = newImages[i].onerror = function() {
            loadLength++;
            typeof obj.preloadPreFunc === 'function' && obj.preloadPreFunc(loadLength);
            if (loadLength == obj.imageArr.length) {
                typeof obj.doneFunc === 'function' && obj.doneFunc();
            }
        }
    }
}

// 判断是否在App内
function isApp() {
    var androidBol = false;
    var osBol = false;
    if (window.androidJsObj && typeof window.androidJsObj === 'object') {
        androidBol = true;
    }
    if (window.webkit) {
        osBol = true;
    }
    return (androidBol || osBol);
}
//获得某个元素距离目标元素的左边和上面的距离
function offset(dom, parentDom) {
    var offsetL = 0,
        offsetT = 0,
        parentDom = parentDom || window.document.body,
        obj = {};

    while (dom != parentDom && dom != null) {
        offsetL += dom.offsetLeft
        offsetT += dom.offsetTop
        dom = dom.offsetParent
    }
    obj.top = offsetT;
    obj.left = offsetL;
    return obj
}

//获得哈希值
function getHash() {
    var url = location.hash; //获取url中"#"符后的字串   
    var theHash = {};
    var str = url.substr(1);
    if (str.length < 1) return {};
    var strs = str.split("&");
    for (var i = 0; i < strs.length; i++) {
        theHash[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
    }
    return theHash;
}
//删除哈希值
function delHash(k) {
    var hash = getHash() || {};
    var str = '';
    if (hash[k]) {
        delete hash[k];
    }
    for (var key in hash) {
        str += key + '=' + hash[key] + '&';
    }
    location.hash = str.substr(0, str.length - 1);
}

//添加哈希值
function addHash(key, value) {
    var hash = getHash() || {};
    var str = '';
    hash[key] = value;
    for (var key in hash) {
        str += key + '=' + hash[key] + '&';
    }
    location.hash = str.substr(0, str.length - 1);
}

//动态加载js
function loadScript(src, callback) {
    var script = document.createElement("script")
    script.type = "text/javascript";
    if (script.readyState) { //IE 
        script.onreadystatechange = function() {
            if (script.readyState == "loaded" ||
                script.readyState == "complete") {
                script.onreadystatechange = null;
                callback();
            }
        };
    } else { //Others: Firefox, Safari, Chrome, and Opera 
        script.onload = function() {
            callback();
        };
    }
    script.src = src;
    document.body.appendChild(script);
}
//拷贝数据，仅限数组和对象
function copy(obj) {
    return JSON.parse(JSON.stringify(obj));
}

//浏览器隐藏显示tab的回调
function handleVisibilityChange(visibleCallback, hiddenCallback) {
    var hidden, visibilityChange;
    if (typeof document.hidden !== "undefined") {
        hidden = "hidden";
        visibilityChange = "visibilitychange";
    } else if (typeof document.msHidden !== "undefined") {
        hidden = "msHidden";
        visibilityChange = "msvisibilitychange";
    } else if (typeof document.webkitHidden !== "undefined") {
        hidden = "webkitHidden";
        visibilityChange = "webkitvisibilitychange";
    }

    if (typeof document[hidden] === "undefined") {
        console.log("This browser not support visibilityChange");
    } else {
        //document.addEventListener(visibilityChange, handleVisibilityChange, false); 
        addEvent(document, visibilityChange, function() {
            if (document[hidden]) {
                hiddenCallback();
            } else {
                visibleCallback();
            }
        })
    }
}

//添加事件监听兼容性写法
function addEvent() {
    if (document.addEventListener) {
        return function(el, type, fn) {
            el.addEventListener(type, fn, false);
        };
    } else {
        return function(el, type, fn) {
            el.attachEvent('on' + type,
                function() {
                    return fn.call(el, window.event);
                });
        };
    }
};

function setCookie(name, value) {
    document.cookie = name + "=" + escape(value);
}

function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
}

function base64_encode(input) {
    var _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    var output = "";
    var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
    var i = 0;
    input = utf8_encode(input);
    while (i < input.length) {
        chr1 = input.charCodeAt(i++);
        chr2 = input.charCodeAt(i++);
        chr3 = input.charCodeAt(i++);
        enc1 = chr1 >> 2;
        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
        enc4 = chr3 & 63;
        if (isNaN(chr2)) {
            enc3 = enc4 = 64;
        } else if (isNaN(chr3)) {
            enc4 = 64;
        }
        output = output +
            _keyStr.charAt(enc1) + _keyStr.charAt(enc2) +
            _keyStr.charAt(enc3) + _keyStr.charAt(enc4);
    }
    return output;
};

function utf8_encode(string) {
    string = string.replace(/\r\n/g, "\n");
    let utftext = "";
    for (let n = 0; n < string.length; n++) {
        let c = string.charCodeAt(n);
        if (c < 128) {
            utftext += String.fromCharCode(c);
        } else if ((c > 127) && (c < 2048)) {
            utftext += String.fromCharCode((c >> 6) | 192);
            utftext += String.fromCharCode((c & 63) | 128);
        } else {
            utftext += String.fromCharCode((c >> 12) | 224);
            utftext += String.fromCharCode(((c >> 6) & 63) | 128);
            utftext += String.fromCharCode((c & 63) | 128);
        }

    }
    return utftext;
}

function base64_decode(input) { // 解码，配合decodeURIComponent使用
    var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    var output = "";
    var chr1, chr2, chr3;
    var enc1, enc2, enc3, enc4;
    var i = 0;
    input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
    while (i < input.length) {
        enc1 = base64EncodeChars.indexOf(input.charAt(i++));
        enc2 = base64EncodeChars.indexOf(input.charAt(i++));
        enc3 = base64EncodeChars.indexOf(input.charAt(i++));
        enc4 = base64EncodeChars.indexOf(input.charAt(i++));
        chr1 = (enc1 << 2) | (enc2 >> 4);
        chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
        chr3 = ((enc3 & 3) << 6) | enc4;
        output = output + String.fromCharCode(chr1);
        if (enc3 != 64) {
            output = output + String.fromCharCode(chr2);
        }
        if (enc4 != 64) {
            output = output + String.fromCharCode(chr3);
        }
    }
    return utf8_decode(output);
}

function isObj(obj) {
    return Object.prototype.toString.call(obj) == '[object Object]';
}

function isFun(fun) {
    return Object.prototype.toString.call(fun) == '[object Function]';
}

function isArr(arr) {
    return Object.prototype.toString.call(arr) == '[object Array]';
}

function isNum(arr) {
    return Object.prototype.toString.call(arr) == '[object Number]';
}

//是否是json字符串
function isJSONStr(str) {
    if (typeof str == 'string') {
        try {
            var obj = JSON.parse(str);
            if (typeof obj == 'object') {
                return true;
            } else {
                return false;
            }

        } catch (e) {
            return false;
        }
    } else {
        return false;
    }
}
//监听是否点击焦点是否为当前绑定对象，不是则触发回调函数
const clickoutside = {
    // 初始化指令
    bind(el, binding, vnode) {
        function documentHandler(e) {
            // 这里判断点击的元素是否是本身，是本身，则返回
            if (el.contains(e.target)) {
                return false
            }
            // 判断指令中是否绑定了函数
            if (binding.expression) {
                // 如果绑定了函数 则调用那个函数，此处binding.value就是handleClose方法
                binding.value(e)
            }
        }
        // 给当前元素绑定个私有变量，方便在unbind中可以解除事件监听
        el.__vueClickOutside__ = documentHandler
        document.addEventListener('click', documentHandler)
    },
    update() {},
    unbind(el, binding) {
        // 解除事件监听
        document.removeEventListener('click', el.__vueClickOutside__)
        delete el.__vueClickOutside__
    }
}

let getCurrentDate = function(splitDate='/',splitTime=':'){
    let currentDateObj = new Date()
    let date = currentDateObj.getFullYear()+splitDate+(currentDateObj.getMonth()+1)+splitDate+currentDateObj.getDate()
    let time = currentDateObj.getHours()+splitTime+currentDateObj.getMinutes()+splitTime+currentDateObj.getSeconds()
    return {
        date,time
    }
}

let isEmptyObj = function(o){
    //空对象判断
    if (typeof o == 'object' && o !== null) {
      for (var i in o) {
        return false
      }
      return true
    }
    return false
}

let svgaTimoutPromise = function(){
    let myresolve
    let p = new Promise((resolve,reject)=>{
        myresolve = resolve
    })
    return {
        p,
        myresolve
    }
}


/*转化为日期
 type（字符串，可选）  
默认'1'、YYYY/MM/DD h : m : s；
 '2'、YYYY-MM-DD h : m : s； 
 '3'、YYYY/MM/DD； 
 '4'、YYYY-MM-DD； 
 '5'.h : m : s
 '6' MM-DD h:m:s
*/
function stampTotime(timestamp , type='1') {
    const num = String(timestamp).length
    if(num === 10){//时间戳为10位需*1000，时间戳为13位的话不需乘1000
      timestamp = timestamp*1000;
    }
    var date = new Date(timestamp),
      Y = date.getFullYear(),
      M = date.getMonth()+1,
      D = date.getDate(),
      h = date.getHours(),
      m = date.getMinutes(),
      s = date.getSeconds();
    if(M<10){
      M = '0'+M;
    }
    if(D<10){
      D = '0'+D;
    }
    if(h<10){
      h = '0'+h;
    }
    if(m<10){
      m = '0'+m;
    }
    if(s<10){
      s = '0'+s;
    }
    let time;
    if( type === '1' || type === 1) {
      time = Y + '/' + M + '/' + D + " " + h + ':' + m + ':' + s;
    }
    if( type === '2' || type === 2) {
      time = Y + '-' + M + '-' + D + " " + h + ':' + m + ':' + s;
    }
    if( type === '3' || type === 3) {
      time = Y + '/' + M + '/' + D;
    }
    if( type === '4' || type === 4) {
      time = Y + '-' + M + '-' + D;
    }
    if( type === '5' || type === 5) {
      time = h + ':' + m + ':' + s;
    }
    if(type==='6'||type===6){
        time =  M + '-' + D + " " + h + ':' + m + ':' + s; ;
    }
    return time;
  }
  /*截取字符串*/
  function subStr(str, len) {
    if (!str || !len) return "";
    let tlen = 0;
    let temp = "";
    for (let i = 0; i < str.length; i++) {
      tlen += str.charCodeAt(i) > 255 ? 2 : 1;

      if (tlen > len) return temp;

      temp += str.charAt(i);
    }
    return str;
  }
  //获取字符串长度
  function strlen(str) {
    var realLength = 0,
      len = str.length,
      charCode = -1;
    for (var i = 0; i < len; i++) {
      charCode = str.charCodeAt(i);
      if (charCode >= 0 && charCode <= 128) realLength += 1;
      else realLength += 2;
    }
    return realLength;
  }
  //返回符合的长度的字符串，超出...
  function subStrText(text,len){
    return strlen(text) > len ? subStr(text, len) + "..." : text;
  }
 
export {
    offset,
    isApp,
    preloadImage,
    checkVersion,
    getQueryString,
    getHash,
    delHash,
    addHash,
    svgaTimoutPromise,
    loadScript,
    copy,
    handleVisibilityChange,
    addEvent,
    base64_encode,
    utf8_encode,
    base64_decode,
    isObj,
    isFun,
    isArr,
    isNum,
    isJSONStr,
    clickoutside,
    getCurrentDate,
    isEmptyObj,
    stampTotime,
    subStr,
    strlen,
    subStrText
}
