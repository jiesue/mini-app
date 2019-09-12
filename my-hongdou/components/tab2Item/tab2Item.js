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
    create(){
        console.log('tab2-create')
    },
    attached(){
        console.log('tab2-attached')
    },
    /**
     * 组件的方法列表
     */
    methods: {
        goInVideo(e) {
            console.log(e.currentTarget.dataset.id)
            var id = e.currentTarget.dataset.id;
            wx.navigateTo({
                url: '../../pages/video/video?id=' + id,
            })
        }
    }
})