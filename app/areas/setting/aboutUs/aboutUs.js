/**
 * Created by Administrator on 2017/7/6.
 */

var aboutUsSer = require('./aboutUsSer')
var aboutUs = module.exports = {};
var naitiveApi = require('../../../common/nativeApiSer');

aboutUs.name = "areas.setting.aboutUs";
aboutUs.ctrlName = "areas.setting.aboutUsController";

angular.module(aboutUs.name, [
    aboutUsSer.name,
])
    .controller(aboutUs.ctrlName, [
        "$scope",
        "$rootScope",
        "$timeout",
        naitiveApi.model,
        "$state",
        "session",
        function ($scope,$rootScope, $timeout,nativeModel, $state, session) {
            var data = $scope.data = {};
            var actions = $scope.actions = {};
            dxtApp.onBackPressed(function (res) {
                    dxtApp.backToDxt();
            })
            dxtApp.getVersion(function (res) {
                $scope.$apply(function(){
                    data.version = res.version
                })
                console.log(data.version);//有数据
            })


        }
    ])
