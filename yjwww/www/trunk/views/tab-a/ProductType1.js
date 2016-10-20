/**
 * ProductType，商品类型详细，通过id
 */
appctrl.controller('ProductType1Ctrl', function($scope, $rootScope, $log, $timeout,
                                             $ionicTabsDelegate, $ionicPopover, $ionicModal, $ionicLoading,
                                             $location, $state,
                                             $cordovaNetwork, $cordovaGoogleAnalytics,
                                             $stateParams,
                                             ENV,CommonService,ProductTypeService,$ionicHistory) {
    $log.debug("enter ProductType1 ctrl");
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
        $log.debug("ProductType1 ctrl beforeEnter");
    });
    /**
     * 进入后
     */
    $scope.$on('$ionicView.afterEnter', function() {
        $log.debug("ProductType1 ctrl afterEnter");
        if (ctrlReinitMap.get('ProductType1Ctrl')) {
            ctrlReinitMap.remove('ProductType1Ctrl');
            $log.debug("ProductType1 ctrl afterEnter init");
            $scope.init();
        }
	});
    /**
     * 结束后
     */
	$scope.$on('$destroy', function() {
		$log.debug("ProductType1 ctrl destroy");
	});
    /**
     * 初始化
     */
    $scope.init=function(){
        $log.debug("ProductType1 ctrl init id="+id);
		$scope.get();
    };
    /**
     * 获取网络对象
     */
    $scope.get=function(){
        ProductTypeService.get(id).then(function (data) {
            $log.debug("ProductType1 ctrl get then");
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
    ctrlReinitMap.remove('ProductType1Ctrl');
});
