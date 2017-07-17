var payComboSer = require('./payComboSer');

var payCombo = module.exports = {};
payCombo.name = 'areas.main.payCombo';
payCombo.ctrlName = 'areas.main.payComboController';
	
angular.module(payCombo.name,[
	payComboSer.name
]).controller(payCombo.ctrlName,[
	'$state',
    '$scope',
    payComboSer.model,
	function ($state,$scope,payComboSer) {
        var data = $scope.data = {};
        var actions = $scope.actions = {};
        //注册返回事件
        dxtApp.onBackPressed(function(res){
            $state.go("main.meetingIndex");
            dxtApp.onBackPressed(function(res){
                dxtApp.backToDxt();
            })
        })

        // 查看充值套餐
        payComboSer.getChargingPackage().then(function (res) {
            console.log('充值套餐',res);
            data.combo = res.data;
            console.log(data.combo)
            console.log(data.combo[1])
        })

        //读取剩余时间
        payComboSer.getAccountInfo().then(function (res) {
            if(res.code == 0){
                //剩余时间
                data.remainTime = res.data.remainTime;
            }
        })

        //选择对应的套餐
        actions.select = function(id,price,duration,validPeriod){
            //console.log('选择了此套餐',{price,duration});
        	$state.go("main.payWay",{
        	    packageId:id,
                good_title:duration,
                total_fee:price,
                valid_period:validPeriod
            });
        }
	}
])
    