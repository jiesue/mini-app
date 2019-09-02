//index.js
//获取应用实例
const app = getApp()
var util = require('../../utils/util.js')

Page({
    data: {
        userInfo: {},
        hasUserInfo: false,
        activeIndex: 0,
        tabItems: ['关注', '直播', '语聊'],
        listItems: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
            // canIUse: wx.canIUse('button.open-type.getUserInfo')
    },
    change(e) {
        this.setData({
            activeIndex: e.currentTarget.dataset.index
        })
    },
    search() {
        console.log('search')
    },
    onLoad: function() {
        console.log(util.checkLogin())
            // if (app.globalData.userInfo) {
            //     this.setData({
            //         userInfo: app.globalData.userInfo,
            //         hasUserInfo: true
            //     })

        // } else {
        //     setTimeout(() => {
        //         wx.navigateTo({
        //             url: '../login/login',
        //         })
        //     },1000)

        // }
    }
})