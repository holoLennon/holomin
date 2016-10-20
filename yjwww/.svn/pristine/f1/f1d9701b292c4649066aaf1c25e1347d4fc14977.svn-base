/**
 * ProductTypeList，商品类型列表
 */
appctrl.controller('ProductTypeListCtrl', function($scope, $rootScope,$timeout,
                                           $ionicTabsDelegate, $ionicPopover, $ionicModal, $ionicLoading,
                                           $location, $state,
                                           $cordovaNetwork, $cordovaGoogleAnalytics,$log,Storage,
                                           ENV,ProductTypeService) {
    $log.debug("enter ProductTypeList ctrl");
    /**页码*/
    $scope.page=_.clone(_Page);
    /**页面显示的列表*/
    $scope.list=[];
    /**
     * 进入前
     */
    $scope.$on('$ionicView.beforeEnter', function() {
        $log.debug("ProductTypeList ctrl beforeEnter");
    });
    /**
     * 进入后
     */
    $scope.$on('$ionicView.afterEnter', function() {
        $log.debug("ProductTypeList ctrl afterEnter");
        if (ctrlReinitMap.get('ProductTypeListCtrl')) {
            ctrlReinitMap.remove('ProductTypeListCtrl');
            $log.debug("ProductTypeList ctrl afterEnter init");
            $scope.init();
        }
    });

    /**
     * 初始化
     */
    $scope.init=function(){
        $log.debug("ProductTypeList ctrl init ");
	    $scope.page.where=Storage.get("ProductTypeList"+"QueryWhere");
		$scope.page.pageNo=1;
        $scope.page.hasNextPage=false;
        $scope.list=[];
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
            $scope.list.push(item);
        });
        if(data && data.length < $scope.page.pageSize){
            $scope.page.hasNextPage=false;
        }else{
            $scope.page.hasNextPage=true;
        }
    };

    /**
     * 第一次查询
     */
    $scope.first=function(){
        ProductTypeService.first(null,$scope.page).then(function (data) {
            $log.debug("ProductTypeList ctrl query then");
            $scope.addList(data);
            $scope.$broadcast('scroll.refreshComplete');
        });

    };
     /**
     * 查树
     */
    $scope.tree=function(){
        ProductTypeService.tree($scope.page).then(function (data) {
            $log.debug("ProductTypeList ctrl tree then");
            $scope.addList(data);
            $scope.$broadcast('scroll.refreshComplete');
        });

    };

    /**
     * 下拉加载更多查询
     */
    $scope.more=function(){
        $log.debug("ProductTypeList ctrl more=========");
        if(!$scope.page.hasNextPage){
            return;
        }
        ProductTypeService.more($scope.page).then(function (data) {
            $log.debug("ProductTypeList ctrl more then");
            $scope.addList(data);
            $scope.$broadcast('scroll.infiniteScrollComplete');
        });
    };

    $scope.init();
    ctrlReinitMap.remove('ProductTypeListCtrl');
});
