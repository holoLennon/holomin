/**
 * OrderrSnSearchhis，订单号搜索历史详细
 */
appctrl.controller('OrderrSnSearchhisCtrl', function($scope, $rootScope, $log, $timeout,
                                             $ionicTabsDelegate, $ionicPopover, $ionicModal, $ionicLoading,
                                             $location, $state,
                                             $cordovaNetwork, $cordovaGoogleAnalytics,
                                             $stateParams,
                                             ENV,CommonService,OrderrSnSearchhisService) {
    $log.debug("enter OrderrSnSearchhis ctrl");
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
        $log.debug("OrderrSnSearchhis ctrl beforeEnter");
    });
    /**
     * 进入后
     */
    $scope.$on('$ionicView.afterEnter', function() {
        $log.debug("OrderrSnSearchhis ctrl afterEnter");
        if (ctrlReinitMap.get('OrderrSnSearchhisCtrl')) {
            ctrlReinitMap.remove('OrderrSnSearchhisCtrl');
            $log.debug("OrderrSnSearchhis ctrl afterEnter init");
            $scope.init();
        }
	});
    /**
     * 结束后
     */
	$scope.$on('$destroy', function() {
		$log.debug("OrderrSnSearchhis ctrl destroy");
	});
    /**
     * 初始化
     */
    $scope.init=function(){
        $log.debug("OrderrSnSearchhis ctrl init id="+id);
		$scope.get();
    };
    /**
     * 获取本地对象
     */
    $scope.getlocal=function(){
        $log.debug("OrderrSnSearchhis ctrl getlocal id="+id);
        if(isblank0(id)){
            $scope.obj= _.clone(_OrderrSnSearchhis);
        }else{
            $scope.obj=OrderrSnSearchhisService.getlocal(id);
        }
        $log.debug($scope.obj);
    };
    /**
     * 获取网络对象
     */
    $scope.get=function(){
        $log.debug("OrderrSnSearchhis ctrl get id="+id);
        if(isblank0(id)) {
            OrderrSnSearchhisService.newget().then(function (data) {
                $log.debug("OrderrSnSearchhis ctrl newget then");
                $scope.obj=data;
            });
        }else{
            OrderrSnSearchhisService.get(id).then(function (data) {
                $log.debug("OrderrSnSearchhis ctrl get then");
                $scope.obj=data;
            });
        }
    };
    /**
     * 保存
     */
    $scope.save=function(){
        $log.debug("OrderrSnSearchhis ctrl get id="+id);
        $log.debug($scope.obj)
        if(isblank0(id)) {
            OrderrSnSearchhisService.create($scope.obj).then(function (data) {
                $log.debug("OrderrSnSearchhis ctrl save then");
                $scope.obj=data;
                $location.path("/tab/OrderrSnSearchhis/"+$scope.obj.id);
            });
        }else{
            OrderrSnSearchhisService.update($scope.obj).then(function (data) {
                $log.debug("OrderrSnSearchhis ctrl update then");
                $scope.obj=data;
                $location.path("/tab/OrderrSnSearchhis/"+$scope.obj.id);
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
    ctrlReinitMap.remove('OrderrSnSearchhisCtrl');
});
