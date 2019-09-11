// pages/chat/chat.js
let app = getApp()
import {
    avatarUrl
} from '../../config/baseUrl.js'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        value: '',
        account: null,
        avatarUrl: avatarUrl,
        list: []
    },
    send() {
        this.sendMsg(this.data.value)
        this.setData({
            value: ''
        })
    },
    input(e) {
        console.log(e.detail.value)
        this.setData({
            value: e.detail.value
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        console.log(options)
        this.setData({
            account: options.id
        })
    },


    sendMsg(text) {
        var msg = app.globalData.nim.sendText({
            scene: 'p2p',
            to: this.data.account,
            text: text,
            done: sendMsgDone
        });
        console.log('正在发送p2p text消息, id=' + msg.idClient);
        // pushMsg(msg);
        function sendMsgDone(error, msg) {
            console.log(error);
            console.log(msg);
            console.log('发送' + msg.scene + ' ' + msg.type + '消息' + (!error ? '成功' : '失败') + ', id=' + msg.idClient);
            //pushMsg(msg);
        }
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})