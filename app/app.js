var areas = require('./areas/areas');
var common = require('./common/common');
var directives = require('./directives/directives');
angular.module('app', [
    'ui.bootstrap',
    'ui.router',
    areas.name,
    common.name,
    directives.name
]).constant('Global', {
    // serverPath: 'https://api.cloudp.cc',
    //imgPath:'http://static-dxt.cloudp.cc/static'
    //serverPath1:  'https://static-dxt.cloudp.cc/cloudp'
    // openId: "abcdef",
    // domain: "",
    serverPath: 'https://api-dev.cloudp.cc',
    serverPath1: 'https://api-dxt-sit.cloudp.cc/cloudp',
    imgPath:'http://api-dxt-sit.cloudp.cc/static',//测试环境图片路径
    openId: "abcdef",
    domain: ""
}).run(['$rootScope', function ($rootScope) {
    $rootScope['root_loader'] = false;
    setTimeout(function () {
        $rootScope['root_loader'] = true;
        $rootScope.$apply();
    }, 1000)
}])

