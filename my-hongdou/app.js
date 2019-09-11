//app.js
App({
    onLaunch: function() {
        // 展示本地存储能力
        var logs = wx.getStorageSync('logs') || []
        logs.unshift(Date.now())
        wx.setStorageSync('logs', logs)
        wx.getLaunchOptionsSync()
        // 登录
        wx.login({
            success: res => {
                // 发送 res.code 到后台换取 openId, sessionKey, unionId
            }
        })
        // 获取用户信息

    },
    onShow: function(options) {
        console.log(wx.getLaunchOptionsSync())
        wx.setTabBarBadge({
            index: 1,
            text: '99+'
        })
       
    },
    globalData: {
        userInfo: null,
        nim:null
    }
})