//app.js
import AppIm from './utils/yunxin.js'
import {
    appKey
} from './config/config.js'
let app = getApp();
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
        // console.log(wx.getLaunchOptionsSync())
        wx.setTabBarBadge({
            index: 1,
            text: '99+'
        })

    },



    // pushMsg(msgs) {
    //     if (!Array.isArray(msgs)) {
    //         msgs = [msgs];
    //     }
    //     var sessionId = msgs[0].sessionId;
    //     this.globalData.pageData.msg.member[sessionId] = this.globalData.NIM.mergeMsgs(this.globalData.pageData.msg.member[sessionId], msgs);

    // },
    globalData: {
        userInfo: {},
    }
})
