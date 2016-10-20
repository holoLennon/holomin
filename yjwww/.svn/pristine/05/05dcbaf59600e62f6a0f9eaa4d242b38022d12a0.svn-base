/**
 * DoctorProductList，医生的药架列表
 */
appctrl.controller('DoctorProductListCtrl', function($scope, $rootScope, $location, $log, Storage, ENV, CommonService, DoctorProductService) {
    $log.debug("enter DoctorProductList ctrl");
    /**页码*/
    $scope.page=_.clone(_Page);
    /**页面显示的列表*/
    $scope.list=[];
    /**
     * 进入前
     */
    $scope.$on('$ionicView.beforeEnter', function() {
        $log.debug("DoctorProductList ctrl beforeEnter");
    });
    /**
     * 进入后
     */
    $scope.$on('$ionicView.afterEnter', function() {
        $log.debug("DoctorProductList ctrl afterEnter");
        if (ctrlReinitMap.get('DoctorProductListCtrl')) {
            ctrlReinitMap.remove('DoctorProductListCtrl');
            $log.debug("DoctorProductList ctrl afterEnter init");
            $scope.init();
        }
    });

    /**
     * 初始化
     */
    $scope.init=function(){
        $log.debug("DoctorProductList ctrl init ");
	    $scope.page.where=Storage.get("DoctorProductList"+"QueryWhere");
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
        DoctorProductService.first(null,$scope.page).then(function (data) {
            $log.debug("DoctorProductList ctrl query then");
            $scope.addList(data);
            $scope.$broadcast('scroll.refreshComplete');
        });

    };

    /**
     * 下拉加载更多查询
     */
    $scope.more=function(){
        $log.debug("DoctorProductList ctrl more=========");
        if(!$scope.page.hasNextPage){
            return;
        }
        DoctorProductService.more($scope.page).then(function (data) {
            $log.debug("DoctorProductList ctrl more then");
            $scope.addList(data);
            $scope.$broadcast('scroll.infiniteScrollComplete');
        });
    };

    $scope.init();
    ctrlReinitMap.remove('DoctorProductListCtrl');
});
