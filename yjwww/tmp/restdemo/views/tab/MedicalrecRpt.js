/**
 * MedicalrecRpt，病历之检查报告详细
 */
appctrl.controller('MedicalrecRptCtrl', function($scope, $rootScope, $location, $log, Storage, ENV, CommonService, MedicalrecRptService) {
    $log.debug("enter MedicalrecRpt ctrl");
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
        $log.debug("MedicalrecRpt ctrl beforeEnter");
    });
    /**
     * 进入后
     */
    $scope.$on('$ionicView.afterEnter', function() {
        $log.debug("MedicalrecRpt ctrl afterEnter");
        if (ctrlReinitMap.get('MedicalrecRptCtrl')) {
            ctrlReinitMap.remove('MedicalrecRptCtrl');
            $log.debug("MedicalrecRpt ctrl afterEnter init");
            $scope.init();
        }
	});
    /**
     * 结束后
     */
	$scope.$on('$destroy', function() {
		$log.debug("MedicalrecRpt ctrl destroy");
	});
    /**
     * 初始化
     */
    $scope.init=function(){
        $log.debug("MedicalrecRpt ctrl init id="+id);
		$scope.get();
    };
    /**
     * 获取本地对象
     */
    $scope.getlocal=function(){
        $log.debug("MedicalrecRpt ctrl getlocal id="+id);
        if(isblank0(id)){
            $scope.obj= _.clone(_MedicalrecRpt);
        }else{
            $scope.obj=MedicalrecRptService.getlocal(id);
        }
        $log.debug($scope.obj);
    };
    /**
     * 获取网络对象
     */
    $scope.get=function(){
		MedicalrecRptService.get(id).then(function (data) {
			$log.debug("MedicalrecRpt ctrl get then");
			$scope.obj=data;
		});
    };
    $scope.init();
    ctrlReinitMap.remove('MedicalrecRptCtrl');
});
