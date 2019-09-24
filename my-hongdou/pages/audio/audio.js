// pages/audio/audio.js
import {
    audioUrl
} from '../../config/baseUrl.js'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        poster: 'http://y.gtimg.cn/music/photo_new/T002R300x300M000003rsKF44GyaSk.jpg?max_age=2592000',
        // name: '此时此刻',
        // author: '许巍',
        src: audioUrl + '/mp3/1.mp3',
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        console.log(options.id)
        this.setData({
            src: `${audioUrl}/mp3/${parseInt(options.id) + 1}.mp3`
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function(e) {
        // 使用 wx.createAudioContext 获取 audio 上下文 context
        this.audioCtx = wx.createAudioContext('myAudio')
    },

    audioPlay: function() {
        this.audioCtx.play()
    },
    bgPlay() {
        // wx.playBackgroundAudio({
        //     dataUrl: this.data.src,
        //     title: '123',
        //     coverImgUrl: this.data.poster
        // })
        var BackgroundAudioManager  = wx.getBackgroundAudioManager();
        BackgroundAudioManager .src = this.data.src;
        setTimeout(function() {
            console.log(BackgroundAudioManager )
            BackgroundAudioManager .onStop(function() {
                console.log('000')
            })
        }, 3000)
    },
    bgStop() {
        wx.stopBackgroundAudio()
    },
    audioPause: function() {
        this.audioCtx.pause()
    },
    audio14: function() {
        this.audioCtx.seek(14)
    },
    audioStart: function() {
        this.audioCtx.seek(0)
    },
    download() {
        wx.downloadFile({
            url: this.data.src,
            filePath: 'd:',
            success(res) {
                // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容   
                console.log(res)
                wx.showToast({
                    title: '123',
                })
                if (res.statusCode === 200) {
                    wx.playVoice({
                        filePath: res.tempFilePath
                    })
                }
            }
        })
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