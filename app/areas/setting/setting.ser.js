/**
 *
 */

var serv = module.exports = {};
serv.name = 'areas.setting-service';
serv.model = 'areas.settingService';
var naitiveApi = require('../../common/nativeApiSer');
angular
    .module(serv.name, [
        naitiveApi.name
    ])
    .factory(serv.model, [
        'Global','$http','$q',naitiveApi.model,
        function (Global,$http,$q,naitiveApi) {
            return{

            }
        }
    ]);