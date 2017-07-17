
/**
 *  @author:jipeng
 *  @date:2016.11.30
 *  @desc: 公共方法
 *
 * */


var log = require('./log');
var common = module.exports = {};
common.name = 'pa.common';
angular.module(common.name,[
    log.name
]).service('commonService',function () {

    /**
     *  取得url后端参数
     * */
    this.getUrlParams = function (name) {
            var results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(window.location.href);
            if (!results) {
                return '';
            }
            return results[1] || '';
        };


});