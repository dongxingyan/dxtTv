var meetingIndexSer = require('./meetingIndexSer');
var meetingIndex = module.exports = {};

meetingIndex.name = 'areas.main.meetingIndex';
meetingIndex.ctrlName = 'areas.main.meetingIndexController';
meetingIndex.modalCtrlName = '_' + Date.now() + Math.random() + 'Controller';
meetingIndex.payLowCtrlName = '_' + Date.now() + Math.random() + 'Controller';


angular.module(meetingIndex.name, [
        meetingIndexSer.name
    ])
    .service('session', function () {

    })
    .factory('meetingData', function () {
        return {

        }
    })
    .filter('meetingTimeFilter', function () {
        function fixNum(number) {
            return (number < 10 && number >= 0) ? '0' + number : number + '';
        };
        return function (meetingTime) {
            if (meetingTime) {
                var year = meetingTime.getFullYear();
                var month = meetingTime.getMonth() + 1;
                var day = meetingTime.getDate();
                var hour = meetingTime.getHours();
                var minutes = meetingTime.getMinutes();
                var time = year + '-' + fixNum(month) + '-' + fixNum(day) + ' ' + fixNum(hour) + ':' + fixNum(minutes);
                return time
            }
        }
    })
    .controller(meetingIndex.ctrlName, [
        '$scope',
        '$uibModal',
        meetingIndexSer.model,
        'meetingData',
        '$state',
        '$timeout',
        'Global',
        'session',
        function ($scope, $uibModal, meetingIndexSer, meetingData, $state, $timeout, Global, session) {
            var data = $scope.data = {};
            var actions = $scope.actions = {};
            //注册返回事件
            console.log('返回－－－－', '退出webview');
            dxtApp.onBackPressed(function (res) {
                console.log('返回回调', '退出webview')
                dxtApp.backToDxt();
            });

            data.isshow = true;
            data.tip = '对不起';
            data.showtime = 1;

            $scope.getVmrName = function () {
                return $scope.myMeetingRoom.name ? $scope.myMeetingRoom.name : '电信通用户' + Global.meetingRoomNum;
            }

            //查询会议室详细信息
            meetingIndexSer.getMeetingRoomInfo().then(function (res) {
                if (res.code == 0) {
                    $scope.myMeetingRoom = res.data[res.data.length - 1];
                    session.hostPassword = res.data[res.data.length - 1].hostPassword;
                    session.guestPassword = res.data[res.data.length - 1].guestPassword;

                    data.session = session;
                    Global.meetingRoomNum = $scope.myMeetingRoom.meetingRoomNum;
                    meetingData.myMeetingRoom = $scope.myMeetingRoom.meetingRoomNum;

                }
            });
            //查询账户信息


            //时间转换
            function fixNum(number) {
                return number >= 10 ? number + '' : '0' + number;
            }
            meetingIndexSer.getAccountInfo().then(function (res) {
                if (res.code == 0) {
                    //剩余时间,用户昵称
                    data.remainTime = res.data.remainTime;
                    data.nickname = res.data.name;
                }
            });

            function parseRecord(record) {
                console.log('第一条邀请记录特殊处理', record);
                var startTime = record.startTime;
                var _timeleft = startTime.getTime() - Date.now();
                _timeleft = _timeleft > 0 ? (_timeleft + 60 * 1000) : _timeleft;
                var timeleft = {
                    hour: fixNum(Math.floor(_timeleft / 1000 / 60 / 60)),
                    second: fixNum(Math.floor((_timeleft % 3600000) / 1000 / 60))
                };
                //会议是否开始
                meetingStart = _timeleft < 0;
                return {
                    theme: record.theme,
                    hour: timeleft.hour,
                    second: timeleft.second,
                    startTime: startTime,
                    invitationId: record.invitationId,
                    show: true,
                    start: meetingStart
                }
            }



            var invitationRecords = data.invitationRecords = {
                head: {}, // 第一条邀请记录特殊处理
                list: [], // 其余的邀请记录
                total: 0, // 总数
                size: 10,
                page: 0
            };
            //我发起的邀请记录
            meetingIndexSer.invitationRecord(1, invitationRecords.size).then(function (res) {

                if (res.code == 0) {
                    //data.invitationRecords = res.data.resultList;
                    invitationRecords.total = res.data.totalSize;
                    if (res.data.resultList.length > 0) {
                        invitationRecords.head = parseRecord(res.data.resultList[0]);
                        invitationRecords.list = res.data.resultList.slice(1);

                    }
                }
                console.log('邀请记录', data.invitationRecords)
            });

            //设置会议密码
            actions.setMeeting = function () {
                if (data.setMeetingBtn == false) return;
                data.setMeetingBtn = false;
                $timeout(function () {
                    data.setMeetingBtn = true;
                }, 3000)
                /**
                 * 等200毫秒，然后锁定输入框。
                 */
                setTimeout(function () {
                    $('input.pwd-text').focus();
                }, 200);

                //调用输入密码框
                var oneMessageModal = $uibModal.open({
                    templateUrl: 'pwd-wrapper.html',
                    controller: meetingIndex.modalCtrlName,
                    resolve: {

                    }
                });


            }


            //开始会议
            actions.startMeeting = function (started) {
                if (!started) {
                    return
                }
                //检测余额是否足够
                meetingIndexSer.getAccountInfo().then(function (res) {
                    if (res.code == 0) {
                        if (data.remainTime > 0) {
                            //传入会议号,用户名,密码可以自动进入会议室
                            var joinConferencedata = {
                                nickname: data.nickname,
                                conference_no: meetingData.myMeetingRoom,
                                password: data.session.hostPassword,
                                invited_password: '',
                                domain: Global.domain,
                                microphone_status: true,
                                camera_status: true
                            }
                            console.log('开始会议参数', joinConferencedata);
                            dxtApp.joinConference({
                                    nickname: data.nickname,
                                    conference_no: meetingData.myMeetingRoom,
                                    password: data.session.hostPassword,
                                    invited_password: '',
                                    domain: Global.domain,
                                    microphone_status: true,
                                    camera_status: true
                                },

                                function (res) { //根据res.resultCode分别进行处理
                                    if(res.resultCode==="0"){
                                        $state.go("main.meetingIndex")
                                        setTimeout(function () {
                                            meetingIndexSer.getAccountInfo().then(function (res) {
                                                console.warn("退出会议：",res);
                                                if (res.code === "0") {
                                                    //剩余时间,用户昵称
                                                    data.remainTime = res.data.remainTime;
                                                    data.nickname = res.data.nickname;

                                                }
                                            });
                                        }, 300);
                                    }

                                }
                            )
                        }
                        else {
                            // 去充值
                            actions.low();
                        }

                    } else {

                    }
                })

            }

            //余额不足
            actions.low = function () {
                var oneMessageModal = $uibModal.open({
                    templateUrl: 'low-wrapper.html',
                    controller: meetingIndex.payLowCtrlName,
                    resolve: {

                    }
                });
            }

            //去充值
            actions.gotoPayCombo = function () {
                $state.go("main.payCombo");
            }

            //会议列表滚动事件
            data.left = 0;
            data.listwidth = $('.inviteList li').eq(0).width();
            actions.scroll = function ($event, $last, $first) {

                if ($event.keyCode == 39) { //right
                    //判断是否最后一个
                    if (!$last) {
                        data.left += data.listwidth;
                    }
                } else if ($event.keyCode == 37) {
                    //判断是否第一个
                    if (!$first) {
                        data.left -= data.listwidth;
                    }

                }
                console.log(data.left);
                $('.inviteList').animate({
                    scrollLeft: data.left
                }, 300)
            }
        }

    ])

    .controller(meetingIndex.modalCtrlName, [
        '$scope',
        '$uibModalInstance',
        meetingIndexSer.model,
        'meetingData',
        'session',
        "$state",
        '$timeout',
        function ($scope, $uibModalInstance, meetingIndexSer, meetingData, session,$state, $timeout) {
            var scopeData = $scope.data = {};
            scopeData.password = session.guestPassword;
            dxtApp.onBackPressed(function (res) {
                console.log('返回－－－－', '$state.go("退出webview")');
                $uibModalInstance.dismiss('cancel');
                dxtApp.onBackPressed(function (res) {
                        dxtApp.backToDxt();
                })
                console.log('返回回调', '$state.go("main.meetingIndex")');
                $uibModalInstance.close('confirm');
                $state.go("main.meetingIndex");

            })
            $scope.cancel = function () {
                //注册返回事件
                console.log('返回－－－－', '退出webview');
                $uibModalInstance.dismiss('cancel');
                dxtApp.onBackPressed(function (res) {

                    console.log('返回回调', '退出webview')
                    dxtApp.backToDxt();
                })
                //取消按钮事件

            }
            $scope.confirm = function () {

                //确认按钮事件，发送设置参会密码
                var data = {
                    guestPassword: scopeData.password,
                    meetingRoomNum: parseInt(meetingData.myMeetingRoom)
                }
                if ($scope.pwdFrom.$valid) {
                    meetingIndexSer.editMeetingRoom(data).then(function (data) {
                        var code = parseInt(data.code);
                        if (code == 0) {
                            scopeData.pwdTip = '设置成功'
                            session.guestPassword = scopeData.password;

                            $uibModalInstance.close('confirm');
                            //注册返回事件
                            console.log('返回－－－－', '退出webview');
                            dxtApp.onBackPressed(function (res) {
                                console.log('返回回调', '退出webview')
                                // $state.go('main.myRoom');
                                dxtApp.backToDxt();
                            })

                        } else {
                            scopeData.pwdTip = data.message;
                        }
                    });
                } else {
                    scopeData.pwdTip = '请输入6位数字的参会密码'
                }
            }
            $scope.inputClick = function ($event) {
                scopeData.inputpwd = $event;
                if ($event.keyCode == 38 || $event.keyCode == 39) {
                    $event.preventDefault();
                    $event.target.focus();
                } else if ($event.keyCode == 8) {
                    data.guestPassword = data.guestPassword.slice(0, -1)
                }
            }
            $scope.btnClick = function ($event) {
                if ($event.keyCode == 39 || $event.keyCode == 40) {
                    $event.preventDefault();
                    $event.target.focus();

                } else if ($event.keyCode == 38) {
                    $event.preventDefault();
                    scopeData.inputpwd.target.focus();

                }
            }
            $scope.btnClickTurn = function ($event) {
                if ($event.keyCode == 40) {
                    $event.preventDefault();
                    $event.target.focus();
                } else if ($event.keyCode == 38) {
                    $event.preventDefault();
                    scopeData.inputpwd.target.focus();

                }
            }

        }
    ])

    .controller(meetingIndex.payLowCtrlName, [
        '$scope',
        '$uibModalInstance',
        '$state',
        function ($scope, $uibModalInstance, $state) {
            console.log('返回－－－－', '$state.go("main.meetingIndex")');
            dxtApp.onBackPressed(function (res) {
                $uibModalInstance.dismiss('cancel');
                console.log('返回－－－－', '退出webview');
                dxtApp.onBackPressed(function (res) {
                    console.log('返回回调', '退出webview')
                    dxtApp.backToDxt();
                    // $state.go("mian.myRoom")
                })
                $state.go("main.meetingIndex");

            })
            $scope.cancel = function () {
                //取消按钮事件
                $uibModalInstance.dismiss('cancel');
                //注册返回事件
                console.log('返回－－－－', '退出webview');
                dxtApp.onBackPressed(function (res) {
                    console.log('返回回调', '退出webview')
                    // $state.go("main.myRoom")
                    dxtApp.backToDxt();
                })
            }
            $scope.confirm = function () {
                //注册返回事件
                console.log('返回－－－－', '退出webview');
                dxtApp.onBackPressed(function (res) {
                    console.log('返回回调', '退出webview')
                    $state.go("main.meetingIndex");
                    dxtApp.onBackPressen(function(res){
                        dxtApp.backToDxt();

                    })
                    // $state.go(main.myRoom)

                })
                $state.go("main.payCombo");
                $uibModalInstance.close('confirm');

            }
            $scope.cancelKeydown = function ($event) {
                if ($event.keyCode == 37 || $event.keyCode == 39) {
                    $event.preventDefault();
                    $('button.pwd-confirm').focus();
                }
                if ($event.keyCode == 38 || $event.keyCode == 40) {
                    $event.preventDefault();
                }
            }
            $scope.confirmKeydown = function ($event) {
                if ($event.keyCode == 37 || $event.keyCode == 39) {
                    $event.preventDefault();
                    $('button.pwd-cancel').focus();
                }
                if ($event.keyCode == 38 || $event.keyCode == 40) {
                    $event.preventDefault();
                }
            }

            $scope.btnClick = function ($event) {
                if ($event.keyCode == 39 || $event.keyCode == 40) {
                    $event.preventDefault();
                    $event.target.focus();

                } else if ($event.keyCode == 38) {
                    $event.preventDefault();
                    scopeData.inputpwd.target.focus();

                }
            }
            $scope.btnClickTurn = function ($event) {
                if ($event.keyCode == 40) {
                    $event.preventDefault();
                    $event.target.focus();
                } else if ($event.keyCode == 38) {
                    $event.preventDefault();
                    scopeData.inputpwd.target.focus();

                }
            }
        }
    ])