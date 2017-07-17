var myRoom= require('./myRoom/myRoom');
var mineService = require("./mine.ser.js");
var mine= module.exports = {};
mine.name = 'areas.mine';
mine.ctrlName = 'areas.mineController';

angular.module(mine.name, [
        myRoom.name,
        mineService.name
    ]).config([
        '$stateProvider',
        function ($stateProvider) {
            $stateProvider
                //我的首页
                .state('mine.myRoom', {
                    url: '/myRoom',
                    templateUrl: 'tmpls/mine/myRoom/myRoom.tmpl.html',
                    controller: myRoom.ctrlName
                })

        }
    ])
    .controller(mine.ctrlName, [
        '$scope', '$state',
        mineService.model,
        function ($scope, $state, mineService) {
            $state.go("mine.myRoom")
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
document.onkeydown = function (event) {
    console.log(event);
    document.getElementById('msger').innerHTML = event.keyCode + ' <-> ' + event.key;
}