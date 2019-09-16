var pubSub = {
    list: {},
    on: function(key,fn) {
        this.list[key] = this.list[key]||[];
        var index=this.list[key].indexOf(fn);
        if(index==-1){
            this.list[key].push(fn);
        };
    },
    emit: function(){
        var key = Array.prototype.shift.call(arguments);
        var fns = this.list[key];
        // 如果没有订阅过该消息的话，则返回
        if(!fns || fns.length === 0) {
            return;
        }
        for(var i = 0,fn; fn = fns[i++];) {
            try{                
                fn.apply(this,arguments);
            }catch(e){
                var data={
                    key:key,
                    errorMsg:e
                };
                wx.mmErrorFun=fn;
                console.error(e);
            	console.error('pubSub报错：'+JSON.stringify(data));
                console.error('在控制台打印wx.mmErrorFun查看出错的函数');
            	fns.splice(i,1);
            };
        }
    },
    remove:function(key,fn){
         var fns = this.list[key];
        // 如果key对应的消息没有订阅过的话，则返回
        if(!fns) {
            return false;
        }
        // 如果没有传入具体的回调函数，表示需要取消key对应消息的所有订阅
        if(!fn) {
            fn && (fns.length = 0);
        }else {
            for(var i = fns.length - 1; i >= 0; i--) {
                var _fn = fns[i];
                if(_fn === fn) {
                    fns.splice(i,1); // 删除订阅者的回调函数
                }
            }
        }
    },
    createNewEvent:function(obj) {
        for(var i in this) {
            obj[i] = this[i];
        }
    }
};
export default pubSub;