/**
 * OrderrdetailFinished，订单详细详细
 */
appctrl.controller('OrderrdetailFinishedCtrl', function($scope, $rootScope, $log, $timeout,
                                             $ionicTabsDelegate, $ionicPopover, $ionicModal, $ionicLoading,
                                             $location, $state,
                                             $cordovaNetwork, $cordovaGoogleAnalytics,
                                             $stateParams,
                                             ENV,CommonService,OrderrdetailFinishedService) {
    $log.debug("enter OrderrdetailFinished ctrl");
	/**参数*/
    var id = $stateParams.id;
    /**页面对象*/
    $scope.vm={};
    $scope.vm.isedit=false;
    if(id==='0')
        $scope.vm.isedit=true;
	/**对象*/
	$scope.obj={};
    /**
     * 进入前
     */
    $scope.$on('$ionicView.beforeEnter', function() {
        $log.debug("OrderrdetailFinished ctrl beforeEnter");
    });
    /**
     * 进入后
     */
    $scope.$on('$ionicView.afterEnter', function() {
        $log.debug("OrderrdetailFinished ctrl afterEnter");
        if (ctrlReinitMap.get('OrderrdetailFinishedCtrl')) {
            ctrlReinitMap.remove('OrderrdetailFinishedCtrl');
            $log.debug("OrderrdetailFinished ctrl afterEnter init");
            $scope.init();
        }
	});
    /**
     * 结束后
     */
	$scope.$on('$destroy', function() {
		$log.debug("OrderrdetailFinished ctrl destroy");
	});
    /**
     * 初始化
     */
    $scope.init=function(){
        $log.debug("OrderrdetailFinished ctrl init id="+id);
		$scope.get();
    };
    /**
     * 获取本地对象
     */
    $scope.getlocal=function(){
        $log.debug("OrderrdetailFinished ctrl getlocal id="+id);
        if(isblank0(id)){
            $scope.obj= _.clone(_OrderrdetailFinished);
        }else{
            $scope.obj=OrderrdetailFinishedService.getlocal(id);
        }
        $log.debug($scope.obj);
    };
    /**
     * 获取网络对象
     */
    $scope.get=function(){
        $log.debug("OrderrdetailFinished ctrl get id="+id);
        if(isblank0(id)) {
            OrderrdetailFinishedService.newget().then(function (data) {
                $log.debug("OrderrdetailFinished ctrl newget then");
                $scope.obj=data;
            });
        }else{
            OrderrdetailFinishedService.get(id).then(function (data) {
                $log.debug("OrderrdetailFinished ctrl get then");
                $scope.obj=data;
            });
        }
    };
    /**
     * 保存
     */
    $scope.save=function(){
        $log.debug("OrderrdetailFinished ctrl get id="+id);
        $log.debug($scope.obj)
        if(isblank0(id)) {
            OrderrdetailFinishedService.create($scope.obj).then(function (data) {
                $log.debug("OrderrdetailFinished ctrl save then");
                $scope.obj=data;
                $location.path("/tab/OrderrdetailFinished/"+$scope.obj.id);
            });
        }else{
            OrderrdetailFinishedService.update($scope.obj).then(function (data) {
                $log.debug("OrderrdetailFinished ctrl update then");
                $scope.obj=data;
                $location.path("/tab/OrderrdetailFinished/"+$scope.obj.id);
            });
        }
    };
    /**
     * 点击了叉叉，如果是id=0，返回上一页
     */
    $scope.clickx=function(){
        if(id==='0')
            goBack();
    };
    $scope.init();
    ctrlReinitMap.remove('OrderrdetailFinishedCtrl');
});
