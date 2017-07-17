/**
 * @desc : 支付成功服务
 * @author : liangbijie
 */

var serv = module.exports = {};
serv.name = 'areas.main.paySuccessService';
serv.model = 'paySuccessService';
var naitiveApi = require('../../../common/nativeApiSer');
angular
    .module(serv.name, [
        naitiveApi.name
    ])
    .factory(serv.model, [
        'Global','$http','$q',naitiveApi.model,
        function (Global,$http,$q,naitiveApi) {
            return {
                /**
                 *  @desc : 查询账户信息
                 *  @result : {
                 *        code：[0|28]
                 *        msg：[成功|失败]
                 *        data:  {
                 *           nickname: 昵称
                 *           remainTime: 剩余时间
                 *        }
                 *       }
                 * */
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
