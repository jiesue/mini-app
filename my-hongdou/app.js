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
    pushMsg(msgs) {
        if (!Array.isArray(msgs)) {
            msgs = [msgs];
        }
        var sessionId = msgs[0].sessionId;
        // this.globalData.chatData.msgs = this.globalData.chatData.msgs || {};
        this.globalData.chatData.msgs[sessionId] = this.globalData.nim.mergeMsgs(this.globalData.chatData.msgs[sessionId], msgs);
        console.log(this.globalData)
    },
    globalData: {
        userInfo: null,
        nim: null,
        chatData: {
            msgs:{}
        }
    }
})