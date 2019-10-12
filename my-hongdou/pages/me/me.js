// pages/me/me.js
import NIM from '../../utils/NIM_Web_NIM_weixin_v6.8.0.js';
import { appKey } from '../../config/config.js'
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    toReal() {
        wx.switchTab({
            url: '../index/index',
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onload: function (options) {

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