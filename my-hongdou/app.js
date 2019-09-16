//app.js
import AppIm from './utils/appIm.js'
import {
    appKey
} from './config/config.js'
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

        this.initIm(this)

    },
    onShow: function(options) {
        console.log(wx.getLaunchOptionsSync())
        wx.setTabBarBadge({
            index: 1,
            text: '99+'
        })

    },
    initIm(app) {
        let options = {
            app: app,
            appkey: appKey,
            account: 'jie1',
            token: 'jie1',
        };
        app.globalData.im = new AppIm(options);
    },

    pushMsg(msgs) {
        if (!Array.isArray(msgs)) {
            msgs = [msgs];
        }
        var sessionId = msgs[0].sessionId;
        // this.globalData.chatData.msgs = this.globalData.chatData.msgs || {};
        this.globalData.chatData.msgs[sessionId] = this.globalData.NIM.mergeMsgs(this.globalData.chatData.msgs[sessionId], msgs);
    },
    globalData: {
        userInfo: null,
        im:null,
        NIM: null,
        chatData: {
            msgs:{}
        }
    }
})