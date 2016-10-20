/**
 * CmscontentExtTxtList，内容列表
 */
appctrl.controller('CmscontentExtTxtListCtrl', function($scope, $rootScope, $location, $log, Storage, ENV, CommonService, CmscontentExtTxtService) {
    $log.debug("enter CmscontentExtTxtList ctrl");
    /**页码*/
    $scope.page=_.clone(_Page);
    /**页面显示的列表*/
    $scope.list=[];
    /**
     * 进入前
     */
    $scope.$on('$ionicView.beforeEnter', function() {
        $log.debug("CmscontentExtTxtList ctrl beforeEnter");
    });
    /**
     * 进入后
     */
    $scope.$on('$ionicView.afterEnter', function() {
        $log.debug("CmscontentExtTxtList ctrl afterEnter");
        if (ctrlReinitMap.get('CmscontentExtTxtListCtrl')) {
            ctrlReinitMap.remove('CmscontentExtTxtListCtrl');
            $log.debug("CmscontentExtTxtList ctrl afterEnter init");
            $scope.init();
        }
    });

    /**
     * 初始化
     */
    $scope.init=function(){
        $log.debug("CmscontentExtTxtList ctrl init ");
	    $scope.page.where=Storage.get("CmscontentExtTxtList"+"QueryWhere");
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
        CmscontentExtTxtService.first(null,$scope.page).then(function (data) {
            $log.debug("CmscontentExtTxtList ctrl query then");
            $scope.addList(data);
            $scope.$broadcast('scroll.refreshComplete');
        });

    };

    /**
     * 下拉加载更多查询
     */
    $scope.more=function(){
        $log.debug("CmscontentExtTxtList ctrl more=========");
        if(!$scope.page.hasNextPage){
            return;
        }
        CmscontentExtTxtService.more($scope.page).then(function (data) {
            $log.debug("CmscontentExtTxtList ctrl more then");
            $scope.addList(data);
            $scope.$broadcast('scroll.infiniteScrollComplete');
        });
    };

    $scope.init();
    ctrlReinitMap.remove('CmscontentExtTxtListCtrl');
});
