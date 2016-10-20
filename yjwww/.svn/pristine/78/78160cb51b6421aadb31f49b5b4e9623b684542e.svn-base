/**
 * Sales，业务员详细
 */
appctrl.controller('SalesmanCtrl', function($scope, $rootScope, $log, $timeout,
                                             $ionicTabsDelegate, $ionicPopover, $ionicModal, $ionicLoading,
                                             $location, $state,
                                             $cordovaNetwork,$ionicHistory, $cordovaGoogleAnalytics,
                                             $stateParams,Storage,
                                             ENV,CommonService,SellerService) {
    $log.debug("enter Salesman ctrl");
	/**参数*/
    $scope.user=Storage.get(LOGINED_USER_C);
    var id = $stateParams.id;

    id=($scope.user)?$scope.user.id:0;

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
        $log.debug("Salesman ctrl beforeEnter");
        $scope.user=Storage.get(LOGINED_USER_C);
        id=($scope.user)?$scope.user.id:0;
    });
    /**
     * 进入后
     */
    $scope.$on('$ionicView.afterEnter', function() {
        $log.debug("Salesman ctrl afterEnter");
        if (ctrlReinitMap.get('SalesmanCtrl')) {
            ctrlReinitMap.remove('SalesmanCtrl');
            $log.debug("Salesman ctrl afterEnter init");
            $scope.init();
        }
	});
    /**
     * 初始化
     */
    $scope.init=function(){
        $log.debug("Salesman ctrl init id="+id);
		$scope.get();
    };
    /**
     * 获取本地对象
     */
    $scope.getlocal=function(){
        $log.debug("Salesman ctrl getlocal id="+id);
        if(isblank0(id)){
            $scope.obj= _.clone(_Seller);
        }else{
            $scope.obj=SellerService.getlocal(id);
        }
        $log.debug($scope.obj);
    };
    /**
     * 获取网络对象
     */
    $scope.get=function(){
        $log.debug("Salesman ctrl get id="+id);
        if(isblank0(id)) {
            SellerService.newget().then(function (data) {
                $log.debug("Salesman ctrl newget then");
                $scope.obj=data;
            });
        }else{
            SellerService.get(id).then(function (data) {
                $log.debug("Salesman ctrl get then");
                $scope.obj=data;
            });
        }
    };
    /**
     * 保存
     */
    $scope.save=function(){
        $log.debug("Salesman ctrl get id="+id);
        $log.debug($scope.obj)
        if(isblank0(id)) {
            SellerService.create($scope.obj).then(function (data) {
                $log.debug("Salesman ctrl save then");
                $scope.obj=data;
                $location.path("/tab/Mystore/"+$scope.obj.id);
            });
        }else{
            SellerService.update($scope.obj).then(function (data) {
                $log.debug("Salesman ctrl update then");
                $scope.obj=data;
                $ionicHistory.goBack();
            });
        }
    };

    $scope.init();
    ctrlReinitMap.remove('SalesmanCtrl');
});
