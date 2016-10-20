/**
 * MedicalrecHealth，病历之健康指标详细
 */
appctrl.controller('MedicalrecHealthCtrl', function($scope, $rootScope, $log, $timeout,
                                             $ionicTabsDelegate, $ionicPopover, $ionicModal, $ionicLoading,
                                             $location, $state,
                                             $cordovaNetwork, $cordovaGoogleAnalytics,
                                             $stateParams,Storage,
                                             ENV,CommonService,MedicalrecHealthService) {
    $log.debug("enter MedicalrecHealth ctrl");
	/**参数*/
    var id = $stateParams.id;
    /**页面对象*/
    $scope.vm={};
	/**对象*/
	$scope.obj={};
    /**
     * 进入前
     */
    $scope.$on('$ionicView.beforeEnter', function() {
        $log.debug("MedicalrecHealth ctrl beforeEnter");
    });
    /**
     * 进入后
     */
    $scope.$on('$ionicView.afterEnter', function() {
        $log.debug("MedicalrecHealth ctrl afterEnter");
        if (ctrlReinitMap.get('MedicalrecHealthCtrl')) {
            ctrlReinitMap.remove('MedicalrecHealthCtrl');
            $log.debug("MedicalrecHealth ctrl afterEnter init");
            $scope.init();
        }
	});
    /**
     * 结束后
     */
	$scope.$on('$destroy', function() {
		$log.debug("MedicalrecHealth ctrl destroy");
	});
    /**
     * 初始化
     */
    $scope.init=function(){
        $log.debug("MedicalrecHealth ctrl init id="+id);
		$scope.get();
    };
    /**
     * 获取本地对象
     */
    $scope.getlocal=function(){
        $log.debug("MedicalrecHealth ctrl getlocal id="+id);
        if(isblank0(id)){
            $scope.obj= _.clone(_MedicalrecHealth);
        }else{
            $scope.obj=MedicalrecHealthService.getlocal(id);
        }
        $log.debug($scope.obj);
    };
    /**
     * 获取网络对象
     */
    $scope.get=function(){
        $log.debug("MedicalrecHealth ctrl get id="+id);
        if(isblank0(id)) {
            MedicalrecHealthService.newget().then(function (data) {
                $log.debug("MedicalrecHealth ctrl newget then");
                $scope.obj=data;
            });
        }else{
            MedicalrecHealthService.get(id).then(function (data) {
                $log.debug("MedicalrecHealth ctrl get then");
                $scope.obj=data;
            });
        }
    };
    $scope.init();
    ctrlReinitMap.remove('MedicalrecHealthCtrl');
});
