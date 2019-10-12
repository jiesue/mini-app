import pubSub from './js/pubSub.js';
import { appKey } from '../config/config.js';
import {
    isFun, loadScript
} from '@/js/fun.js';
window.yunxin = false;
let self = false;
let option = {};
let disconnectCallback = '';
export default class AppIm {
    constructor(param) {
        if (self) return self;
        option = param;
        self = this;
        loadScript('./NIM_Web_NIM_weixin_v6.8.0.js', this.connectIm.bind(this));
        self.disconnect = function (cb) {
            if (isFun(cb)) {
                disconnectCallback = cb;
            } else {
                disconnectCallback = '';
            };
            if (window.yunxin) {
                yunxin.disconnect();
            } else {
                isFun(cb) && cb();
                disconnectCallback = '';
            };
        };
    }
    connectIm() {
        console.log('yunxin connecting!');
        self.status = 'connecting';
        console.log(appKey,
            option.token,
            option.account)
        window.yunxin = NIM.getInstance({
            // 初始化SDk
            // debug           : true,
            appKey: appKey,
            token: option.token,
            account: option.account,
            transports: ['websocket'],
            uploadUrl: 'https://nos.netease.com',
            syncSessionUnread: true, // 同步未读数
            onconnect: this.onconnect,
            onwillreconnect: this.onwillreconnect,
            ondisconnect: this.ondisconnect,
            onerror: this.onerror,
            // 同步完成
            onsyncdone: this.onsyncdone,
            // 用户关系
            onblacklist: this.onblacklist,
            onsyncmarkinblacklist: this.onsyncmarkinblacklist,
            onmutelist: this.onmutelist,
            onsyncmarkinmutelist: this.onsyncmarkinmutelist,
            // 好友关系
            onfriends: this.onfriends,
            onsyncfriendaction: this.onsyncfriendaction,
            // // 用户名片
            onmyinfo: this.onmyinfo,
            onupdatemyinfo: this.onupdatemyinfo,
            onusers: this.onusers,
            onupdateuser: this.onupdateuser,
            // 机器人列表的回调
            onrobots: this.onrobots,
            // 群组
            onteams: this.onteams,
            onsynccreateteam: this.onsynccreateteam,
            onupdateteammember: this.onupdateteammember,
            onAddTeamMembers: this.onAddTeamMembers,
            onRemoveTeamMembers: this.onRemoveTeamMembers,
            onUpdateTeam: this.onUpdateTeam,
            onUpdateTeamManagers: this.onUpdateTeamManagers,
            onDismissTeam: this.onDismissTeam,
            onTransferTeam: this.onTransferTeam,
            onUpdateTeamMembersMute: this.onUpdateTeamMembersMute,
            shouldCountNotifyUnread: this.shouldCountNotifyUnread,
            // 会话
            onsessions: this.onsessions,
            onupdatesession: this.onupdatesession,
            // 漫游信息接收
            syncRoamingMsgs: true,
            // 消息
            onroamingmsgs: this.onroamingmsgs,
            onofflinemsgs: this.onofflinemsgs,
            onmsg: this.onmsg,
            // 系统通知
            onofflinesysmsgs: this.onofflinesysmsgs,
            onsysmsg: this.onsysmsg,
            onupdatesysmsg: this.onupdatesysmsg,
            onsysmsgunread: this.onsysmsgunread,
            onupdatesysmsgunread: this.onupdatesysmsgunread,
            onofflinecustomsysmsgs: this.onofflinecustomsysmsgs,
            oncustomsysmsg: this.oncustomsysmsg,
            // 收到广播消息
            onbroadcastmsg: this.onbroadcastmsg,
            onbroadcastmsgs: this.onbroadcastmsgs,
            // 事件订阅
            onpushevents: this.onpushevents,
        })
    }
    onconnect() {
        console.log('yunxin connected!');
        self.status = 'connected';
        Array.prototype.unshift.call(arguments, 'onconnect');
        pubSub.emit.apply(pubSub, arguments);
    }
    /**
     * 丢失连接
     */
    ondisconnect(err) {
        console.log('yunxin disconnect!', err);
        self.status = 'disconnect';
        if (isFun(disconnectCallback)) {
            setTimeout(() => {
                disconnectCallback();
                disconnectCallback = '';
            }, 20);
        };
        Array.prototype.unshift.call(arguments, 'ondisconnect');
        pubSub.emit.apply(pubSub, arguments);
    }
    /**
     * 连接出错
     */
    onerror() {
        self.status = 'disconnect';
        console.log('yunxin error!');
        console.log(arguments[0]);
        Array.prototype.unshift.call(arguments, 'onerror');
        pubSub.emit.apply(pubSub, arguments);
    }
    /** sync done之后触发
     */
    onpushevents() {
        Array.prototype.unshift.call(arguments, 'onpushevents');
        pubSub.emit.apply(pubSub, arguments);
    }
    /** 3
     * 收到黑名单列表
     */
    onblacklist() {
        Array.prototype.unshift.call(arguments, 'onblacklist');
        pubSub.emit.apply(pubSub, arguments);
    }
    /** 4
     * onmutelist
     */
    onmutelist() {
        Array.prototype.unshift.call(arguments, 'onmutelist');
        pubSub.emit.apply(pubSub, arguments);
    }
    /** 5
     * 同步好友信息，不含名片 [{account, createTime, updateTime}]
     */
    onfriends() {
        let friend = arguments[0];
        console.log(friend, "friend");
        Array.prototype.unshift.call(arguments, 'onfriends');
        pubSub.emit.apply(pubSub, arguments);
    }
    /** 6
     * 个人名片：存储个人信息到全局数据
     */
    onmyinfo() {
        Array.prototype.unshift.call(arguments, 'onmyinfo');
        pubSub.emit.apply(pubSub, arguments);
    }
    /** 7
     * 包含名片的好友信息（可能某些字段不全），
     */
    onusers() {
        Array.prototype.unshift.call(arguments, 'onusers');
        pubSub.emit.apply(pubSub, arguments);
    }
    /** 8 同步群列表
     * onteams
     */
    onteams() {
        Array.prototype.unshift.call(arguments, 'onteams');
        pubSub.emit.apply(pubSub, arguments);
    }
    /** 9
     * onsyncdone,同步完成
     */
    onsyncdone() {
        Array.prototype.unshift.call(arguments, 'onsyncdone');
        pubSub.emit.apply(pubSub, arguments);
    }
    /**会话
     * [ {id:"p2p-liuxuanlin",lastMsg:{from:'wujie',text:'222',to:"liuxuanlin"}} ]
     */
    onsessions() {
        //Safari调不起来，以后需做处理
        console.log(arguments[0], '聊天列表');
        Array.prototype.unshift.call(arguments, 'onsessions');
        pubSub.emit.apply(pubSub, arguments);
    }
    /**
     * 会话更新：收到消息、发送消息、设置当前会话、重置会话未读数 触发
     * {id:'p2p-zys2',lastMsg:{},scene,to,unread,updateTime}
     * {id:'team-1389946935',lastMsg:{attach:{accounts,team},type,users},scene,to,from,type,unread,updateTime}
     */
    onupdatesession() {
        Array.prototype.unshift.call(arguments, 'onupdatesession');
        pubSub.emit.apply(pubSub, arguments);
    }
    /**
     * 收到消息
     * {cc,flow:"in",from,fromClientType:"Web",fromDeviceId,fromNick,idClient,idServer:"9680840912",isHistoryable:true,isLocal,isMuted, isOfflinable,isPushable,isRoamingable,isSyncable,isUnreadable,needPushNick,resend,scene:"p2p",sessionId:"p2p-zys2",status:"success",target:"zys2",text:"[呕吐]",time,to:"wujie",type:"text",userUpdateTime}
     */
    onmsg() {
        Array.prototype.unshift.call(arguments, 'onmsg');
        pubSub.emit.apply(pubSub, arguments);
    }
    /** 操作主体为对方
     * 收到系统通知，例如 被对方删除好友、被对方添加好友、被对方撤回消息
     * {type,to,time,deletedMsgTime,deletedMsgFromNick,deletedIdServer,deletedIdClient,status,scene,opeAccount,msg:{flow,from,fromNick,idClient,scene,sessionId,target,time,to,opeAccount},idServer,from}
     * time:为删除消息时间，deletedMsgTime为删除的消息发送时间
     */
    onsysmsg() {
        Array.prototype.unshift.call(arguments, 'onsysmsg');
        pubSub.emit.apply(pubSub, arguments);
    }
    /**
     * 漫游消息：会多次收到，每次只会收到指定人的漫游消息
      // {scene:"p2p",sessionId:"p2p-cs4",timetag:1513153729257,to:"cs4",msg:[{from:'wujie',text:'222',to:'cs4'}]}
      // {scene:"team",sessionId:"team-3944051",timetag:1513153729257,to:"3944051",msg:[{from:'wujie',text:'222',to:'cs4'}]}
     */
    onroamingmsgs() {
        Array.prototype.unshift.call(arguments, 'onroamingmsgs');
        pubSub.emit.apply(pubSub, arguments);
    }

    onsyncmarkinblacklist() {
        Array.prototype.unshift.call(arguments, 'onsyncmarkinblacklist');
        pubSub.emit.apply(pubSub, arguments);
    }

    onsyncmarkinmutelist() {
        Array.prototype.unshift.call(arguments, 'onsyncmarkinmutelist');
        pubSub.emit.apply(pubSub, arguments);
    }

    onsyncfriendaction() {
        Array.prototype.unshift.call(arguments, 'onsyncfriendaction');
        pubSub.emit.apply(pubSub, arguments);
    }

    onupdatemyinfo() {
        Array.prototype.unshift.call(arguments, 'onupdatemyinfo');
        pubSub.emit.apply(pubSub, arguments);
    }

    onupdateuser() {
        Array.prototype.unshift.call(arguments, 'onupdateuser');
        pubSub.emit.apply(pubSub, arguments);
    }

    /**
     *   创建群的回调, 此方法接收一个参数, 包含群信息和群主信息
     */
    onsynccreateteam() {
        Array.prototype.unshift.call(arguments, 'onsynccreateteam');
        pubSub.emit.apply(pubSub, arguments);
    }
    /**
     *  群成员信息更新后的回调, 会传入群成员对象, 不过此时的信息是不完整的, 只会包括被更新的字段。当前登录帐号在其它端修改自己的群属性时也会收到此回调。
     */
    onupdateteammember() {
        Array.prototype.unshift.call(arguments, 'onupdateteammember');
        pubSub.emit.apply(pubSub, arguments);
    }
    /**
     *  新成员入群的回调，自己建群成功也回调
     */
    onAddTeamMembers() {
        Array.prototype.unshift.call(arguments, 'onAddTeamMembers');
        pubSub.emit.apply(pubSub, arguments);
    }
    /**
     *  有人出群的回调
     */
    onRemoveTeamMembers() {
        Array.prototype.unshift.call(arguments, 'onRemoveTeamMembers');
        pubSub.emit.apply(pubSub, arguments);
    }
    /**
     *  更新群的回调
     */
    onUpdateTeam() {
        Array.prototype.unshift.call(arguments, 'onUpdateTeam');
        pubSub.emit.apply(pubSub, arguments);
    }
    /**
     *  更新群管理员的回调
     */
    onUpdateTeamManagers() {
        Array.prototype.unshift.call(arguments, 'onUpdateTeamManagers');
        pubSub.emit.apply(pubSub, arguments);
    }
    /**
     *  解散群的回调
     */
    onDismissTeam() {
        Array.prototype.unshift.call(arguments, 'onDismissTeam');
        pubSub.emit.apply(pubSub, arguments);
    }
    /**
     *  移交群的回调
     */
    onTransferTeam() {
        Array.prototype.unshift.call(arguments, 'onTransferTeam');
        pubSub.emit.apply(pubSub, arguments);
    }
    /**
     *  更新群成员禁言状态的回调
     */
    onUpdateTeamMembersMute() {
        Array.prototype.unshift.call(arguments, 'onUpdateTeamMembersMute');
        pubSub.emit.apply(pubSub, arguments);
    }
    /**
     *  群消息通知是否加入未读数开关如果返回true，则计入未读数，否则不计入
     */
    shouldCountNotifyUnread() {
        Array.prototype.unshift.call(arguments, 'shouldCountNotifyUnread');
        pubSub.emit.apply(pubSub, arguments);
    }
    onofflinemsgs() {
        Array.prototype.unshift.call(arguments, 'onofflinemsgs');
        pubSub.emit.apply(pubSub, arguments);
    }
    // 系统通知
    onofflinesysmsgs() {
        Array.prototype.unshift.call(arguments, 'onofflinesysmsgs');
        pubSub.emit.apply(pubSub, arguments);
    }
    onupdatesysmsg() {
        Array.prototype.unshift.call(arguments, 'onupdatesysmsg');
        pubSub.emit.apply(pubSub, arguments);
    }
    onsysmsgunread() {
        Array.prototype.unshift.call(arguments, 'onsysmsgunread');
        pubSub.emit.apply(pubSub, arguments);
    }
    onupdatesysmsgunread() {
        Array.prototype.unshift.call(arguments, 'onupdatesysmsgunread');
        pubSub.emit.apply(pubSub, arguments);
    }
    onofflinecustomsysmsgs() {
        Array.prototype.unshift.call(arguments, 'onofflinecustomsysmsgs');
        pubSub.emit.apply(pubSub, arguments);
    }
    oncustomsysmsg() {
        Array.prototype.unshift.call(arguments, 'oncustomsysmsg');
        pubSub.emit.apply(pubSub, arguments);
    }
    // 收到广播消息
    onbroadcastmsg() {
        Array.prototype.unshift.call(arguments, 'onbroadcastmsg');
        pubSub.emit.apply(pubSub, arguments);
    }
    onbroadcastmsgs() {
        Array.prototype.unshift.call(arguments, 'onbroadcastmsgs');
        pubSub.emit.apply(pubSub, arguments);
    }
    /**
     * 断开重连
     */
    onwillreconnect() {
        Array.prototype.unshift.call(arguments, 'onwillreconnect');
        pubSub.emit.apply(pubSub, arguments);
    }
}
// 初始化的时候回返回一条数据，里面还有所有的未读数，未读数初始化状态不对，后面收到新的后就正确了
// 好友被删除后，再次推送过来的消息如有此人消息会报错，原因recentChat页是获取数据时是从好友列表中拿的
