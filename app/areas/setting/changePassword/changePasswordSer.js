/**
 * Created by Administrator on 2017/7/7.
 */

var serv=module.exports={}
serv.name="areas.setting.changePasswordService";
serv.model="changePasswordService";
var naitiveApi = require('../../../common/nativeApiSer');

angular.module(serv.name,[
    naitiveApi.name
])
    .factory(serv.model,[
        'Global','$http','$q',naitiveApi.model,
        function(Global,$http,$q,nativeApi){
            return {

            }
        }
    ])