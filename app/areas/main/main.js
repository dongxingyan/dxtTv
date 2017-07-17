var meetingIndex = require('./meetingIndex/meetingIndex');
var meetingCreate = require('./meetingCreate/meetingCreate');
var payCombo = require('./payCombo/payCombo');
var payWay = require('./payWay/payWay');
var paySuccess = require('./paySuccess/paySuccess');
var mainService = require("./main.ser.js");
var main = module.exports = {};
main.name = 'areas.main';
main.ctrlName = 'areas.mainController';

angular.module(main.name, [
        meetingIndex.name,
        meetingCreate.name,
        mainService.name,
        payCombo.name,
        payWay.name,
        paySuccess.name
    ]).config([
        '$stateProvider',
        function ($stateProvider) {
            $stateProvider
                //我的会议室首页
                .state('main.meetingIndex', {
                    url: '/meetingIndex',
                    templateUrl: 'tmpls/main/meetingIndex/meetingIndex.tmpl.html',
                    controller: meetingIndex.ctrlName
                })
                //开通我的会议室
                .state('main.meetingCreate', {
                    url: '/meetingCreate',
                    templateUrl: 'tmpls/main/meetingCreate/meetingCreate.tmpl.html',
                    controller: meetingCreate.ctrlName
                })
                //支付成功
                .state('main.paySuccess', {
                    url: '/paySuccess/:good_title',
                    templateUrl: 'tmpls/main/paySuccess/paySuccess.tmpl.html',
                    controller: paySuccess.ctrlName
                })

                //选择支付套餐
                .state('main.payCombo', {
                    url: '/payCombo',
                    templateUrl: 'tmpls/main/payCombo/payCombo.tmpl.html',
                    controller: payCombo.ctrlName
                })
                //选择支付方式
                .state('main.payWay', {
                    url: '/payWay/:packageId/:good_title/:total_fee/:valid_period',
                    templateUrl: 'tmpls/main/payWay/payWay.tmpl.html',
                    controller: payWay.ctrlName
                })
        }
    ])
    .controller(main.ctrlName, [
        '$scope', '$state',
        mainService.model,
        function ($scope, $state, mainService) {
            var data = $scope.data = {};
            var actions = $scope.actions = {};
            console.log('返回－－－－', '退出webview');
            dxtApp.onBackPressed(function (res) {
                console.log('返回回调', '退出webview')
                dxtApp.backToDxt();
            })
            mainService.login("电信通").then(function (res) {
                if (res.code == "0") {
                    console.log('登录回调', res);
                    switch (res.data.status) {
                        case 0:
                            $state.go('main.meetingCreate');
                            break;
                        case 1:
                            //$state.go('main.meetingCreate');
                            $state.go('main.meetingIndex');
                            // $state.go('main.payCombo');
                            // $state.go('main.paySuccess');
                            // $state.go('main.payCombo');
                            // $state.go('main.payWay');
                            break;
                        case 2:
                            $state.go('main.meetingIndex');
                    }
                } else {
                    //失败//
                    //
                    console.log('alert', '失败')
                }
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
document.onkeydown = function (event) {
    console.log(event);
    document.getElementById('msger').innerHTML = event.keyCode + ' <-> ' + event.key;
}