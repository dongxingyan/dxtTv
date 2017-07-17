/**
 *
 */

var serv = module.exports = {};
serv.name = 'areas.main-service';
serv.model = 'areas.mainService';
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
                login: function (channel) {
                    var path = Global.serverPath + '/cloudpServer/v1/mmr/login';
                    var params = {
                        openId:naitiveApi.getOpenId(),
                        channel:channel
                    }
                    return $http.get(path, { params: params  })
                        .then(function (res) {
                            return $q.resolve(res.data);
                        });
                }
            }
        }
    ]);