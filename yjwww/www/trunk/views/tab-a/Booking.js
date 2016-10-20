/**
 * Booking 预订  药品预订和医生预订的共同js
 */
appctrl.controller('BookingCtrl', function($scope, $rootScope, $log, $timeout,
                                             $ionicTabsDelegate, $ionicPopover, $ionicModal, $ionicLoading,
                                             $location, $state,
                                             $cordovaNetwork, $cordovaGoogleAnalytics,
                                             $stateParams,
                                             ENV,CommonService,SuggestionService) {
    $log.debug("enter Suggestion ctrl");
	/**对象*/
	$scope.obj={};
    /**
     * 进入前
     */
    $scope.$on('$ionicView.beforeEnter', function() {
        $log.debug("Suggestion ctrl beforeEnter");
    });
    /**
     * 进入后
     */
    $scope.$on('$ionicView.afterEnter', function() {
        $log.debug("Suggestion ctrl afterEnter");
        if (ctrlReinitMap.get('SuggestionCtrl')) {
            ctrlReinitMap.remove('SuggestionCtrl');
            $log.debug("Suggestion ctrl afterEnter init");
            $scope.init();
        }
	});
    /**
     * 初始化
     */
    $scope.init=function(){
        $log.debug("Suggestion ctrl init");
    };

    /**
     * 保存
     */
    $scope.save=function(){
        $log.debug("Suggestion ctrl get");
        if(isblank($scope.obj.detail)){
            CommonService.alertm('请填写您的预约服务');
            return;
        }

        SuggestionService.create($scope.obj).then(function (data) {
            $log.debug("Suggestion ctrl save then");
            $scope.obj=data;
            CommonService.alertm('感谢您的信任，客服人员将在48小时内联系您。').then(function (res) {});
            $location.path("/tab/Wwwhome");
        });

    };
    $scope.init();
    ctrlReinitMap.remove('SuggestionCtrl');
});