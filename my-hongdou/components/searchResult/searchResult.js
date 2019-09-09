// components/searchResult.js
Component({

    //一些组件选项
    options: {
        multipleSlots: true // 在组件定义时的选项中启用多slot支持
    },
    /**
     * 组件的属性列表
     *  //组件的对外属性，属性设置中可包含三个字段,type 表示属性类型、 value 表示属性初始值、 observer 表示属性值被更改时的响应函数
     */
    properties: {
        // 活动封面
        list: {
            type: Array,
            value: [1,2,3]
        },
      
    },

    /**
     * 组件的初始数据
     * //组件的内部数据，和 properties 一同用于组件的模版渲染
     */
    data: {

    },

    /**
     * 组件的方法列表
     */
    methods: {

    },
    // 组件生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: function () { },
    moved: function () { },
    detached: function () { },
})
