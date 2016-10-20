/**
 * Wwwhome，手机页首页配置详细
 */
appctrl.controller('WwwhomeCtrl', function($scope, $rootScope, $location, $log, Storage, ENV, CommonService, WwwhomeService) {
    $log.debug("enter Wwwhome ctrl");
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
        $log.debug("Wwwhome ctrl beforeEnter");
    });
    /**
     * 进入后
     */
    $scope.$on('$ionicView.afterEnter', function() {
        $log.debug("Wwwhome ctrl afterEnter");
        if (ctrlReinitMap.get('WwwhomeCtrl')) {
            ctrlReinitMap.remove('WwwhomeCtrl');
            $log.debug("Wwwhome ctrl afterEnter init");
            $scope.init();
        }
	});
    /**
     * 结束后
     */
	$scope.$on('$destroy', function() {
		$log.debug("Wwwhome ctrl destroy");
	});
    /**
     * 初始化
     */
    $scope.init=function(){
        $log.debug("Wwwhome ctrl init id="+id);
		$scope.get();
    };
    /**
     * 获取本地对象
     */
    $scope.getlocal=function(){
        $log.debug("Wwwhome ctrl getlocal id="+id);
        if(isblank0(id)){
            $scope.obj= _.clone(_Wwwhome);
        }else{
            $scope.obj=WwwhomeService.getlocal(id);
        }
        $log.debug($scope.obj);
    };
    /**
     * 获取网络对象
     */
    $scope.get=function(){
		WwwhomeService.get(id).then(function (data) {
			$log.debug("Wwwhome ctrl get then");
			$scope.obj=data;
		});
    };
    $scope.init();
    ctrlReinitMap.remove('WwwhomeCtrl');
});
