/**
 * Orderr，订单详细
 */
appctrl.controller('OrderrCtrl', function($scope, $rootScope, $location, $log, Storage, ENV, CommonService, OrderrService) {
    $log.debug("enter Orderr ctrl");
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
        $log.debug("Orderr ctrl beforeEnter");
    });
    /**
     * 进入后
     */
    $scope.$on('$ionicView.afterEnter', function() {
        $log.debug("Orderr ctrl afterEnter");
        if (ctrlReinitMap.get('OrderrCtrl')) {
            ctrlReinitMap.remove('OrderrCtrl');
            $log.debug("Orderr ctrl afterEnter init");
            $scope.init();
        }
	});
    /**
     * 结束后
     */
	$scope.$on('$destroy', function() {
		$log.debug("Orderr ctrl destroy");
	});
    /**
     * 初始化
     */
    $scope.init=function(){
        $log.debug("Orderr ctrl init id="+id);
		$scope.get();
    };
    /**
     * 获取本地对象
     */
    $scope.getlocal=function(){
        $log.debug("Orderr ctrl getlocal id="+id);
        if(isblank0(id)){
            $scope.obj= _.clone(_Orderr);
        }else{
            $scope.obj=OrderrService.getlocal(id);
        }
        $log.debug($scope.obj);
    };
    /**
     * 获取网络对象
     */
    $scope.get=function(){
		OrderrService.get(id).then(function (data) {
			$log.debug("Orderr ctrl get then");
			$scope.obj=data;
		});
    };
    $scope.init();
    ctrlReinitMap.remove('OrderrCtrl');
});