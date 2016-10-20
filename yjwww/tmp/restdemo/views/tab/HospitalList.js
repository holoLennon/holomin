/**
 * HospitalList，医院列表
 */
appctrl.controller('HospitalListCtrl', function($scope, $rootScope, $location, $log, Storage, ENV, CommonService, HospitalService) {
    $log.debug("enter HospitalList ctrl");
    /**页码*/
    $scope.page=_.clone(_Page);
    /**页面显示的列表*/
    $scope.list=[];
    /**
     * 进入前
     */
    $scope.$on('$ionicView.beforeEnter', function() {
        $log.debug("HospitalList ctrl beforeEnter");
    });
    /**
     * 进入后
     */
    $scope.$on('$ionicView.afterEnter', function() {
        $log.debug("HospitalList ctrl afterEnter");
        if (ctrlReinitMap.get('HospitalListCtrl')) {
            ctrlReinitMap.remove('HospitalListCtrl');
            $log.debug("HospitalList ctrl afterEnter init");
            $scope.init();
        }
    });

    /**
     * 初始化
     */
    $scope.init=function(){
        $log.debug("HospitalList ctrl init ");
	    $scope.page.where=Storage.get("HospitalList"+"QueryWhere");
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
        HospitalService.first(null,$scope.page).then(function (data) {
            $log.debug("HospitalList ctrl query then");
            $scope.addList(data);
            $scope.$broadcast('scroll.refreshComplete');
        });

    };

    /**
     * 下拉加载更多查询
     */
    $scope.more=function(){
        $log.debug("HospitalList ctrl more=========");
        if(!$scope.page.hasNextPage){
            return;
        }
        HospitalService.more($scope.page).then(function (data) {
            $log.debug("HospitalList ctrl more then");
            $scope.addList(data);
            $scope.$broadcast('scroll.infiniteScrollComplete');
        });
    };

    $scope.init();
    ctrlReinitMap.remove('HospitalListCtrl');
});
