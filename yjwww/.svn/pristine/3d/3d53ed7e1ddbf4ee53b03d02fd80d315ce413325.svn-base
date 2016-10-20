/**
 * Product，商品详细
 */
appctrl.controller('StoreProductCtrl', function($scope, $rootScope, $log, $timeout,
                                           $ionicTabsDelegate, $ionicPopover, $ionicModal, $ionicLoading,
                                           $location, $state,
                                           $cordovaNetwork, $cordovaGoogleAnalytics,
                                           $stateParams,$ionicHistory,
                                           ENV,CommonService,ProductService) {
  $log.debug("enter StoreProduct ctrl");
  /**参数*/
  var id = $stateParams.id;
  $scope.act = $stateParams.act;
  /**页面对象*/
  $scope.vm={};
  $scope.vm.isedit=false;
  if(id==='0')
    $scope.vm.isedit=true;
  /**对象*/
  $scope.obj={};
  /**
   * 进入前
   */
  $scope.$on('$ionicView.beforeEnter', function() {
    $log.debug("StoreProduct ctrl beforeEnter");
  });
  /**
   * 进入后
   */
  $scope.$on('$ionicView.afterEnter', function() {
    $log.debug("StoreProduct ctrl afterEnter");
    if (ctrlReinitMap.get('StoreProductCtrl')) {
      ctrlReinitMap.remove('StoreProductCtrl');
      $log.debug("StoreProduct ctrl afterEnter init");
      $scope.init();
    }
  });
  /**
   * 初始化
   */
  $scope.init=function(){
    $log.debug("StoreProduct ctrl init id="+id);
    $scope.get();
  };
  /**  直接拨打号码咨询购买*/
  $scope.telephone = function (){
    alert('请拨打客服电话：0571-85389727     咨询购买该药品!');
  };
  /**
   * 获取本地对象
   */
  $scope.getlocal=function(){
    $log.debug("StoreProduct ctrl getlocal id="+id);
    if(isblank0(id)){
      $scope.obj= _.clone(_Product);
    }else{
      $scope.obj=ProductService.getlocal(id);
    }
    $log.debug($scope.obj);
  };
  /**
   * 获取网络对象
   */
  $scope.get=function(){
    $log.debug("StoreProduct ctrl get id="+id);
    if(isblank0(id)) {
      ProductService.newget().then(function (data) {
        $log.debug("StoreProduct ctrl newget then");
        $scope.obj=data;
      });
    }else{
      ProductService.get(id).then(function (data) {
        $log.debug("StoreProduct ctrl get then");
        $scope.obj=data;
      });
    }
  };
  /**
   * 保存
   */
  $scope.save=function(){
    $log.debug("StoreProduct ctrl get id="+id);
    $log.debug($scope.obj)
    if(isblank0(id)) {
      ProductService.create($scope.obj).then(function (data) {
        $log.debug("StoreProduct ctrl save then");
        $scope.obj=data;
        $location.path("/tab/Product/"+$scope.obj.id);
      });
    }else{
      ProductService.update($scope.obj).then(function (data) {
        $log.debug("StoreProduct ctrl update then");
        $scope.obj=data;
        $location.path("/tab/StoreProduct/"+$scope.obj.id);
      });
    }
  };

  $scope.init();
  ctrlReinitMap.remove('StoreProductCtrl');
});
