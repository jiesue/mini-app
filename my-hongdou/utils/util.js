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
  var user = wx.getStorageSync('user') || null;
  return user !== null && getApp().globalData.userInfo != null;
}

//类型检测

module.exports = {
  formatTime,
  checkLogin,
}