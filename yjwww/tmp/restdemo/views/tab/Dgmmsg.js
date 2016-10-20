/**
 * Dgmmsg，药师患者聊天记录详细
 */
appctrl.controller('DgmmsgCtrl', function($scope, $rootScope, $location, $log, Storage, ENV, CommonService, DgmmsgService) {
    $log.debug("enter Dgmmsg ctrl");
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
		DgmmsgService.get(id).then(function (data) {
			$log.debug("Dgmmsg ctrl get then");
			$scope.obj=data;
		});
    };
    $scope.init();
    ctrlReinitMap.remove('DgmmsgCtrl');
});
