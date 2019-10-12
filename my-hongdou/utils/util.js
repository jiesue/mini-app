const formatTime = date => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()

    return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
    n = n.toString()
    return n[1] ? n : '0' + n
}

function checkLogin() {
    return 'jie checkLogin'
}

//类型检测
function isObj(obj) {
    return Object.prototype.toString.call(obj) == '[object Object]';
}

function isFun(fun) {
    return Object.prototype.toString.call(fun) == '[object Function]';
}

function isArr(arr) {
    return Object.prototype.toString.call(arr) == '[object Array]';
}

function isNum(num) {
    return Object.prototype.toString.call(num) == '[object Number]';
}

module.exports = {
    formatTime,
    checkLogin,
    isNum,
    isArr,
    isFun,
    isObj
}