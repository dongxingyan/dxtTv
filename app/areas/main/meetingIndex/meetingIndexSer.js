/**
 * @desc : 会议室首页服务
 * @author : jipeng@btte.net
 */

var serv = module.exports = {};
serv.name = 'areas.main.meetingIndexService';
serv.model = 'mainMeetingIndexService';
var naitiveApi = require('../../../common/nativeApiSer');
angular
    .module(serv.name, [
        naitiveApi.name
    ])
    .factory(serv.model, [
        'Global','$http','$q',naitiveApi.model,
        function (Global,$http,$q,naitiveApi) {
            return {
                /**
                 *  @desc : 查询会议室详细信息
                 *  @result : {
                 *        code：[0|28]
                 *        msg：[成功|失败]
                 *        data:  {
                 *           name: 会议室名称
                 *           hostPwd: 主持人密码
                 *           guestPwd: 参会者密码
                 *           meetingRoomNum: 会议室号
                 *        }
                 *       }
                 * */
                getMeetingRoomInfo: function () {
                    var path = Global.serverPath + '/cloudpServer/v1/mmr/getmeetingRoomInfo';
                    var params = {
                        openId : naitiveApi.getOpenId(),
                    }
                    return $http.get(path, { params: params  })
                        .then(function (res) {
                            return $q.resolve(res.data);
                        });
                },
                /**
                 *  @desc : 查询账户信息
                 *  @result : {
                 *        code：[0|28]
                 *        msg：[成功|失败]
                 *        data:  {
                 *           nickname: 昵称
                 *           remainTime: 剩余时间
                 *        }
                 *       }
                 * */
                getAccountInfo: function () {
                    var path = Global.serverPath + '/cloudpServer/v1/mmr/getAccountInfo';
                    var params = {
                        openId : naitiveApi.getOpenId()
                    }
                    return $http.get(path, { params: params  })
                        .then(function (res) {
                            return $q.resolve(res.data);
                        });
                },

                /**
                 * @desc : 我发起的邀请记录
                 * {
                        code：[0|28|999]
                        msg：[成功|失败|服务器内部错误]
                        data: {
                            totalSize: 数据总数
                            resultList: [{
                                invitationId: 邀请ID
                                theme: 会议主题
                                startTime: 开始时间
                                endTime: 结束时间
                              }
                              ……
                            ]
                        }
                    }

                 * */
                invitationRecord :function (start, size) {
                    var path = Global.serverPath + '/cloudpServer/v1/mmr/invitationRecord';
                    var params = {
                        openId : naitiveApi.getOpenId(),
                        start : start,
                        size : size
                    }
                    return $http.get(path, { params: params  })
                        .then(function (res) {
                            if (res.data.code !== '0') {
                                return $q.reject(res.data)
                            }
                            var resultList = res.data.data.resultList;
                            for(var i = 0; i < resultList.length; i++){
                                var stemp = resultList[i].startTime.replace('-', '/')+" GMT";
                                var etemp = resultList[i].endTime.replace('-', '/')+" GMT";
                                res.data.data.resultList[i].startTime =  new Date(stemp);
                                res.data.data.resultList[i].startTime =  new Date(stemp);
                            }
                            // res.data = {
                            //     code:0,
                            //     data:{
                            //         resultList:[
                            //             {
                            //                 startTime:'2016-11-12 16:00',
                            //                 theme: '会议主题一会议主题一会议主题一会议主题一会议主题一'
                            //             },
                            //             {
                            //                 startTime:'2016-11-12 16:00',
                            //                 theme: '会议主题二'
                            //             },
                            //             {
                            //                 startTime:'2016-11-12 16:00',
                            //                 theme: '会议主题三'
                            //             },
                            //             {
                            //                 startTime:'2016-11-12 16:00',
                            //                 theme: '会议主题四'
                            //             },
                            //             {
                            //                 startTime:'2016-11-12 16:00',
                            //                 theme: '会议主题四'
                            //             },
                            //             {
                            //                 startTime:'2016-11-12 16:00',
                            //                 theme: '会议主题四'
                            //             },
                            //             {
                            //                 startTime:'2016-11-12 16:00',
                            //                 theme: '会议主题四'
                            //             }
                            //         ]
                            //     }
                            // }
                            return $q.resolve(res.data);
                        });
                },


                // 详 细参数：
                // openId: 第三方用户ID
                // 请求体：
                // guestPwd: 参会者密码
                // meetingRoomNum: 会议室号
                // 返回值类型 : JSON
                // 详  细
                // {
                //     code：[0|28]
                //     msg：[成功|失败]
                // }
                editMeetingRoom: function (params) {
                    var openId = naitiveApi.getOpenId();
                    var path = Global.serverPath + '/cloudpServer/v1/mmr/editMeetingRoom?openId='+openId;
                    var params = params;
                    params.guestPassword = parseInt(params.guestPassword);
                    return $http({
                            method:'PUT',
                            url:path,
                            data: params
                        })
                        .then(function (res) {
                            return $q.resolve(res.data);
                        });
                },

            }
        }
    ]);
