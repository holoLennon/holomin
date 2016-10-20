/**
 * CartList，购物车列表
 */
appctrl.controller('CartListCtrl', function($scope, $rootScope, $location, $log, Storage, ENV, CommonService, CartService) {
    $log.debug("enter CartList ctrl");
    /**页码*/
    $scope.page=_.clone(_Page);
    /**页面显示的列表*/
    $scope.list=[];
    /**
     * 进入前
     */
    $scope.$on('$ionicView.beforeEnter', function() {
        $log.debug("CartList ctrl beforeEnter");
    });
    /**
     * 进入后
     */
    $scope.$on('$ionicView.afterEnter', function() {
        $log.debug("CartList ctrl afterEnter");
        if (ctrlReinitMap.get('CartListCtrl')) {
            ctrlReinitMap.remove('CartListCtrl');
            $log.debug("CartList ctrl afterEnter init");
            $scope.init();
        }
    });

    /**
     * 初始化
     */
    $scope.init=function(){
        $log.debug("CartList ctrl init ");
	    $scope.page.where=Storage.get("CartList"+"QueryWhere");
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
        CartService.first(null,$scope.page).then(function (data) {
            $log.debug("CartList ctrl query then");
            $scope.addList(data);
            $scope.$broadcast('scroll.refreshComplete');
        });

    };

    /**
     * 下拉加载更多查询
     */
    $scope.more=function(){
        $log.debug("CartList ctrl more=========");
        if(!$scope.page.hasNextPage){
            return;
        }
        CartService.more($scope.page).then(function (data) {
            $log.debug("CartList ctrl more then");
            $scope.addList(data);
            $scope.$broadcast('scroll.infiniteScrollComplete');
        });
    };

    $scope.init();
    ctrlReinitMap.remove('CartListCtrl');
});
