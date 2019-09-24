// pages/userSuggest/userSuggest.js
const app = getApp();
// import API_CONFIG from '../../config/apiConfig.js'
// import { checkPhone } from '../../utils/util'
// import http from '../../utils/http'
let that;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        imgSrc: app.globalData.imgSrc,
        userInfo: {},
        text: '',//问题反馈
        phone: '',//电话号码
        qnToken: '',
        baseUrl: "https://pic.lyy18.cn/",
        count: 3,//最多选择多少张图片
        detailPics: [],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function () {
        that=this;
        wx.hideShareMenu();
        //this.getQnToken();
        this.setData({
            userInfo: app.globalData.userInfo
        });
    },
    textAreaBlur(e) {
        this.setData({
            text: e.detail.value
        });
    },
    phoneInput(e) {
        this.setData({
            phone: e.detail.value
        });
    },
    submitSuggest() {
        //提交意见反馈
        let text = this.data.text;
        let phone = this.data.phone;
        // if (!text) {
        //     this.checkToast('请输入您要反馈的内容');
        //     return;
        // }
        // if (!phone) {
        //     this.checkToast('请输入您的联系方式');
        //     return;
        // }
        // if (!checkPhone(phone)) {
        //     this.checkToast('请输入正确的手机号');
        //     return;
        // }
        wx.showLoading({
            title: '请稍候'
        })
        let postData = {
            uid: app.globalData.userInfo.uid,
            ticket: app.globalData.ticket,
            contact: this.data.phone,
            feedbackDesc: this.data.text
        };
        if (this.data.detailPics.length == 1) {
            postData.img = this.data.detailPics[0];
        }
        if (this.data.detailPics.length == 2) {
            postData.img = this.data.detailPics[0];
            postData.img1 = this.data.detailPics[1];
        }
        if (this.data.detailPics.length == 3) {
            postData.img = this.data.detailPics[0];
            postData.img1 = this.data.detailPics[1];
            postData.img2 = this.data.detailPics[2];
        }
        http({
            url: API_CONFIG.USER_FEEDBACK,
            data: postData,
            method: 'POST'
        }).then((res) => {
            wx.hideLoading();
            if (res.data.code === 200) {
                console.log('res', res);
                wx.showToast({
                    title: '提交成功',
                    icon: 'none',
                    duration: 2000
                })
                this.setData({
                    text: '',
                    phone: '',
                    detailPics: []
                });
            } else {
                wx.showToast({
                    title: res.data.message,
                    icon: 'none',
                    duration: 2000
                })
            }
        }).catch(err => {
            console.log(err);
        })
    },
    checkToast(text) {
        wx.showToast({
            title: text || '操作成功',
            icon: 'none',
            duration: 2000
        })
    },
    chooseImageUpload() {
        let pics = [];
        let detailPics = this.data.detailPics;
        if (detailPics.length >= this.data.count) {
            wx.showToast({
                title: '最多选择' + this.data.count + '张！',
                icon: 'none'
            })
            return;
        }
        let count = Number(this.data.count) - Number(this.data.detailPics.length)
        wx.chooseImage({
            count: count,
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
            success: (res) => {
                console.log('resChoose', res);
                for (let item of res.tempFiles) {
                    if (item.size > 2 * 1024 * 1024) {
                        wx.showToast({
                            title: '请选择2M以内的图片！',
                            icon: 'none'
                        })
                    }
                }
                let imgs = res.tempFilePaths;
                // this.setData({
                //     detailPics:imgs
                // })
                for (let i = 0; i < imgs.length; i++) {
                    pics.push(imgs[i])
                }
                wx.showLoading({
                    title: '上传中',
                })
                this.uploadSubmit({
                    path: pics
                });
                console.log(pics)
            },
            fail: () => {
                wx.showToast({
                  title: '图片上传失败',
                  icon: 'none'
                })
            }
        })
    },
    uploadSubmit(data) {
        let token = this.data.qnToken;
        let i = data.i ? data.i : 0,
            success = data.success ? data.success : 0,
            fail = data.fail ? data.fail : 0;
        wx.uploadFile({
            url: 'https://upload-z1.qiniup.com',
            name: 'file',
            filePath: data.path[i],
            header: {
                "Content-Type": "multipart/form-data"
            },
            formData: {
                token: token,
            },
            success: (res) => {
                let picName = this.data.baseUrl + JSON.parse(res.data).key;
                let detailPics = this.data.detailPics;
                detailPics.push(picName);
                this.setData({
                    detailPics: detailPics
                })
            },
            complete: () => {
                i++;
                if (i == data.path.length) { //当图片传完时，停止调用     
                    wx.hideLoading();
                } else { //若图片还没有传完，则继续调用函数
                    data.i = i;
                    data.success = success;
                    data.fail = fail;
                    this.uploadSubmit(data);//递归，回调自己
                }
            },
            fail: (res) => {
                wx.showToast({
                    title: '图片上传失败',
                    icon: 'none'
                })
            }
        })
    },
    delImg(e) {
        //删除图片
        console.log('e', e);
        let { index } = e.currentTarget.dataset;
        let detailPics = this.data.detailPics;
        detailPics.splice(index, 1);
        this.setData({
            detailPics: detailPics
        })
    },
    getQnToken() {
        http({
            url: API_CONFIG.USER_QNTOKEN,
            data: {
                uid: app.globalData.userInfo.uid,
                ticket: app.globalData.ticket
            },
        }).then((res) => {
            if (res.data.code == 200) {
                this.setData({
                    qnToken: res.data.data
                });

            }
        }).catch(err => {
            console.log(err);
        })
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