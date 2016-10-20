/**
 * wxPay，实体药店列表地图版
 */
appctrl.controller('wxPayCtrl', function($scope,$log,WxService,zspecService) {
  $log.debug("enter wxPay ctrl");
  /**页码*/
  $scope.page=_.clone(_Page);
  /**页面显示的列表*/
  $scope.list=[];
  $scope.vm=[];
  $scope.payMessage =0;
  /**
   * 进入前
   */
  $scope.$on('$ionicView.beforeEnter', function() {
    $log.debug("wxPay ctrl beforeEnter");
  });
  /**
   * 进入后
   */
  $scope.$on('$ionicView.afterEnter', function() {
    $log.debug("wxPay ctrl afterEnter");
    if (ctrlReinitMap.get('wxPayMapCtrl')) {
      ctrlReinitMap.remove('wxPayMapCtrl');
      $log.debug("wxPay ctrl afterEnter init");
      $scope.init();
    }
  });
  $scope.init=function(){
    WxService.config().then(function (data) {
      zspecService.wxPay().then(function (waJsapiPaymentParam) {
        WxService.pay(waJsapiPaymentParam).then(function (data) {

        });
      });
    })
  }


  $scope.init();
  ctrlReinitMap.remove('wxPayMapCtrl');
});
