function getRandomColor() {
    let rgb = []
    for (let i = 0; i < 3; ++i) {
        let color = Math.floor(Math.random() * 256).toString(16)
        color = color.length == 1 ? '0' + color : color
        rgb.push(color)
    }
    return '#' + rgb.join('')
}
import {
    videoUrl
} from '../../config/baseUrl.js'
Page({
    onLoad(options) {
        console.log(options)
        this.setData({
            src: `${videoUrl}/mp4/${parseInt(options.id)+1}.mp4`
        })
    },
    onReady: function(res) {
        this.videoContext = wx.createVideoContext('myVideo')
    },
    inputValue: '',
    data: {
        src: '',
        danmuList: [{
                text: '第 1s 出现的弹幕',
                color: '#ff0000',
                time: 1
            },
            {
                text: '第 3s 出现的弹幕',
                color: '#ff00ff',
                time: 3
            }
        ]
    },
    bindInputBlur: function(e) {
        this.inputValue = e.detail.value
    },
    bindButtonTap: function() {
        var that = this
        wx.chooseVideo({
            sourceType: ['album', 'camera'],
            maxDuration: 60,
            camera: ['front', 'back'],
            success: function(res) {
                that.setData({
                    src: res.tempFilePath
                })
            }
        })
    },
    bindSendDanmu: function() {
        this.videoContext.sendDanmu({
            text: this.inputValue,
            color: getRandomColor()
        })
    },
    download() {
        const downloadTask = wx.downloadFile({
            url: this.data.src, //仅为示例，并非真实的资源
            success(res) {
                wx.playVoice({
                    filePath: res.tempFilePath
                })
            }
        })

        downloadTask.onProgressUpdate((res) => {
            console.log('下载进度', res.progress)
            console.log('已经下载的数据长度', res.totalBytesWritten)
            console.log('预期需要下载的数据总长度', res.totalBytesExpectedToWrite)
        })

        downloadTask.abort() // 取消下载任务

    },
})