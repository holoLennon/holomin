/**
 * ProductTypeLinkProductListHomeCtrl，商品类型包含商品列表
 */
appctrl.controller('HomeCtrl', function ($scope, $rootScope, $timeout,
                                                                   $ionicTabsDelegate, $ionicPopover, $ionicModal, $ionicLoading,
                                                                   $location, $state,
                                                                   $cordovaNetwork, $cordovaGoogleAnalytics, $log, Storage,
                                                                   ENV, ProductTypeLinkProductService, GaodeService, CommonService,MemberdoctorService) {
  $log.debug("enter Home ctrl");
  /**页码*/
  $scope.page = _.clone(_Page);
  /**页面显示的列表*/
  $scope.list = [];
  /**页码2*/
  $scope.page2= _.clone(_Page);
  $scope.doctor_id=0;
  if(Storage.get(LOGINED_USER_B)!=null){
    $scope.doctor_id=Storage.get(LOGINED_USER_B).id;
  }
  $scope.page2.where="doctor_id="+$scope.doctor_id;
  /**给医生发消息的会员数量 */
  $scope.dmsgnum=0;
  /**
   * 进入前
   */
  $scope.$on('$ionicView.beforeEnter', function () {
    $log.debug("Home ctrl beforeEnter");
  });
  /**
   * 进入后
   */
  $scope.$on('$ionicView.afterEnter', function () {
    $log.debug("Home ctrl afterEnter");
    if (ctrlReinitMap.get('HomeCtrl')) {
      ctrlReinitMap.remove('HomeCtrl');
      $log.debug("Homectrl afterEnter init");
     // $scope.init();
    }
  });

  /**
   * 初始化
   */
  $scope.init = function () {
    $scope.havaMessage();
  };
  /**
   * 获取给医生发消息的会员数量
   */
  $scope.havaMessage=function(){
    if(Storage.get(LOGINED_USER_B)==null){
      return;
    };
    MemberdoctorService.first(null,$scope.page2).then(function (data) {
      angular.forEach(data, function (item) {
        if(item.dmsgnotread>0){
          $scope.dmsgnum++;
        }
      });
    });
  }

  $scope.init();
  ctrlReinitMap.remove('HomeCtrl');
});
