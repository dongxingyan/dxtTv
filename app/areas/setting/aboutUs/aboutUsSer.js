/**
 * Created by Administrator on 2017/7/6.
 */
var serv=module.exports={};
serv.name="areas.setting.aboutUsService";
serv.ctrlName="aboutUsService";
var naitiveApi = require('../../../common/nativeApiSer');

angular.module(serv.name,[
    naitiveApi.name
])
.controller(serv.ctrlName,[
    "Globe",
    "$http",
    "$q",
    naitiveApi.model,
    function (Globe,$http,$q,naitiveApi) {
    return{

    }
        
    }
])