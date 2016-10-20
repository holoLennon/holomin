/**
 * Created by Administrator on 2016/9/12.
 */
/**
 * MemberdoctorList，医患关系列表
 */
appctrl.controller('memberFileCtrl', function($scope, $rootScope,$timeout,
                                                    $ionicTabsDelegate, $ionicPopover, $ionicModal, $ionicLoading,
                                                    $location, $state,
                                                    $cordovaNetwork, $cordovaGoogleAnalytics,$log,$stateParams) {
  $log.debug("enter memberFile ctrl");
  var memberId = $stateParams.memberId;

  /**
   * 进入前
   */
  $scope.$on('$ionicView.beforeEnter', function() {
    $log.debug("memberFile ctrl beforeEnter");
  });
  /**
   * 进入后
   */
  $scope.$on('$ionicView.afterEnter', function() {
    $log.debug("memberFile ctrl afterEnter");
    if (ctrlReinitMap.get('memberFileCtrl')) {
      ctrlReinitMap.remove('memberFileCtrl');
      $log.debug("memberFile ctrl afterEnter init");
      $scope.init();
    }
  });
  $scope.goMedicalrec= function () {
    $scope.rx('#/tab/Medicalrec/'+memberId);
  }
  $scope.goMedicalrecRptList= function () {
    $scope.rx('#/tab/MedicalrecRptList/'+memberId);
  }
  $scope.goMedicalrecHealthList= function () {
    $scope.rx('#/tab/MedicalrecHealthList/'+memberId);
  }
  $scope.init();
  ctrlReinitMap.remove('memberFileCtrl');
});
