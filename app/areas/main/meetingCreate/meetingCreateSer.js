/**
 *
 *
 */

var serv = module.exports = {};
serv.name = 'areas.main.meetingCreateSer';
serv.model = Date.now() + Math.random() + 'Service';
var naitiveApi = require('../../../common/nativeApiSer');
angular
    .module(serv.name, [
    	naitiveApi.name
    ])
    .factory(serv.model, [
    	'Global','$http','$q',naitiveApi.model,
        function (Global,$http,$q,naitiveApi) {
            return {
                isBindMobile:function(){
                    console.log(naitiveApi.getIsBindMobile()+"获取是否绑定手机号的方法")
                    return naitiveApi.getIsBindMobile();

                },
                createMeetingRoom: function(callback){
					var path = Global.serverPath + '/cloudpServer/v1/mmr/createMeetingRoom';
                    var params = {
                        openId : naitiveApi.getOpenId()
                    }
                    $http({
                        method: 'post',
                        url: path,
                        params: params
                    })
                        .then(function (res) {
                            if(res.data.code == 0){
                                Global.meetingRoomNum = res.data.data.meetingRoomNum;
                            }
                            callback(res.data);
                        }, function (rej) {
                            console.log(rej);
                        })
                }
            }
        }
    ]);