/**
 * Dmmsg，医患聊天记录详细
 */
appctrl.controller('DmmsgCtrl', function($scope, $rootScope, $log, $timeout,
                                             $ionicTabsDelegate, $ionicPopover, $ionicModal, $ionicLoading,
                                             $location, $state,
                                             $cordovaNetwork, $cordovaGoogleAnalytics,
                                             $stateParams,
                                             ENV,CommonService,DmmsgService) {
    $log.debug("enter Dmmsg ctrl");
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
        $log.debug("Dmmsg ctrl beforeEnter");
    });
    /**
     * 进入后
     */
    $scope.$on('$ionicView.afterEnter', function() {
        $log.debug("Dmmsg ctrl afterEnter");
        if (ctrlReinitMap.get('DmmsgCtrl')) {
            ctrlReinitMap.remove('DmmsgCtrl');
            $log.debug("Dmmsg ctrl afterEnter init");
            $scope.init();
        }
	});
    /**
     * 结束后
     */
	$scope.$on('$destroy', function() {
		$log.debug("Dmmsg ctrl destroy");
	});
    /**
     * 初始化
     */
    $scope.init=function(){
        $log.debug("Dmmsg ctrl init id="+id);
		$scope.get();
    };
    /**
     * 获取本地对象
     */
    $scope.getlocal=function(){
        $log.debug("Dmmsg ctrl getlocal id="+id);
        if(isblank0(id)){
            $scope.obj= _.clone(_Dmmsg);
        }else{
            $scope.obj=DmmsgService.getlocal(id);
        }
        $log.debug($scope.obj);
    };
    /**
     * 获取网络对象
     */
    $scope.get=function(){
        $log.debug("Dmmsg ctrl get id="+id);
        if(isblank0(id)) {
            DmmsgService.newget().then(function (data) {
                $log.debug("Dmmsg ctrl newget then");
                $scope.obj=data;
            });
        }else{
            DmmsgService.get(id).then(function (data) {
                $log.debug("Dmmsg ctrl get then");
                $scope.obj=data;
            });
        }
    };
    /**
     * 保存
     */
    $scope.save=function(){
        $log.debug("Dmmsg ctrl get id="+id);
        $log.debug($scope.obj)
        if(isblank0(id)) {
            DmmsgService.create($scope.obj).then(function (data) {
                $log.debug("Dmmsg ctrl save then");
                $scope.obj=data;
                $location.path("/tab/Dmmsg/"+$scope.obj.id);
            });
        }else{
            DmmsgService.update($scope.obj).then(function (data) {
                $log.debug("Dmmsg ctrl update then");
                $scope.obj=data;
                $location.path("/tab/Dmmsg/"+$scope.obj.id);
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
    ctrlReinitMap.remove('DmmsgCtrl');
});
