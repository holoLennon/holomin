/**
 * DoctorList，医生列表查找
 */
appctrl.controller('DoctorListSearchCtrl', function($scope, $rootScope,$timeout,
                                                    $ionicTabsDelegate, $ionicPopover, $ionicModal, $ionicLoading,
                                                    $location, $state,$stateParams,
                                                    $cordovaNetwork, $cordovaGoogleAnalytics,$log,Storage,
                                                    ENV,DoctorService) {
    $log.debug("enter DoctorList ctrl");
    /**参数keyword*/
    $scope.kw = $stateParams.kw;
    /**页码*/
    $scope.page=_.clone(_Page);
    $scope.sellerId=0;
    if(Storage.get(LOGINED_USER_C)!=null){
        $scope.sellerId=Storage.get(LOGINED_USER_C).id;
    }
    /**页面显示的列表*/
    $scope.list=[];
    /**
     * 进入前
     */
    $scope.$on('$ionicView.beforeEnter', function() {
        $log.debug("DoctorList ctrl beforeEnter");
    });
    /**
     * 进入后
     */
    $scope.$on('$ionicView.afterEnter', function() {
        $log.debug("DoctorList ctrl afterEnter");
        if (ctrlReinitMap.get('DoctorListSearchCtrl')) {
            ctrlReinitMap.remove('DoctorListSearchCtrl');
            $log.debug("DoctorList ctrl afterEnter init");
            $scope.init();
        }
    });

    /**
     * 初始化查找医生
     */
    $scope.init=function(){
        $log.debug("DoctorList ctrl init ");
        $scope.page.where="name like '%"+$scope.kw+"%'and seller_id="+$scope.sellerId
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
        DoctorService.first(null,$scope.page).then(function (data) {
            $log.debug("DoctorList ctrl query then");
            $scope.addList(data);
            $scope.$broadcast('scroll.refreshComplete');
        });

    };

    /**
     * 下拉加载更多查询
     */
    $scope.more=function(){
        $log.debug("DoctorList ctrl more=========");
        if(!$scope.page.hasNextPage){
            return;
        }
        DoctorService.more($scope.page).then(function (data) {
            $log.debug("DoctorList ctrl more then");
            $scope.addList(data);
            $scope.$broadcast('scroll.infiniteScrollComplete');
        });
    };
    //跳到页面
    $scope.goUrlDoctor=function(obj){
        $scope.rx('#/tab/Doctor/'+obj.id);
    };
    $scope.init();
    ctrlReinitMap.remove('DoctorListSearchCtrl');
});
