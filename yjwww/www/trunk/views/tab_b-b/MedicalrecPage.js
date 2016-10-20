/**
 * MedicalrecPage，病历之病史页面详细
 */
appctrl.controller('MedicalrecPageCtrl', function($scope, $rootScope, $log, $timeout,
                                             $ionicTabsDelegate, $ionicPopover, $ionicModal, $ionicLoading,
                                             $location, $state,
                                             $cordovaNetwork, $cordovaGoogleAnalytics,
                                             $stateParams,
                                             ENV,CommonService,MedicalrecPageService,Storage) {
    $log.debug("enter MedicalrecPage ctrl");
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
        $log.debug("MedicalrecPage ctrl beforeEnter");
    });
    /**
     * 进入后
     */
    $scope.$on('$ionicView.afterEnter', function() {
        $log.debug("MedicalrecPage ctrl afterEnter");
        if (ctrlReinitMap.get('MedicalrecPageCtrl')) {
            ctrlReinitMap.remove('MedicalrecPageCtrl');
            $log.debug("MedicalrecPage ctrl afterEnter init");
            $scope.init();
        }
	});
    /**
     * 结束后
     */
	$scope.$on('$destroy', function() {
		$log.debug("MedicalrecPage ctrl destroy");
	});
    /**
     * 初始化
     */
    $scope.init=function(){
        $log.debug("MedicalrecPage ctrl init id="+id);
		$scope.get();
    };
    /**
     * 获取本地对象
     */
    $scope.getlocal=function(){
        $log.debug("MedicalrecPage ctrl getlocal id="+id);
        if(isblank0(id)){
            $scope.obj= _.clone(_MedicalrecPage);
        }else{
            $scope.obj=MedicalrecPageService.getlocal(id);
        }
        $log.debug($scope.obj);
    };
    /**
     * 获取网络对象
     */
    $scope.get=function(){
        $log.debug("MedicalrecPage ctrl get id="+id);
        if(isblank0(id)) {
            MedicalrecPageService.newget().then(function (data) {
                $log.debug("MedicalrecPage ctrl newget then");
                $scope.obj=data;
            });
        }else{
            MedicalrecPageService.get(id).then(function (data) {
                $log.debug("MedicalrecPage ctrl get then");
                $scope.obj=data;
            });
        }
    };
    $scope.init();
    ctrlReinitMap.remove('MedicalrecPageCtrl');
});
