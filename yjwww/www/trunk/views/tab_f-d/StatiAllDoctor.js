/**
 * StatiAllDoctor，医生总统计详细
 */
appctrl.controller('StatiAllDoctorCtrl', function($scope, $rootScope, $log, $timeout,
                                             $ionicTabsDelegate, $ionicPopover, $ionicModal, $ionicLoading,
                                             $location, $state,
                                             $cordovaNetwork, $cordovaGoogleAnalytics,
                                             $stateParams,
                                             ENV,CommonService,StatiAllDoctorService) {
    $log.debug("enter StatiAllDoctor ctrl");
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
        $log.debug("StatiAllDoctor ctrl beforeEnter");
    });
    /**
     * 进入后
     */
    $scope.$on('$ionicView.afterEnter', function() {
        $log.debug("StatiAllDoctor ctrl afterEnter");
        if (ctrlReinitMap.get('StatiAllDoctorCtrl')) {
            ctrlReinitMap.remove('StatiAllDoctorCtrl');
            $log.debug("StatiAllDoctor ctrl afterEnter init");
            $scope.init();
        }
	});
    /**
     * 结束后
     */
	$scope.$on('$destroy', function() {
		$log.debug("StatiAllDoctor ctrl destroy");
	});
    /**
     * 初始化
     */
    $scope.init=function(){
        $log.debug("StatiAllDoctor ctrl init id="+id);
		$scope.get();
    };
    /**
     * 获取本地对象
     */
    $scope.getlocal=function(){
        $log.debug("StatiAllDoctor ctrl getlocal id="+id);
        if(isblank0(id)){
            $scope.obj= _.clone(_StatiAllDoctor);
        }else{
            $scope.obj=StatiAllDoctorService.getlocal(id);
        }
        $log.debug($scope.obj);
    };
    /**
     * 获取网络对象
     */
    $scope.get=function(){
        $log.debug("StatiAllDoctor ctrl get id="+id);
        if(isblank0(id)) {
            StatiAllDoctorService.newget().then(function (data) {
                $log.debug("StatiAllDoctor ctrl newget then");
                $scope.obj=data;
            });
        }else{
            StatiAllDoctorService.get(id).then(function (data) {
                $log.debug("StatiAllDoctor ctrl get then");
                $scope.obj=data;
            });
        }
    };
    /**
     * 保存
     */
    $scope.save=function(){
        $log.debug("StatiAllDoctor ctrl get id="+id);
        $log.debug($scope.obj)
        if(isblank0(id)) {
            StatiAllDoctorService.create($scope.obj).then(function (data) {
                $log.debug("StatiAllDoctor ctrl save then");
                $scope.obj=data;
                $location.path("/tab/StatiAllDoctor/"+$scope.obj.id);
            });
        }else{
            StatiAllDoctorService.update($scope.obj).then(function (data) {
                $log.debug("StatiAllDoctor ctrl update then");
                $scope.obj=data;
                $location.path("/tab/StatiAllDoctor/"+$scope.obj.id);
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
    ctrlReinitMap.remove('StatiAllDoctorCtrl');
});
