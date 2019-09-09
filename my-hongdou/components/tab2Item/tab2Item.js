// components/tab2Item/tab2Item.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        list: {
            type: Array,
            value: [1, 2, 3]
        },
    },

    /**
     * 组件的初始数据
     */
    data: {

    },

    /**
     * 组件的方法列表
     */
    methods: {
        goInVideo(e) {
            console.log(e.currentTarget.dataset.id)
            var id = e.currentTarget.dataset.id;
            wx.navigateTo({
                url: '../../pages/video/video?id='+id,
            })
        }
    }
})