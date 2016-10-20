/**
 * User，账号信息修改详细
 */
appctrl.controller('UserCtrl', function($scope, $rootScope, $location, $log, Storage, ENV, CommonService, UserService) {
    $log.debug("enter User ctrl");
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
        $log.debug("User ctrl beforeEnter");
    });
    /**
     * 进入后
     */
    $scope.$on('$ionicView.afterEnter', function() {
        $log.debug("User ctrl afterEnter");
        if (ctrlReinitMap.get('UserCtrl')) {
            ctrlReinitMap.remove('UserCtrl');
            $log.debug("User ctrl afterEnter init");
            $scope.init();
        }
	});
    /**
     * 结束后
     */
	$scope.$on('$destroy', function() {
		$log.debug("User ctrl destroy");
	});
    /**
     * 初始化
     */
    $scope.init=function(){
        $log.debug("User ctrl init id="+id);
		$scope.get();
    };
    /**
     * 获取本地对象
     */
    $scope.getlocal=function(){
        $log.debug("User ctrl getlocal id="+id);
        if(isblank0(id)){
            $scope.obj= _.clone(_User);
        }else{
            $scope.obj=UserService.getlocal(id);
        }
        $log.debug($scope.obj);
    };
    /**
     * 获取网络对象
     */
    $scope.get=function(){
		UserService.get(id).then(function (data) {
			$log.debug("User ctrl get then");
			$scope.obj=data;
		});
    };
    $scope.init();
    ctrlReinitMap.remove('UserCtrl');
});
