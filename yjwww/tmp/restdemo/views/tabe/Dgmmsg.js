/**
 * Dgmmsg，药师患者聊天记录详细
 */
appctrl.controller('DgmmsgCtrl', function($scope, $rootScope, $log, $timeout,
                                             $ionicTabsDelegate, $ionicPopover, $ionicModal, $ionicLoading,
                                             $location, $state,
                                             $cordovaNetwork, $cordovaGoogleAnalytics,
                                             $stateParams,
                                             ENV,CommonService,DgmmsgService) {
    $log.debug("enter Dgmmsg ctrl");
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
        $log.debug("Dgmmsg ctrl beforeEnter");
    });
    /**
     * 进入后
     */
    $scope.$on('$ionicView.afterEnter', function() {
        $log.debug("Dgmmsg ctrl afterEnter");
        if (ctrlReinitMap.get('DgmmsgCtrl')) {
            ctrlReinitMap.remove('DgmmsgCtrl');
            $log.debug("Dgmmsg ctrl afterEnter init");
            $scope.init();
        }
	});
    /**
     * 结束后
     */
	$scope.$on('$destroy', function() {
		$log.debug("Dgmmsg ctrl destroy");
	});
    /**
     * 初始化
     */
    $scope.init=function(){
        $log.debug("Dgmmsg ctrl init id="+id);
		$scope.get();
    };
    /**
     * 获取本地对象
     */
    $scope.getlocal=function(){
        $log.debug("Dgmmsg ctrl getlocal id="+id);
        if(isblank0(id)){
            $scope.obj= _.clone(_Dgmmsg);
        }else{
            $scope.obj=DgmmsgService.getlocal(id);
        }
        $log.debug($scope.obj);
    };
    /**
     * 获取网络对象
     */
    $scope.get=function(){
        $log.debug("Dgmmsg ctrl get id="+id);
        if(isblank0(id)) {
            DgmmsgService.newget().then(function (data) {
                $log.debug("Dgmmsg ctrl newget then");
                $scope.obj=data;
            });
        }else{
            DgmmsgService.get(id).then(function (data) {
                $log.debug("Dgmmsg ctrl get then");
                $scope.obj=data;
            });
        }
    };
    /**
     * 保存
     */
    $scope.save=function(){
        $log.debug("Dgmmsg ctrl get id="+id);
        $log.debug($scope.obj)
        if(isblank0(id)) {
            DgmmsgService.create($scope.obj).then(function (data) {
                $log.debug("Dgmmsg ctrl save then");
                $scope.obj=data;
                $location.path("/tab/Dgmmsg/"+$scope.obj.id);
            });
        }else{
            DgmmsgService.update($scope.obj).then(function (data) {
                $log.debug("Dgmmsg ctrl update then");
                $scope.obj=data;
                $location.path("/tab/Dgmmsg/"+$scope.obj.id);
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
    ctrlReinitMap.remove('DgmmsgCtrl');
});
