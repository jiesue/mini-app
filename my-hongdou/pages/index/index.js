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
        list1Items: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        list2Items: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        list3Items: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        // canIUse: wx.canIUse('button.open-type.getUserInfo')
    },
    change(e) {
        this.setData({
            activeIndex: e.currentTarget.dataset.index
        })
    },
    swiperToLeft() {
        console.log('left')
    },
    swiperChange(e) {

        if (e.detail.source == 'touch') { //滑动的时候执行改变tab
            this.setData({
                activeIndex: e.detail.current
            })
        }
    },
    search() {
        console.log('search')
        wx.navigateTo({
            url: '../search/search'
        })
    },
    onLoad: function() {
      console.log(util.checkLogin())
      if (util.checkLogin()) {
            this.setData({
                userInfo: app.globalData.userInfo,
                hasUserInfo: true
            })

        } else {
            setTimeout(() => {
                wx.redirectTo({
                    url: '../login/login',
                })
            }, 500)

        }
    }
})