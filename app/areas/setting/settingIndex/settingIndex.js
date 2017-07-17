/**
 * Created by Administrator on 2017/7/4.
 */
var settingIndexSer = require('./settingIndexSer');
var settingIndex = module.exports = {};
// var naitiveApi = require('../../../common/nativeApiSer');

settingIndex.name = 'areas.setting.settingIndex';
settingIndex.ctrlName = 'areas.setting.settingIndexController';
// demo.ModalCtrlName = '_' + Date.now() + Math.random() + 'Controller';
// demo.SuccessCtrlName = '_' + Date.now() + Math.random() + 'Controller';
settingIndex.BindingCtrlName = '_' + Date.now() + Math.random() + 'Controller';

angular.module(settingIndex.name, [
    settingIndexSer.name
])
    .controller(settingIndex.ctrlName, [
        '$scope',
        settingIndexSer.model,
        '$uibModal',
        '$q',
        'session',
        '$state',
        function ($scope, model, $uibModal, $q, session, $state) {
            var data = $scope.data = {};
            var actions = $scope.actions = {};

            dxtApp.onBackPressed(function(res){
                dxtApp.backToDxt()
            })

            //我的购买
            actions.buy=function(){
                // $state.go("setting.myPurchase")
                dxtApp.goPage({
                    url:"http://dxttv-dev.cloudp.cc/#!/setting/myPurchase",
                    title:"帮助信息",
                    isCross:true,
                },function(res){
                })
            }

            //修改密码
            actions.changePassword=function(){
                // $state.go("setting.changePassword");
                dxtApp.goPage({
                    url:"http://dxttv-dev.cloudp.cc/#!/setting/changePassword",
                    title:"修改密码",
                    isCross:false,
                },function(res){

                })
            }
            //联系客服
            actions.callService=function () {
                // oneMessageModal = $uibModal.open({
                //     templateUrl: 'setting-call-service.html',
                //     controller: settingIndex.BindingCtrlName,
                //     resolve: {
                //         createBindingData: function () {
                //
                //         }
                //     }
                //
                // });
                dxtApp.dialDxt({
                    cloudpId:"12345",
                    video_status:true},function(res){
                })
            }

        //    关于我们
            actions.aboutUs=function(){
                // $state.go("setting.aboutUs");
                dxtApp.goPage({
                    url:"http://dxttv-dev.cloudp.cc/#!/setting/aboutUs",
                    title:"关于我们",
                    isCross:true,

                },function(res){

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

        }])
    .controller(settingIndex.BindingCtrlName, [
        '$scope',
        'createBindingData',
        '$uibModalInstance',
        '$state',
        'session',
        function ($scope, createBindingData, $uibModalInstance, $state,session) {
            var data=$scope.data = {};
            var actions=$scope.actions = {};

        }
    ])