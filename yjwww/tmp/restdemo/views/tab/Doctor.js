/**
 * Doctor，医生会员详细
 */
appctrl.controller('DoctorCtrl', function($scope, $rootScope, $location, $log, Storage, ENV, CommonService, DoctorService) {
    $log.debug("enter Doctor ctrl");
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
        $log.debug("Doctor ctrl beforeEnter");
    });
    /**
     * 进入后
     */
    $scope.$on('$ionicView.afterEnter', function() {
        $log.debug("Doctor ctrl afterEnter");
        if (ctrlReinitMap.get('DoctorCtrl')) {
            ctrlReinitMap.remove('DoctorCtrl');
            $log.debug("Doctor ctrl afterEnter init");
            $scope.init();
        }
	});
    /**
     * 结束后
     */
	$scope.$on('$destroy', function() {
		$log.debug("Doctor ctrl destroy");
	});
    /**
     * 初始化
     */
    $scope.init=function(){
        $log.debug("Doctor ctrl init id="+id);
		$scope.get();
    };
    /**
     * 获取本地对象
     */
    $scope.getlocal=function(){
        $log.debug("Doctor ctrl getlocal id="+id);
        if(isblank0(id)){
            $scope.obj= _.clone(_Doctor);
        }else{
            $scope.obj=DoctorService.getlocal(id);
        }
        $log.debug($scope.obj);
    };
    /**
     * 获取网络对象
     */
    $scope.get=function(){
		DoctorService.get(id).then(function (data) {
			$log.debug("Doctor ctrl get then");
			$scope.obj=data;
		});
    };
    $scope.init();
    ctrlReinitMap.remove('DoctorCtrl');
});
