/**
 *
 *  @author:jipeng
 *  @date:2016.11.30
 *  @desc: 所有与盒子原生Native的接口
 *
 * */




var nativeApi = module.exports = {}

nativeApi.name = 'nativeApi';
nativeApi.model = 'nativeApiService';
var common = require("./common");

angular.module(nativeApi.name, [
    common.name
])
    .service(nativeApi.model, ['commonService', function (commonService) {


        /**
         *  在首页盒子会把openId放到url后面,取得openId
         * */
        this.getOpenId = function () {
            var openId = commonService.getUrlParams("openId");
            console.log("openId = " + openId);
            var location = window.location.href;
            console.log("location = " + location);
            // return "9ab236d561f64406913511b4968f8bc5123";//未激活
            //return "07e5de123ec04e0b910c2163cb162029";
            // return "6f22266938f647ef87ea41e15fa4e100";
            //return "28e4a2d458fc4480a47ace7cd00154b6"
            // return "42ead144ec3d4d309931085175efcbe9";
            console.log('已经获取到了openid－－－－', openId);
            return commonService.getUrlParams("openId");
        },
            this.getIsBindMobile = function () {
                var isBindMobile = commonService.getUrlParams("isBindMobile");
                console.log("isBindMobile是否绑定手机号", isBindMobile);
                return commonService.getUrlParams("isBindMobile");
            },
            this.damyNum = function () {
                var damyNum = commonService.getUrlParams("damy");
                console.log("获取到的大麦号")
                return commonService.getUrlParams("damy");
            },
            this.telNum = function () {
                var telNum = commonService.getUrlParams("telNum");
                console.log("获取到的大麦号")
                return commonService.getUrlParams("telNum");
            }

    }])