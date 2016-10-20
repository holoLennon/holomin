/**
 * MedicalrecPageList，病历之病史页面列表
 */
appctrl.controller('MedicalrecPageListCtrl', function($scope, $rootScope,$timeout,
                                           $ionicTabsDelegate, $ionicPopover, $ionicModal, $ionicLoading,
                                           $location, $state,
                                           $cordovaNetwork, $cordovaGoogleAnalytics,$log,Storage,
                                           ENV,MedicalrecPageService,$stateParams) {
    $log.debug("enter MedicalrecPageList ctrl");
    /**页码*/
    $scope.page=_.clone(_Page);
    /**页面显示的列表*/
    $scope.list=[];
  var memberId = $stateParams.memberId;

    /**
     * 进入前
     */
    $scope.$on('$ionicView.beforeEnter', function() {
        $log.debug("MedicalrecPageList ctrl beforeEnter");
    });
    /**
     * 进入后
     */
    $scope.$on('$ionicView.afterEnter', function() {
        $log.debug("MedicalrecPageList ctrl afterEnter");
        if (ctrlReinitMap.get('MedicalrecPageListCtrl')) {
            ctrlReinitMap.remove('MedicalrecPageListCtrl');
            $log.debug("MedicalrecPageList ctrl afterEnter init");
            $scope.init();
        }
    });

    /**
     * 初始化
     */
    $scope.init=function(){
        $log.debug("MedicalrecPageList ctrl init ");
	    $scope.page.where=Storage.get("MedicalrecPageList"+"QueryWhere");
      $scope.page.where="statusValidOrNot=1 and medicalrecId="+memberId;
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
        MedicalrecPageService.first(null,$scope.page).then(function (data) {
            $log.debug("MedicalrecPageList ctrl query then");
            $scope.addList(data);
            $scope.$broadcast('scroll.refreshComplete');
        });

    };

    /**
     * 下拉加载更多查询
     */
    $scope.more=function(){
        $log.debug("MedicalrecPageList ctrl more=========");
        if(!$scope.page.hasNextPage){
            return;
        }
        MedicalrecPageService.more($scope.page).then(function (data) {
            $log.debug("MedicalrecPageList ctrl more then");
            $scope.addList(data);
            $scope.$broadcast('scroll.infiniteScrollComplete');
        });
    };

    $scope.gotoMedicalPage=function(id){{
      $scope.rx('#/tab/MedicalrecPage/'+id);
    }};


  $scope.init();
    ctrlReinitMap.remove('MedicalrecPageListCtrl');
});
