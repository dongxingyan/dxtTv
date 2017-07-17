/**
 * Created by Administrator on 2017/7/4.
 */
var serv = module.exports = {};
serv.name = 'areas.setting.settingIndexService';
serv.model = 'settingSettingIndexService';
var naitiveApi = require('../../../common/nativeApiSer');
angular
    .module(serv.name, [
        naitiveApi.name
    ])
    .factory(serv.model, [
        'Global','$http','$q',naitiveApi.model,
        function (Global,$http,$q,naitiveApi) {
            return {


            }
        }
    ]);