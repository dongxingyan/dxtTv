/**
 * Created by Administrator on 2017/7/3.
 */
var serv = module.exports = {};
serv.name = 'areas.main.myRoomService';
serv.model = 'mainMyRoomService';
var naitiveApi = require('../../../common/nativeApiSer');
angular
    .module(serv.name, [
        naitiveApi.name
    ])
    .factory(serv.model, [
        'Global','$http','$q',naitiveApi.model,
        function (Global,$http,$q,naitiveApi) {
            return {
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
                },
                getMeetingRoomInfo: function () {
                    var path = Global.serverPath + '/cloudpServer/v1/mmr/getmeetingRoomInfo';
                    var openId = naitiveApi.getOpenId();
                    Global.openId = openId;
                    var params = {
                        openId : Global.openId
                    }
                    return $http.get(path, { params: params  })
                        .then(function (res) {
                            return $q.resolve(res.data);
                        });
                },
                getAccountInfo: function () {
                    var path = Global.serverPath + '/cloudpServer/v1/mmr/getAccountInfo';
                    var params = {
                        openId : naitiveApi.getOpenId()
                    }
                    return $http.get(path, { params: params  })
                        .then(function (res) {
                            return $q.resolve(res.data);
                        });
                },

            }
        }
    ]);