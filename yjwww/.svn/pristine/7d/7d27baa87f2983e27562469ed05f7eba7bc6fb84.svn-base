/**
 * ProductType2，商品类型详细，带2级孩子
 */
appctrl.controller('ProductType2Ctrl', function($scope, $rootScope, $log, $timeout,
                                             $ionicTabsDelegate, $ionicPopover, $ionicModal, $ionicLoading,
                                             $location, $state,
                                             $cordovaNetwork, $cordovaGoogleAnalytics,
                                             $stateParams,$ionicScrollDelegate,
                                             ENV,CommonService,ProductTypeService) {
    $log.debug("enter ProductType2 ctrl");
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
        $log.debug("ProductType2 ctrl beforeEnter");
    });
    /**
     * 进入后
     */
    $scope.$on('$ionicView.afterEnter', function() {
        $log.debug("ProductType2 ctrl afterEnter");
        if (ctrlReinitMap.get('ProductType2Ctrl')) {
            ctrlReinitMap.remove('ProductType2Ctrl');
            $log.debug("ProductType2 ctrl afterEnter init");
            $scope.init();
        }
	});
    /**
     * 结束后
     */
	$scope.$on('$destroy', function() {
		$log.debug("ProductType2 ctrl destroy");
	});
    /**
     * 初始化
     */
    $scope.init=function(){
        $log.debug("ProductType2 ctrl init id="+id);
		$scope.getckey();
    };
    /**
     * 上拉刷新
     */
    $scope.doRefresh=function(){
        $scope.init();
    };
    /**
     * 根据ckey/id获取网络对象
     */
    $scope.getckey=function(){
        $log.debug("ProductType ctrl getckey id="+id);
        ProductTypeService.getckey(id).then(function (data) {
            $log.debug("ProductType ctrl getckey then");
            $scope.obj=data;
            $scope.$broadcast('scroll.refreshComplete');
        });
    };


    /**导航栏左侧菜单点击切换**/
    $scope.selected = 0;

    /**
     * 是否被选中
     */
    $scope.isSelected = function(section) {
        return $scope.selected === section;
    }

    /**
     * 导航栏左侧菜单点击切换
     * @param section 序号
     * @param pid 频道id
     */
    $scope.changeNavCat = function(section) {
        $scope.selected  = section;
        $ionicScrollDelegate.scrollTop();
    }
    /**
     * 搜索
     */
    $scope.search=function(){
        $log.debug("kw ="+$scope.searchData);
        if(isblank($scope.searchData))
            return;
        $scope.rx('#/tab/ProductListSearch/'+$scope.searchData);
    };

    $scope.init();
    ctrlReinitMap.remove('ProductType2Ctrl');
});
