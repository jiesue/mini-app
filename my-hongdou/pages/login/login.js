// pages/login/login.js
let app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        canIUse: wx.canIUse('button.open-type.getUserInfo')
    },


    //  wx.getSetting({
    //   success: res => {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //       wx.getUserInfo({
    //         success: res => {
    //           // 可以将 res 发送给后台解码出 unionId
    //           this.globalData.userInfo = res.userInfo
    //           // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //           // 所以此处加入 callback 以防止这种情况
    //           if (this.userInfoReadyCallback) {
    //             this.userInfoReadyCallback(res)
    //           }
    //         }
    //       })
    //     }
    //   }
    // }),
    getUserInfo: function (e) {
        wx.showLoading({
            title: '正在登录中',
        })
        console.log(e)
        if (e.detail.userInfo) {
            app.globalData.userInfo = e.detail.userInfo;
            wx.setStorageSync('avatarUrl', e.detail.userInfo.avatarUrl)
            setTimeout(() => {
                wx.hideLoading()
                wx.switchTab({
                    url: '../index/index',
                })
            }, 100)

        }
    },
    login: function () {
        if (!this.canIUse) {
            wx.getUserInfo({
                success: res => {
                    app.globalData.userInfo = res.userInfo
                    wx.setStorageSync('avatarUrl', res.userInfo.avatarUrl)
                }
            })
        }
    },
    /**
     * 生命周期函数--监听页面加载
     */

    onLoad: function (options) {
        console.log('onLoad',options)
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})