//index.js
//获取应用实例
const app = getApp()

Page({
    data: {
        userInfo: {},
        hasUserInfo: false,
        // canIUse: wx.canIUse('button.open-type.getUserInfo')
    },

    onLoad: function() {
        if (app.globalData.userInfo) {
            this.setData({
                userInfo: app.globalData.userInfo,
                hasUserInfo: true
            })
        } else {
            setTimeout(() => {
                wx.navigateTo({
                    url: '../login/login',
                })
            },1000)

        }
    }
})

