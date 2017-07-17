/**
 * Created by Administrator on 2017/7/6.
 */

var myPurchaseSer = require("./myPurchaseSer");
var myPurchase = module.exports = {}

myPurchase.name = "areas.setting.myPurchase";
myPurchase.ctrlName = "areas.setting.myPurchaseController"

angular.module(myPurchase.name, [
    myPurchaseSer.name
])
    .controller(myPurchase.ctrlName, [
        '$scope',
        '$state',
        myPurchaseSer.model,
        'session',
        function ($scope, $state,myPurchaseSer, session) {
            $('#disButton').focus();
            var data=$scope.data = {}
            var actions=$scope.actions = {}
            data.payments=[];

            actions.up=function(){
                if(data.mark != 0){
                    data.mark--;
                    $scope.$apply();
                }else{
                    if(data.startMark>0){
                        data.startMark--;
                        $scope.$apply();
                    }else{

                    }
                }
            }
            actions.down=function($index){
                console.log(data.cacheRecords)
                console.log($index)
                if(data.mark<3){
                    if(data.mark<data.cacheRecords.length-1){
                        data.mark++;
                        $scope.$apply();
                    }
                }else{
                    if(data.cacheRecords.length<=4){
                        return;
                    }
                    if(data._hasNext){
                        if(this.startMark>=data.cacheRecords.length-8){
                            data.startMark++;
                            actions.getMore();
                        }else{
                            data.startMark++;
                        }
                    }else{
                        if(data.startMark<this.cacheRecords.length-4){
                            data.startMark++
                        }
                    }
                    $scope.$apply();
                }
            }
            //页面显示的条数
            data.pageSize=4;
            //光标所在的位置
            data.mark=0;
            //屏幕显示的第一条的位置
            data.startMark=0;
            //缓存的付款记录
            data.cacheRecords=[];
            //按页面加载的标记
            data.pageMark=0;
            //是否有下一页
            data._hasNext=true;
            document.onkeydown = function (event) {
                console.log(event);
                if(event.keyCode==40){//下键
                    if(data.mark<3){
                        if(data.mark<data.cacheRecords.length-1){
                            data.mark++;
                            $('.active').removeClass('active');
                            $('table tr').eq(data.mark+1).addClass('active');
                            $scope.$apply();
                        }
                    }
                    else{
                        if(data.cacheRecords.length<=4){
                            return;
                        }
                        if(data._hasNext){
                            if(data.startMark>=this.cacheRecords.length-8){
                                data.startMark++;
                                actions.getMore();
                            }
                            else{
                                data.startMark++;
                            }
                        }
                        else{
                            if(data.startMark<data.cacheRecords.length-4){
                                data.startMark++;
                            }
                        }
                        $scope.$apply();
                    }

                }
                else if(event.keyCode==38){//上键
                    if(data.mark!=0){
                        data.mark--;
                        $('.active').removeClass('active');
                        $('table tr').eq(data.mark+1).addClass('active');
                        $scope.$apply();
                    }
                    else{
                        if(data.startMark>0){
                            data.startMark--;
                            $scope.$apply();
                        }
                    }

                }
                console.log($('.active'), data.mark);
                document.getElementById('msger').innerHTML = event.keyCode + ' <-> ' + event.key;
            }

            dxtApp.onBackPressed(function (res) {
                console.log('返回回调', '退出webview')
                    dxtApp.backToDxt();
            })
        // //    获取token

            // actions.getMore=function(){
            //     //先获取token和大大麦号
            //     dxtApp.getToken(function(res){
            //             data.token=res.token;
            //             data.damyNum=res.damyNum;
            //             console.log(res);
            //         setTimeout(function(){
            //             console.log(data.damyNum,data.token)
            //             return data._hasNext&&myPurchaseSer.getPayments(data.damyNum,data.token,data.pageSize,data.pageMark)
            //                     .then(function (res) {
            //                         if(res.code == 200){
            //                             // 剩余时间
            //                             console.log(res);
            //                             data.items=res.data;
            //                             if(data.items.length<data.pageSize){
            //                                 data._hasNext=false;
            //                             }
            //                             var i=data.pageMark*data.pageSize;
            //                             for(var j=0;j<data.pageSize;j++){
            //                                 if(data.items[j]){
            //                                     data.cacheRecords[i+j]=data.items[j];
            //                                 }
            //                                 console.log(data.cacheRecords)
            //                             }
            //                             data.pageMark++;
            //                             console.log(data.pageMark)
            //                         }
            //                     })
            //         },300)
            //         //请求购买记录
            //     })
            //
            //
            //
            //
            // }
            // actions.getMore();
            // actions.getRecords=function() {
            //     data.result =data.cacheRecords.slice(data.startMark, data.startMark + data.pageSize);
            //     return data.result;
            // }

        }
    ])