/**
 * @desc : 支付方式选择
 * @author : liangbijie
 */

var serv = module.exports = {};
serv.name = 'areas.main.payWayService';
serv.model = 'payWayService';
var naitiveApi = require('../../../common/nativeApiSer');
angular
    .module(serv.name, [
        naitiveApi.name
    ])
    .factory(serv.model, [
        'Global','$http','$q',naitiveApi.model,
        function (Global,$http,$q,naitiveApi) {
            return {
                // 请求支付订单
                // {
                //     code：[0|28|999]
                //     msg：[成功|失败|服务器内部错误]
                //     data: {
                //         orderNum: 订单号
                // notifyUrl: 通知回调url
                // }
                // }
                generateOrder:function(id){
                    var openId = naitiveApi.getOpenId();
                    var path = Global.serverPath + '/cloudpServer/v1/pay/generateOrder?openId='+openId+"&packageId="+id;
                    return $http.post(path)
                        .then(function (res) {
                            return $q.resolve(res.data);
                        });
                }
            }
        }
    ]);
