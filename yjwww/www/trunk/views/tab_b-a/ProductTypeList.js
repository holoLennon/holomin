/**
 * ProductTypeList，商品类型列表
 */
appctrl.controller('ProductTypeListCtrl', function($scope, $rootScope,$timeout,
                                                   $ionicTabsDelegate, $ionicPopover, $ionicModal, $ionicLoading,
                                                   $location, $state,
                                                   $cordovaNetwork, $cordovaGoogleAnalytics,$log,Storage,
                                                   ENV,ProductTypeService,ProductTypeLinkProductService,$ionicHistory) {
    $log.debug("enter ProductTypeList ctrl");
    /**页码*/
    $scope.page=_.clone(_Page);
    /**页面显示的列表*/
    $scope.list=[];
    // 产品列表，是一个[[],[]...[]]的列表
    $scope.listProductTypeLinkProduct=[];
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
        $log.debug("ProductType ctrl getckey id=");
        ProductTypeService.getckey('mclass').then(function (data) {
            $log.debug("ProductType ctrl getckey then");
            $scope.obj=data;
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
    }
    /**
     * 去 ProductTypeLinkProductList 页
     * @param productType
     */
    $scope.gotoUrlProductTypeLinkProductList=function(productType){
        Storage.set("ProductTypeLinkProductList"+"QueryWhere","productTypeId="+productType.id);
        ctrlReinitMap.put('ProductTypeLinkProductListCtrl',1);
        $scope.rx('#/tab/ProductTypeLinkProduct');
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
    /**
     * 返回
     */
    $scope.fanhui=function(){
        $ionicHistory.goBack();
    };
    $scope.init();
    ctrlReinitMap.remove('ProductTypeListCtrl');
});
