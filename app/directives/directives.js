require('./state.js')
var directives = module.exports = {};
directives.name = 'pa.directives';

angular.module(directives.name, [
		'dxttv.stateid'
	])
	.directive('setFocus', function () {
		return function (scope, element) {
			console.log('index', scope.$index)
			//列表情况
			if (scope.$index == 0) {
				element[0].focus();
			}

			//单独元素情况
			if (!scope.$index) {
				element[0].focus();
			}
		};
	})


	.directive('popBox', [

		function () {
			// Runs during compile
			return {
				// name: 'popBox',
				// priority: 1,
				// terminal: true,
				scope: {
					tip: '@tip',
					showtime: '=',
					isshow: '='
				}, // {} = isolate, true = child, false/undefined = no change
				// controller: function($scope, $element, $attrs, $transclude) {},
				// require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
				restrict: 'EA', // E = Element, A = Attribute, C = Class, M = Comment
				template: '<div class="popBoxWarpper">\
			<div class="popBoxWarp">\
				<div class="popBox">\
					<span>\
						{{tip}}{{showtime}}\
					<span>\
				</div>\
			<div>\
		</div>',
				replace: true,
				// transclude: true,
				// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
				link: function ($scope, iElm, iAttrs, controller) {

					var timer = setInterval(function () {
						if ($scope.showtime == 0) {
							$scope.isshow.isshow = false;
							$scope.$apply();
							clearInterval(timer);
						} else {
							$scope.showtime--;
						}
					}, 1000)

				}
			};
		}
	]);