/**
 * Created by Administrator on 2017/7/7.
 */

var changePasswordSer=require("./changePasswordSer");
var changePassword=module.exports={};
changePassword.name="areas.setting.changePassword";
changePassword.ctrlName="areas.setting.changePasswordController";

angular.module(changePassword.name,[
    changePasswordSer.name
])
    .controller(changePassword.ctrlName,[
        "$scope",
        "$state",
        changePasswordSer.model,
        "session",
        function ($scope,$state,changePasswordSer,session) {
        var data=$scope.data={};
        var actions=$scope.actions={};
            // dxtApp.onBackPressed(function (res) {
            //         dxtApp.backToDxt();
            // })
            actions.sureChange=function () {
                dxtApp.changePassword({
                    oldPwd:data.oldPwd,
                    newPwd:data.newPwd,
                },function(res){
                    console.log(res)
                })
            }
        }

    ])
