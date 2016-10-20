/**
 * Dmmsg，医患聊天记录详细
 */
appctrl.controller('DmmsgCtrl', function($scope, $rootScope, $location, $log, Storage, ENV, CommonService, DmmsgService) {
    $log.debug("enter Dmmsg ctrl");
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
		DmmsgService.get(id).then(function (data) {
			$log.debug("Dmmsg ctrl get then");
			$scope.obj=data;
		});
    };
    $scope.init();
    ctrlReinitMap.remove('DmmsgCtrl');
});
