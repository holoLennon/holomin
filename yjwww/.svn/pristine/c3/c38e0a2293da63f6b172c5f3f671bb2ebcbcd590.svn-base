/**
 * ProductType，商品类型详细，通过ckey
 */
appctrl.controller('ProductTypeCtrl', function($scope, $rootScope, $log, $timeout,
                                             $ionicTabsDelegate, $ionicPopover, $ionicModal, $ionicLoading,
                                             $location, $state,
                                             $cordovaNetwork, $cordovaGoogleAnalytics,
                                             $stateParams,
                                             ENV,CommonService,ProductTypeService,$ionicHistory) {
    $log.debug("enter ProductType ctrl");
	/**参数*/
    var id = $stateParams.id;
    /**页面对象*/
    $scope.vm={};
	/**对象*/
	$scope.obj={};
    /**
     * 进入前
     */
    $scope.$on('$ionicView.beforeEnter', function() {
        $log.debug("ProductType ctrl beforeEnter");
    });
    /**
     * 进入后
     */
    $scope.$on('$ionicView.afterEnter', function() {
        $log.debug("ProductType ctrl afterEnter");
        if (ctrlReinitMap.get('ProductTypeCtrl')) {
            ctrlReinitMap.remove('ProductTypeCtrl');
            $log.debug("ProductType ctrl afterEnter init");
            $scope.init();
        }
	});
    /**
     * 结束后
     */
	$scope.$on('$destroy', function() {
		$log.debug("ProductType ctrl destroy");
	});
    /**
     * 初始化
     */
    $scope.init=function(){
        $log.debug("ProductType ctrl init id="+id);
		$scope.getckey();
    };
    /**
     * 根据ckey/id获取网络对象
     */
    $scope.getckey=function(){
        $log.debug("ProductType ctrl getckey id="+id);
        ProductTypeService.getckey(id).then(function (data) {
            $log.debug("ProductType ctrl getckey then");
            $scope.obj=data;
        });
    };
    /**
     * 返回
     */
    $scope.fanhui=function(){
        $ionicHistory.goBack();
    };
    $scope.init();
    ctrlReinitMap.remove('ProductTypeCtrl');
});
