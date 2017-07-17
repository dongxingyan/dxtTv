/**
 * Created by golde on 2016/11/8 0008.
 */

var main = require('./main/main');
var setting=require('./setting/setting');
var mine=require('./mine/mine')

var areas = module.exports = {};
areas.name = 'areas';
areas.ctrlName = '_' + Date.now() + Math.random() + 'Controller';
angular.module(areas.name, [
    main.name,
    setting.name,
    mine.name
])
    .config([
        '$stateProvider', '$urlRouterProvider',
        function ($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise('/main');
            $stateProvider
                .state('main', {
                    url: '/main',
                    templateUrl: './tmpls/main/main.tmpl.html',
                    controller: main.ctrlName
                })
                .state('setting', {
                    url: '/setting',
                    templateUrl: './tmpls/setting/setting.tmpl.html',
                    controller: setting.ctrlName
                })
                .state('mine', {
                    url: '/mine',
                    templateUrl: './tmpls/mine/mine.tmpl.html',
                    controller: mine.ctrlName
                })

        }
    ])