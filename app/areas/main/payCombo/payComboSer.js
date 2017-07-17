/**
 * @desc : 支付套餐选择
 * @author : liangbijie
 */

var serv = module.exports = {};
serv.name = 'areas.main.payComboService';
serv.model = 'payComboService';
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
                // 请求支付订单
                // {
                //     code：[0|28|999]
                //     msg：[成功|失败|服务器内部错误]
                //     data: {
                //         orderNum: 订单号
                // notifyUrl: 通知回调url
                // }
                // }
                // generateOrder:function(packageId){
                //     var openId = naitiveApi.getOpenId();
                //     var path = Global.serverPath + '/cloudpServer/v1/pay/generateOrder?openId='+openId+"&packageId="+packageId;
                //     return $http.get(path)
                //         .then(function (res) {
                //             return $q.resolve(res.data);
                //         });
                // },
                // 查看套餐
                // {
                //     code：[0|28|999]
                //     msg：[成功|失败|服务器内部错误]
                //     data: [{
                //         price: 价格
                //         duration: 时长
                //         }
                //         …...
                //     ]
                 
                // }
                getChargingPackage:function(money,duration){
                    var openId = naitiveApi.getOpenId();
                    var path = Global.serverPath + '/cloudpServer/v1/mmr/getChargingPackage';
                    var params = {
                        openId:openId
                    }
                    return $http.get(path, { params: params  })
                        .then(function (res) {
                            // res.data =[
                            //     {
                            //         price:1,
                            //         duration: 3600
                            //     },
                            //     {
                            //         price:1,
                            //         duration: 12000
                            //     },
                            //     {
                            //         price:1,
                            //         duration: 30000
                            //     },
                            //     {
                            //         price:1,
                            //         duration: 60000
                            //     }
                            // ]
                            return $q.resolve(res.data);
                        });
                }
            }
        }
    ]);
