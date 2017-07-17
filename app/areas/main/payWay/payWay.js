var payWaySer = require('./payWaySer');
var payWay = module.exports = {};

payWay.name = 'areas.main.payWay';
payWay.ctrlName = 'areas.main.payWayController';
payWay.codeBoxCtrlName = '_' + Date.now() + Math.random() + 'Controller';

angular.module(payWay.name, [
	payWaySer.name
]).controller(payWay.ctrlName, [
	'$scope',
	'$uibModal',
	'$stateParams',
	'Global',
	'$state',
	payWaySer.model,
	function ($scope, $uibModal, $stateParams, Global, $state, payWaySer) {
		var data = $scope.data = {};
		var actions = $scope.actions = {};
		actions.fixNum=function(number){
			var number=number < 10 && number >= 0 ? '0' + number : number + '';
			return number
		};
		var openId = Global.openId
		data.params = $stateParams;
		data.conference_no = Global.meetingRoomNum;
		var nowTime=new Date().getTime();
		var valid=new Date(nowTime+data.params.valid_period*24*60*60*1000);
		data.time=actions.fixNum(valid.getFullYear())+"-"+actions.fixNum(valid.getMonth()+1)+"-"+actions.fixNum(valid.getDate());
		//注册返回事件
		dxtApp.onBackPressed(function (res) {
			$state.go("main.payCombo");
			dxtApp.onBackPressed(function(res){
				$state.go("main.meetingIndex");
				dxtApp.onBackPressed(function(res){
                    dxtApp.backToDxt();
                })
			})
		})
		//弹出二维码
		actions.alertCode = function (type) {
			// 请求支付订单
			console.log('支付订单', type);
			payWaySer.generateOrder(data.params.packageId).then(function (res) {

				console.log('支付订单结果', res);
				console.log('支付订单结果', res.data);

				if (res.code == 0) {
					data.notifyUrl = res.data.notifyUrl;
					data.orderNum = res.data.orderNum;

					console.log("开始调用盒子支付接口");
					var notify_url1 = Global.serverPath + data.notifyUrl;
					var dxtdata = {
						appid: 'dxt24715772077015046',
						openid: openId,
						app_trade_no: data.orderNum,
						good_title: data.params.good_title, //套餐名字
						good_detail: '',
						total_fee: data.params.total_fee, //支付金额
						pay_channel: type, //wxpay微信支付|alipay支付宝支付 
						notify_url: notify_url1
					}
					console.log('调用盒子支付接口', dxtdata);
					dxtApp.dxtScanPay({
						appid: 'dxt24715772077015046',
						openid: openId,
						app_trade_no: data.orderNum,
						good_title: data.params.good_title, //套餐名字
						good_detail: '',
						total_fee: data.params.total_fee, //支付金额
						pay_channel: type, //wxpay微信支付|alipay支付宝支付 
						notify_url: notify_url1
					}, function (res) { //根据res.resultCode分别进行处理
						console.log('支付回调参数', res);
						if (res.resultCode == 0) { //成功
							$state.go("main.paySuccess", {
								good_title: data.params.good_title
							});
						} else if (res.resultCode == 1) { //失败
							console.log('alter', '支付失败');

						} else if (res.resultCode == 2) { //取消支付了


						} else {
							console.log('alter', '订单生成失败');
						}


					});

				} else {

				}

			})
		}
	}
])

	.controller(payWay.codeBoxCtrlName, [
		'$scope',
		'$uibModalInstance',
		function ($scope, $uibModalInstance) {

		}])
