var paySuccessSer = require('./paySuccessSer');
var paySuccess = module.exports = {};

paySuccess.name = 'areas.main.paySuccess';
paySuccess.ctrlName = 'areas.main.paySuccessController';
	
angular.module(paySuccess.name,[
	paySuccessSer.name
]).controller(paySuccess.ctrlName,[
    '$scope',
    '$stateParams',
    paySuccessSer.model,
    '$state',
    function ($scope,$stateParams,paySuccessSer,$state) {
        var data = $scope.data = {};
        var actions = $scope.actions = {};
        data.params = $stateParams;
        //注册返回事件
        dxtApp.onBackPressed(function(res){
            $state.go("main.meetingIndex");
            dxtApp.onBackPressed(function (res) {
                dxtApp.backToDxt();
            })
        })

        // 查询账户信息
        paySuccessSer.getAccountInfo().then(function (res) {
            if(res.code == 0){
                //剩余时间
                data.remainTime = res.data.remainTime;
            }
        })

        actions.goIndex = function(){
        	$state.go("main.meetingIndex");
        }
        actions.goCombo = function(){
            $state.go("main.payCombo");
        }
    }
])