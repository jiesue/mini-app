// pages/me/me.js
import NIM from '../../utils/NIM_Web_NIM_weixin_v6.8.0.js';
import { appKey } from '../../config/config.js'
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
      avatar:null,
      user:null,
      pwd:null,
      nick:null,
    },

    toReal() {
      wx.showToast({
        title: '实名认证！',
        icon: 'success',
        duration: 2000
      })

    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      console.log(app.globalData.userInfo);
      var user = wx.getStorageSync('user')
      var pwd = wx.getStorageSync('pwd')
      this.setData({
        avatar: app.globalData.userInfo.avatarUrl,
        user,
        pwd,
        nick: app.globalData.userInfo.nickName,
      })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
      console.log('onReady')

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
      console.log('onShow')

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {
      console.log('onHide')

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {
      console.log('onloonUnloadad')

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {
      console.log('ononPullDownRefreshload')

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
      console.log('onReachBottom')

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
      console.log('onShareAppMessage')

    }
})