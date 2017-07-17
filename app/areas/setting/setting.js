//设置首页
var settingIndex = require('./settingIndex/settingIndex');
//我的购买页面
var myPurchase=require('./myPurchase/myPurchase')

//修改密码页面
var changePassword=require('./changePassword/changePassword')


//关于我们页面
var aboutUs=require('./aboutUs/aboutUs')
var settingService = require("./setting.ser.js");

var setting = module.exports = {};
setting.name = 'areas.setting';
setting.ctrlName = 'areas.settingController';

angular.module(setting.name, [
    settingIndex.name,
    myPurchase.name,
    changePassword.name,
    aboutUs.name,
    settingService.name
]).config([
    '$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {
        // $urlRouterProvider.otherwise('/settingIndex');
        $stateProvider
        //设置首页
            .state('setting.settingIndex', {
                url: '/settingIndex',
                templateUrl: 'tmpls/setting/settingIndex/settingIndex.tmpl.html',
                controller: settingIndex.ctrlName
            })
            .state('setting.myPurchase', {
                url: '/myPurchase',
                templateUrl: 'tmpls/setting/myPurchase/myPurchase.tmpl.html',
                controller: myPurchase.ctrlName
            })
            .state('setting.changePassword', {
                url: '/changePassword',
                templateUrl: 'tmpls/setting/changePassword/changePassword.tmpl.html',
                controller: changePassword.ctrlName
            })
            .state('setting.aboutUs', {
                url: '/aboutUs',
                templateUrl: 'tmpls/setting/aboutUs/aboutUs.tmpl.html',
                controller: aboutUs.ctrlName
            })
    }
])
    .controller(setting.ctrlName, [
        '$scope', '$state',
        settingService.model,
        function ($scope, $state, settingService) {
            var data = $scope.data = {};
            var actions = $scope.actions = {};
            console.log('返回－－－－', '退出webview');
            // $state.go('setting.settingIndex');
            dxtApp.onBackPressed(function (res) {
                console.log('返回回调', '退出webview')
                dxtApp.backToDxt();
            })
        }
    ])
    .filter('priceFilter', function () {
        return function (price) {
            var result;
            try {
                result = parseFloat(price)
            } catch (e) {
                result = 0
            }
            if (!result) {
                result = 0
            }
            return Math.round(result) / 100;
        }
    })
    .filter('durationFilter', function () {
        return function (duration) {
            var result;
            try {
                result = parseFloat(duration)
            } catch (e) {
                result = ""
            }
            if (!result) {
                result = ""
            }
            return parseInt(result / 60);
        }
    })
    .filter('numberFix', function () {
        return function (number) {
            return (number < 10 && number >= 0) ? '0' + number : number + '';
        };
    })
