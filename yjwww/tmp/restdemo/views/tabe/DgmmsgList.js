/**
 * DgmmsgList，药师患者聊天记录列表
 */
appctrl.controller('DgmmsgListCtrl', function($scope, $rootScope,$timeout,
                                           $ionicTabsDelegate, $ionicPopover, $ionicModal, $ionicLoading,
                                           $location, $state,
                                           $cordovaNetwork, $cordovaGoogleAnalytics,$log,Storage,
                                           ENV,DgmmsgService) {
    $log.debug("enter DgmmsgList ctrl");
    /**页码*/
    $scope.page=_.clone(_Page);
    /**页面显示的列表*/
    $scope.list=[];
    /**
     * 进入前
     */
    $scope.$on('$ionicView.beforeEnter', function() {
        $log.debug("DgmmsgList ctrl beforeEnter");
    });
    /**
     * 进入后
     */
    $scope.$on('$ionicView.afterEnter', function() {
        $log.debug("DgmmsgList ctrl afterEnter");
        if (ctrlReinitMap.get('DgmmsgListCtrl')) {
            ctrlReinitMap.remove('DgmmsgListCtrl');
            $log.debug("DgmmsgList ctrl afterEnter init");
            $scope.init();
        }
    });

    /**
     * 初始化
     */
    $scope.init=function(){
        $log.debug("DgmmsgList ctrl init ");
	    $scope.page.where=Storage.get("DgmmsgList"+"QueryWhere");
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
        DgmmsgService.first(null,$scope.page).then(function (data) {
            $log.debug("DgmmsgList ctrl query then");
            $scope.addList(data);
            $scope.$broadcast('scroll.refreshComplete');
        });

    };

    /**
     * 下拉加载更多查询
     */
    $scope.more=function(){
        $log.debug("DgmmsgList ctrl more=========");
        if(!$scope.page.hasNextPage){
            return;
        }
        DgmmsgService.more($scope.page).then(function (data) {
            $log.debug("DgmmsgList ctrl more then");
            $scope.addList(data);
            $scope.$broadcast('scroll.infiniteScrollComplete');
        });
    };

    $scope.init();
    ctrlReinitMap.remove('DgmmsgListCtrl');
});
