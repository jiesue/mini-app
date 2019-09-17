// pages/msg/msg.js
import NIM from '../../utils/NIM_Web_NIM_weixin_v6.8.0.js';
import pubSub from '../../utils/pubSub'
import {
    appKey
} from '../../config/config.js'
const app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        list: [],
        ps: '',
        account: ''
    },

    toChat(e) {
        wx.navigateTo({
            url: `../chat/chat?id=${e.currentTarget.dataset.id}`,
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        let _this = this;
        var data = {};
        // 注意这里, 引入的 SDK 文件不一样的话, 你可能需要使用 SDK.NIM.getInstance 来调用接口
        /*  var nim;
            app.globalData.nim = nim = NIM.getInstance({
                // debug: true,   
                appKey: appKey,
                account: 'jie1',
                token: 'jie1',
                db: true, //若不要开启数据库请设置false。SDK默认为true。
                // privateConf: {}, // 私有化部署方案所需的配置
                onconnect: onConnect,
                onwillreconnect: onwillreconnect,
                ondisconnect: onDisconnect,
                onerror: onError,
                onsyncdone: onSyncDone,
                onroamingmsgs: onroamingmsgs,
                onofflinemsgs: onofflinemsgs,
                onmsg: onmsg,
                onfriends: onFriends
            });
        */
        this.addOnIm()
        app.globalData.im.connect();
    },

    addOnIm() {
        console.log('addOnIm')
        pubSub.on('onconnect', this.onconnect);
        // pubSub.on('onupdatesession', this.onUpdateSession);
        // pubSub.on('onsessions', this.onSessions);
        pubSub.on('onfriends', this.onfriends);
        // pubSub.on('onsyncfriendaction', this.onSyncFriendAction);
        // pubSub.on('onAppFriend', this.onAppFriend);
        // pubSub.on('onAppMember', this.onAppMember);
        
        pubSub.on('onmsg', this.onmsg); 
        pubSub.on('ondisconnect', this.ondisconnect); 
        pubSub.on('onerror', this.onerror); 
        pubSub.on('onwillreconnect', this.onwillreconnect); 
        pubSub.on('onsyncdone', this.onsyncdone); 
        pubSub.on('onroamingmsgs', this.onroamingmsgs); 
        pubSub.on('onofflinemsgs', this.onofflinemsgs);
    },
    removeOnIm() {
        // pubSub.remove('onconnect', this.onconnect);
        // pubSub.remove('onupdatesession', this.onUpdateSession);
        // pubSub.remove('onsessions', this.onSessions);
        // pubSub.remove('onfriends', this.onFriends);
        // pubSub.remove('onsyncfriendaction', this.onSyncFriendAction);
        // pubSub.remove('onAppFriend', this.onAppFriend);
        // pubSub.remove('onAppMember', this.onAppMember);
    },

    ///====================
    onmsg(msg) {
        console.log('收到消息', msg.scene, msg.type, msg);
        app.pushMsg(msg)
        pubSub.emit('getNewList')
        // this.setData({})
        // switch (msg.type) {
        //     case 'custom':
        //         onCustomMsg(msg);
        //         break;
        //     case 'notification':
        //         // 处理群通知消息
        //         onTeamNotificationMsg(msg);
        //         break;
        //         // 其它case
        //     default:
        //         break;
        // }
    },



    oncustommsg(msg) {
        // 处理自定义消息
    },

    onofflinemsgs(data) {
        app.pushMsg(data.msgs)
        console.log('onofflinemsgs', data)
    },

    onroamingmsgs(data) {
        app.pushMsg(data.msgs)
        console.log('onroamingmsgs', data)
    },

    onfriends(obj) {
        console.log('onFriends', obj);
        this.setData({
            list: obj
        })
    },

    onsyncdone() {
        console.log('同步完成');
    },

    onconnect(e) {
        console.log('连接成功', e);
    },

    onwillreconnect(obj) {
        // 此时说明 SDK 已经断开连接, 请开发者在界面上提示用户连接已断开, 而且正在重新建立连接
        console.log('即将重连');
        console.log(obj.retryCount);
        console.log(obj.duration);
    },

    ondisconnect(error) {
        // 此时说明 SDK 处于断开状态, 开发者此时应该根据错误码提示相应的错误信息, 并且跳转到登录页面
        console.log('丢失连接');
        console.log(error);
        if (error) {
            switch (error.code) {
                // 账号或者密码错误, 请跳转到登录页面并提示错误

                case 302:
                    wx.showToast({
                        title: '账号或者密码错误',
                        content: '账号或者密码错误'
                    })
                    break;
                    // 重复登录, 已经在其它端登录了, 请跳转到登录页面并提示错误
                case 417:
                    wx.showToast({
                        title: '重复登录, 已经在其它端登录了',
                    })
                    break;
                    // 被踢, 请提示错误后跳转到登录页面
                case 'kicked':
                    wx.showToast({
                        title: '被踢',
                    })
                    break;
                default:
                    break;
            }
        }
    },

    onerror(error) {
        console.log(error);
    },
    ///=========================
    accountInput(e) {
        this.setData({
            account: e.detail.value
        })
    },
    psInput(e) {
        this.setData({
            ps: e.detail.value
        })
    },



    addFriend() {
        let _this = this;
        let ps = this.data.ps;
        let account = this.data.account;
        app.globalData.nim.addFriend({
            account: account,
            ps: ps,
            done: addFriendDone
        });

        function addFriendDone(error, obj) {
            console.log(error);
            console.log(obj);
            console.log('直接加为好友' + (!error ? '成功' : '失败'));
            if (!error) {
                onAddFriend(obj.friend);
            }
        }

        function onAddFriend(e) {
            console.log(e)
            _this.data.list.push(e);
            let list = _this.data.list;
            _this.setData({
                list: list
            })
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