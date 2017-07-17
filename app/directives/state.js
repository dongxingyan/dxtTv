'use strict';
var StateManServ = (function () {
    function StateManServ() {
        this.cached = {};
        window['stateman'] = this;
    }
    StateManServ.prototype.createState = function () {
        return Math.random() + '' + Date.now();
    };
    Object.defineProperty(StateManServ.prototype, "actived", {
        get: function () {
            return this._actived;
        },
        set: function (value) {
            this._actived = value;
        },
        enumerable: true,
        configurable: true
    });
    StateManServ.prototype.setActive = function (id) {
        setTimeout(function () {
            $("[state-id=" + id + "]").focus();
        }, 20);
    };
    StateManServ.prototype.cache = function (key, val) {
        if (val != undefined) {
            this.cached[key] = val;
        }
        return this.cached[key];
    };
    return StateManServ;
}());
var StateIdDirectiveController = (function () {
    function StateIdDirectiveController($scope, $attrs, $element, stateMan) {
        var _this = this;
        this.$scope = $scope;
        this.$attrs = $attrs;
        this.$element = $element;
        this.stateMan = stateMan;
        var btn = $element;
        btn.keydown(function (event) {
            var up = _this.$attrs['keyUp'];
            var down = _this.$attrs['keyDown'];
            var left = _this.$attrs['keyLeft'];
            var right = _this.$attrs['keyRight'];
            var enter = _this.$attrs['keyEnter'];
            var readExpr = function (expr) {
                if (/^to#/.test(expr)) {
                    expr = "stateman.to(" + expr.split('#').slice(-1)[0] + ")";
                }
                return expr;
            };
            _a = [up, down, left, right].map(readExpr), up = _a[0], down = _a[1], left = _a[2], right = _a[3];
            var witch = event.which;
            if (left && witch === 37) {
                event.preventDefault();
                $scope.$eval(left);
            }
            if (up && witch === 38) {
                event.preventDefault();
                $scope.$eval(up);
            }
            if (right && witch === 39) {
                event.preventDefault();
                $scope.$eval(right);
            }
            if (down && witch === 40) {
                event.preventDefault();
                $scope.$eval(down);
            }
            if (enter && witch === 13) {
                event.preventDefault();
                $scope.$eval(enter);
            }
            var _a;
        });
        btn.focus(function () {
            var stateid = _this.$attrs['stateId'];
            stateMan.actived = stateid;
            setTimeout(function () {
                _this.$scope.$apply();
            });
        });
    }
    /**
     * 判断当前选中的是不是自己
     */
    StateIdDirectiveController.prototype.isSelected = function () {
        var stateid = this.$attrs['stateId'], acitvedState = this.stateMan.actived;
        return stateid === acitvedState;
    };
    StateIdDirectiveController.prototype.to = function (id, key, val) {
        this.stateMan.setActive(id);
        // 跳转时可能允许进行一次状态缓存
        if (key !== undefined) {
            this.cache(key, val);
        }
    };
    /**
     * 进行一次状态缓存
     */
    StateIdDirectiveController.prototype.cache = function (key, val) {
        return this.stateMan.cache(key, val);
    };
    return StateIdDirectiveController;
}());
StateIdDirectiveController.$inject = ['$scope', '$attrs', '$element', 'StateMan'];
angular.module('dxttv.stateid', [])
    .directive('stateId', [function () {

        return {
            scope: true,
            controllerAs: 'stateman',
            controller: StateIdDirectiveController
        };
    }])
    .service('StateMan', StateManServ);
