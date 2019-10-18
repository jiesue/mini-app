// pages/chat/chat.js
let app = getApp()
import pubSub from '../../utils/pubSub'
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
        scrollTop: 0,
        list: []
    },
    send() {
        this.sendMsg(this.data.value)
        this.setData({
            value: ''
        })
    },
    input(e) {
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
        wx.setNavigationBarTitle({
            title: this.data.account
        })
        this.getNewList()
    },
   

    getNewList() {
        var targetText = 'p2p-' + this.data.account;
        var list = app.globalData.msgs.member[targetText] || [];
        this.setData({
            list
        })
        console.log(list.length)
        this.setData({
            scrolltop: 1000 + list.length * 300
        })

    },

    sendMsg(text) {
        var _this = this;
        var msg = app.yunxin.sendText({
            scene: 'p2p',
            to: this.data.account,
            text: text,
            done: sendMsgDone
        });
        console.log('正在发送p2p text消息, id=' + msg.idClient);
        function sendMsgDone(error, msg) {
            console.log('发送' + msg.scene + ' ' + msg.type + '消息' + (!error ? '成功' : '失败') + ', id=' + msg.idClient);
            app.pushMsg(msg);
            _this.getNewList()
        }
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {
        pubSub.on('getNewList', this.getNewList)
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