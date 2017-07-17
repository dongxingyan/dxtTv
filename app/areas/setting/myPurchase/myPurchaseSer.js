/**
 * Created by Administrator on 2017/7/6.
 */
var serv=module.exports={}
serv.name="areas.setting.myPurchaseService"
serv.model="myPurchaseService";
var naitiveApi = require('../../../common/nativeApiSer');

angular.module(serv.name,[
    naitiveApi.name
])
    .factory(serv.model,[
        'Global','$http','$q',naitiveApi.model,
        function(Global,$http,$q,nativeApi){
        return {
            getPayments:function(cloudpId,token,pageSize,page){
                var path = Global.serverPath1 + '/v1/open/common/'+cloudpId+'/payments';
                var params = {
                    page : page,
                    pageSize:pageSize,
                    token:token
                }
                return $http.get(path, { params: params  })
                    .then(function (res) {
                        return $q.resolve(res.data);
                    });
            }

        }
        }
    ])
