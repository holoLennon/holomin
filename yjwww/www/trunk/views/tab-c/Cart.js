/**
 * Cart，购物车详细
 */
appctrl.controller('CartCtrl', function($scope, $rootScope, $log, $timeout,
                                             $ionicTabsDelegate, $ionicPopover, $ionicModal, $ionicLoading,
                                             $location, $state,
                                             $cordovaNetwork, $cordovaGoogleAnalytics,
                                             $stateParams,
                                             ENV,CommonService,CartService) {
    $log.debug("enter Cart ctrl");
    /**页面对象*/
    $scope.vm={};
	/**对象*/
	$scope.obj={};
    /**
     * 进入前
     */
    $scope.$on('$ionicView.beforeEnter', function() {
        $log.debug("Cart ctrl beforeEnter");
    });
    /**
     * 进入后
     */
    $scope.$on('$ionicView.afterEnter', function() {
        $log.debug("Cart ctrl afterEnter");
        if (ctrlReinitMap.get('CartCtrl')) {
            ctrlReinitMap.remove('CartCtrl');
            $log.debug("Cart ctrl afterEnter init");
            $scope.init();
        }
	});
    /**
     * 结束后
     */
	$scope.$on('$destroy', function() {
		$log.debug("Cart ctrl destroy");
	});
    /**
     * 初始化
     */
    $scope.init=function(){
        $log.debug("Cart ctrl init id=");
        $scope.checkCart();
    };
    $scope.init();
    ctrlReinitMap.remove('CartCtrl');
});
