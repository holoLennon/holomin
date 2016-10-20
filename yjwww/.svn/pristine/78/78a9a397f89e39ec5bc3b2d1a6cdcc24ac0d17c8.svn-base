/**
 * ProductTypeLinkProductList，商品类型包含商品列表
 */
appctrl.controller('ProductTypeLinkProductListCtrl', function($scope, $rootScope,$timeout,
                                           $ionicTabsDelegate, $ionicPopover, $ionicModal, $ionicLoading,
                                           $location, $state,
                                           $cordovaNetwork, $cordovaGoogleAnalytics,$log,Storage,
                                           ENV,ProductTypeLinkProductService) {
    $log.debug("enter ProductTypeLinkProductList ctrl");
    /**页码*/
    $scope.page=_.clone(_Page);
    /**页面显示的列表*/
    $scope.listx=[];
    /**
     * 进入前
     */
    $scope.$on('$ionicView.beforeEnter', function() {
        $log.debug("ProductTypeLinkProductList ctrl beforeEnter");
    });
    /**
     * 进入后
     */
    $scope.$on('$ionicView.afterEnter', function() {
        $log.debug("ProductTypeLinkProductList ctrl afterEnter");
        if (ctrlReinitMap.get('ProductTypeLinkProductListCtrl')) {
            ctrlReinitMap.remove('ProductTypeLinkProductListCtrl');
            $log.debug("ProductTypeLinkProductList ctrl afterEnter init");
            $scope.init();
        }
    });

    /**
     * 初始化
     */
    $scope.init=function(){
        $log.debug("ProductTypeLinkProductList ctrl init ");
	    $scope.page.where=Storage.get("ProductTypeLinkProductList"+"QueryWhere");
        $log.debug("ProductTypeLinkProductList  $scope.page.where="+ $scope.page.where);
		$scope.page.pageNo=1;
        $scope.page.hasNextPage=false;
        $scope.listx=[];
        $scope.first();
    };
    /**
     * 上拉刷新
     */
    $scope.doRefresh=function(){
        $scope.init();
    };
    /**
     * 给list上加数据
     * @param data
     */
    $scope.addList=function(data){
        angular.forEach(data, function (item) {
            $scope.listx.push(item);
        });
        if(data && data.length < $scope.page.pageSize){
            $scope.page.hasNextPage=false;
        }else{
            $scope.page.hasNextPage=true;
        }
        $log.debug("addList===");
        $log.debug($scope.listx);
    };

    /**
     * 第一次查询
     */
    $scope.first=function(){
        ProductTypeLinkProductService.first(null,$scope.page).then(function (data) {
            $log.debug("ProductTypeLinkProductList ctrl query then");
            $scope.addList(data);
            $scope.$broadcast('scroll.refreshComplete');
        });

    };

    /**
     * 下拉加载更多查询
     */
    $scope.more=function(){
        $log.debug("ProductTypeLinkProductList ctrl more=========");
        if(!$scope.page.hasNextPage){
            return;
        }
        ProductTypeLinkProductService.more($scope.page).then(function (data) {
            $log.debug("ProductTypeLinkProductList ctrl more then");
            $scope.addList(data);
            $scope.$broadcast('scroll.infiniteScrollComplete');
        });
    };

    $scope.init();
    ctrlReinitMap.remove('ProductTypeLinkProductListCtrl');
});
