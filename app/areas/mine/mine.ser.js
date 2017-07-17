/**
 *
 */

var serv = module.exports = {};
serv.name = 'areas.mine-service';
serv.model = 'areas.mineService';
var naitiveApi = require('../../common/nativeApiSer');
angular
    .module(serv.name, [
        naitiveApi.name
    ])
    .factory(serv.model, [
        'Global','$http','$q',naitiveApi.model,
        function (Global,$http,$q,naitiveApi) {
            return {
                //用户进入我的会议室

            }
        }
    ]);