var serv = require('./meetingCreateSer');
var meetingCreate = module.exports = {};
var naitiveApi = require('../../../common/nativeApiSer');

meetingCreate.name = 'areas.main.meetingCreate';
meetingCreate.ctrlName = '_' + Date.now() + Math.random() + 'Controller';
// meetingCreate.ModalCtrlName = '_' + Date.now() + Math.random() + 'Controller';
meetingCreate.SuccessCtrlName = '_' + Date.now() + Math.random() + 'Controller';
meetingCreate.BindingCtrlName = '_' + Date.now() + Math.random() + 'Controller';

angular.module(meetingCreate.name, [serv.name])
    .service('session', function () {

    })
    .controller(meetingCreate.ctrlName, [
        '$scope',
        serv.model,
        naitiveApi.model,
        '$uibModal',
        '$q',
        'session',
        '$state',
        function ($scope, model,nativeModel, $uibModal, $q,session, $state) {
            var data = $scope.data = {};
            var actions = $scope.actions = {};
            if(nativeModel.getIsBindMobile()==0){
                session.isBindMobile=false
            }
            else{
                session.isBindMobile=true;
            }
            session.isBindMobile
            data.session=session;
            console.log(session.isBindMobile+"hdohf"+session.isCreatMeeting)
            //
            //注册返回事件
            dxtApp.onBackPressed(function (res) {
                console.log('返回回调', '退出webview')
                    dxtApp.backToDxt();
            })
            // actions.creatmeeting = function () {
            //     if (data.isCreatMeeting) return;
            //     data.isCreatMeeting = true;
            //     oneMessageModal = $uibModal.open({
            //         templateUrl: 'meeting-create-success.html',
            //         controller: meetingCreate.ModalCtrlName,
            //         resolve: {
            //             createSuccessData: function () {
            //                 var deferred = $q.defer();
            //                 model.createMeetingRoom(function (res) {
            //                     data.isCreatMeeting = false;
            //                     if (res.code == 0) {
            //                         $scope.data.createTip = '';
            //                         deferred.resolve(res.data);
            //                     } else {
            //                         $scope.data.createTip = res.message;
            //                     }
            //                 })
            //                 return deferred.promise;
            //             }
            //         }
            //     });
            // }

            $scope.actions.creatmeeting = function () {
                console.log(session.isBindMobile, session.isCreatMeeting + "shifou ")
                console.log(nativeModel.getIsBindMobile(),"点击时显示是否绑定")
                if (session.isBindMobile) {
                    console.log("已经绑定了手机号")
                    if (session.isCreatMeeting) return;
                    session.isCreatMeeting = true;
                    oneMessageModal = $uibModal.open({
                        templateUrl: 'meeting-create-success.html',
                        controller: meetingCreate.SuccessCtrlName,
                        resolve: {
                            createSuccessData: function () {
                                var deferred = $q.defer();
                                model.createMeetingRoom(function (res) {
                                    session.isCreatMeeting = false;
                                    if (res.code == 0) {
                                        $scope.data.createTip = '';
                                        deferred.resolve(res.data);
                                    } else {
                                        $scope.data.createTip = res.message;
                                    }
                                })
                                return deferred.promise;
                            }
                        }
                    });
                }
                else {
                    console.log("没有绑定手机号")
                    oneMessageModal = $uibModal.open({
                        templateUrl: 'meeting-create-binding.html',
                        controller: meetingCreate.BindingCtrlName,
                        resolve: {
                            createBindingData: function () {

                            }
                        }

                    });
                }
            }
        }
    ])
    // .controller(meetingCreate.ModalCtrlName, [
    //     '$scope',
    //     'createSuccessData',
    //     '$uibModalInstance',
    //     '$state',
    //     function ($scope, createSuccessData, $uibModalInstance, $state) {
    //         $scope.data = {};
    //         $scope.actions = {};
    //         $scope.data.meetingRoomNum = createSuccessData.meetingRoomNum;
    //         //秒转化为小时
    //         $scope.data.remainTime = Math.round(createSuccessData.remainTime / 60);
    //         console.log('返回－－－－', '$state.go("main.meetingIndex")');
    //         setTimeout(function () {
    //             $("button#meetingCreateConfirm").focus();
    //         }, 300)
    //         dxtApp.onBackPressed(function (res) {
    //             console.log('返回回调', '$state.go("main.meetingIndex")')
    //             $uibModalInstance.close('confirm');
    //             $state.go("main.meetingIndex")
    //         })
    //
    //         $scope.actions.confirm = function () {
    //             //确认按钮事件
    //             alert("haha")
    //             $uibModalInstance.close('confirm');
    //             $state.go('main.meetingIndex');
    //         }
    //         $scope.actions.handleOkBtnKeydown = function ($event) {
    //             if ($event.keyCode >= 37 && $event.keyCode <= 40) {
    //                 $event.preventDefault();
    //                 $event.target.focus();
    //             }
    //         }
    //     }])

    .controller(meetingCreate.SuccessCtrlName, [
        '$scope',
        'createSuccessData',
        '$uibModalInstance',
        '$state',
        function ($scope, createSuccessData, $uibModalInstance, $state) {
            $scope.data = {};
            $scope.actions = {};
            $scope.data.meetingRoomNum = createSuccessData.meetingRoomNum;
            //秒转化为小时
            $scope.data.remainTime = Math.round(createSuccessData.remainTime / 60);
            console.log('返回－－－－', '$state.go("main.meetingIndex")');
            setTimeout(function () {
                $("button#meetingCreateConfirm").focus();
            }, 100)
            dxtApp.onBackPressed(function (res) {
                console.log('返回回调', '$state.go("main.meetingIndex")')
                $uibModalInstance.close('confirm');
                dxtApp.onBackPressed(function (res) {
                    dxtApp.backToDxt()
                })
            })
            $scope.actions.confirm = function () {
                //确认按钮事件
                $uibModalInstance.close('confirm');
                $state.go('main.meetingIndex');
            }
            $scope.actions.handleOkBtnKeydown = function ($event) {
                if ($event.keyCode >= 37 && $event.keyCode <= 40) {
                    $event.preventDefault();
                    $event.target.focus();
                }
            }
        }])


    .controller(meetingCreate.BindingCtrlName, [
        '$scope',
        'createBindingData',
        '$uibModalInstance',
        '$state',
        'session',
        function ($scope, createBindingData, $uibModalInstance, $state,session) {
            $scope.data = {};
            $scope.actions = {};
            dxtApp.onBackPressed(function (res) {
                console.log('返回回调,在弹框页面按返回', '$state.go("main.meetingCreate")')
                $uibModalInstance.close('binding');
                $state.go("main.meetingCreate")
                dxtApp.onBackPressed(function(res){
                    dxtApp.backToDxt();
                })
            })

            $scope.actions.cancel = function () {
                $uibModalInstance.close('cancel');
                //注册返回事件
                dxtApp.onBackPressed(function (res) {
                    console.log('返回回调，点击取消之后', '退出webview')
                    $state.go("main.meetingCreate")
                    dxtApp.onBackPressed(function(res){
                        $uibModalInstance.close('binding');
                        dxtApp.backToDxt();
                    })

                })
            }

            $scope.actions.binding = function () {
                //返回事件
                dxtApp.onBackPressed(function (res) {
                    $state.go("main.meetingCreate")
                    dxtApp.onBackPressed(function (res) {
                        $uibModalInstance.close('binding');
                        dxtApp.onBackPressed(function(res){
                            dxtApp.backToDxt();
                        })
                    })
                })
                dxtApp.bindMobile(function (res) {
                    console.debug(res);
                    if (res.resultCode === "0") {
                        session.isBindMobile = true;
                        $uibModalInstance.close('binding');
                    }
                })

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
            $scope.bindingKeydown = function ($event) {
                if ($event.keyCode == 37 || $event.keyCode == 39) {
                    $event.preventDefault();
                    $('button.pwd-cancel').focus();
                }
                if ($event.keyCode == 38 || $event.keyCode == 40) {
                    $event.preventDefault();
                }
            }
        }])
