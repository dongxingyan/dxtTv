/**
 * Created by Administrator on 2017/7/3.
 */

var serv = require('./demoSer');
var demo = module.exports = {};
var naitiveApi = require('../../../common/nativeApiSer');
demo.name="areas.main.demo";
demo.ctrlName = '_' + Date.now() + Math.random() + 'Controller';
// demo.ModalCtrlName = '_' + Date.now() + Math.random() + 'Controller';
// demo.SuccessCtrlName = '_' + Date.now() + Math.random() + 'Controller';
// demo.BindingCtrlName = '_' + Date.now() + Math.random() + 'Controller';

angular.module(demo.name,[])
.controller(demo.ctrlName,[
    '$scope',
    serv.model,
    naitiveApi.model,
    '$uibModal',
    '$q',
    'session',
    '$state',
    function ($scope, model,nativeModel, $uibModal, $q,session, $state) {


    }
])