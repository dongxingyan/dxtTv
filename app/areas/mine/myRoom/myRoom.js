/**
 * Created by Administrator on 2017/7/3.
 */

var myRoomSer = require('./myRoomSer');
var myRoom = module.exports = {};
var naitiveApi = require('../../../common/nativeApiSer');

myRoom.name = 'areas.main.myRoom';
myRoom.ctrlName = 'areas.main.myRoomController';
// demo.ModalCtrlName = '_' + Date.now() + Math.random() + 'Controller';
// demo.SuccessCtrlName = '_' + Date.now() + Math.random() + 'Controller';
// demo.BindingCtrlName = '_' + Date.now() + Math.random() + 'Controller';

angular.module(myRoom.name,[
    myRoomSer.name,
])
.controller(myRoom.ctrlName,[
    '$scope',
    naitiveApi.model,
    myRoomSer.model,
    '$uibModal',
    '$q',
    'session',
    '$state',
    'Global',
    'meetingData',
    function ($scope,nativeModel, myRoomSer, $uibModal, $q,session, $state,Global,meetingData) {
        var data = $scope.data = {};
        var actions = $scope.actions = {};
        data.hasAvatar=false;//判断该账号是否设置头像，先显示默认头像

        dxtApp.onBackPressed(function (res) {
            console.log('返回回调', '退出webview')
            dxtApp.backToDxt();
        })
        actions.getUrlParams = function (name) {
            var results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(window.location.href);
            if (!results) {
                return '';
            }
            return results[1] || '';
        };
        //获取大麦相关信息
        setTimeout(function () {
            dxtApp.getDamyInfo(function(res){
                    console.log(res);
                data.avatar=res.avatar;
                if(data.avatar){
                    data.hasAvatar=true;
                }
                else{
                    data.hasAvatar=false;
                }
                data.avatarUrl=Global.imgPath+res.avatar;
                data.damyNum=res.damyNum;
                data.telNum=(res.telNum==""?"暂未绑定手机号":res.telNum);
                data.damyName=(res.damyName==""?res.damyNum:res.damyName);
            });
            $scope.$apply();
        },300)



        //点击退出当前账号

        // data.damyNum=session.damyNum;
        // data.telNum=session.telNum;
        actions.exit=function(){
            console.log("退出当前账号哈哈")
            dxtApp.exitAccount(function () {
            })


        }

        myRoomSer.getMeetingRoomInfo().then(function (res) {
            if (res.code == 0) {
                $scope.myMeetingRoom = res.data[res.data.length - 1];
                session.hostPassword = res.data[res.data.length - 1].hostPassword;
                session.guestPassword = res.data[res.data.length - 1].guestPassword;

                data.session = session;
                Global.meetingRoomNum = $scope.myMeetingRoom.meetingRoomNum;
                meetingData.myMeetingRoom = $scope.myMeetingRoom.meetingRoomNum;

            }
        });

        myRoomSer.getAccountInfo().then(function (res) {
            if (res.code == 0) {
                //剩余时间,用户昵称
                console.log(res)
                data.remainTime = res.data.remainTime;
                data.nickname = res.data.name;
            }
        });
        //点击进入我的房间
        actions.enterRoom=function(){

            dxtApp.goPage({
                isFullScreen:true,
            },function(){
                $scope.$apply(function () {
                    console.log("执行了页面跳转")
                    myRoomSer.login("电信通").then(function (res) {
                        if (res.code == "0") {
                            console.log('登录回调', res);
                            switch (res.data.status) {
                                case 0:
                                    $state.go('main.meetingCreate');
                                    break;
                                case 1:
                                    // $state.go('main.payWay')
                                    //$state.go('main.meetingCreate');
                                    $state.go('main.meetingIndex');
                                    // $state.go('main.payCombo');
                                    // $state.go('main.paySuccess');
                                    // $state.go('main.payCombo');
                                    // $state.go('main.payWay');
                                    break;
                                case 2:
                                    $state.go('main.meetingIndex');
                                // $state.go('main.myRoom');
                            }
                        } else {
                            //失败//
                            //
                            console.log('alert', '失败')
                        }
                    })
                })
            })



        }
        $scope.bindingKeydownleft = function ($event) {
            if ($event.keyCode == 37) {
                $event.preventDefault();
               dxtApp.pressLeftorRight({keyNum:$event.keyCode},function(res){

               })
            }

        }
        $scope.bindingKeydownright = function ($event) {
            if ($event.keyCode == 39) {
                $event.preventDefault();
                dxtApp.pressLeftorRight({keyNum:$event.keyCode},function(res){

                })
            }

        }

    }
])