/**
 * Memberapay，会员订单
 */
appctrl.controller('apayCtrl', function($scope, $rootScope, $log,$stateParams) {
  $log.debug("enter apay ctrl");
  /**参数*/
  var id = $stateParams.id;

  /**
   * 进入前
   */
  $scope.$on('$ionicView.beforeEnter', function() {
    $log.debug("apay ctrl beforeEnter1");
  });
  /**
   * 进入后
   */
  $scope.$on('$ionicView.afterEnter', function() {
    $log.debug("apay ctrl afterEnter");
    if (ctrlReinitMap.get('apayCtrl')) {
      ctrlReinitMap.remove('apayCtrl');
      $log.debug("apay ctrl afterEnter init");
      $scope.init();
    }
  });
  $scope.init=function(){
    var url =wbase+"/pub/alipay/jump.html?id="+14328;
    window.showModalDialog(url);
  }
  $scope.init();
  ctrlReinitMap.remove('apayCtrl');
});
