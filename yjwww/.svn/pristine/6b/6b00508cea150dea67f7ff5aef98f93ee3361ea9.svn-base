/**
 * Orderrdetail，订单详细详细
 */
appctrl.controller('OrderrdetailCtrl', function($scope, $rootScope, $location, $log, Storage, ENV, CommonService, OrderrdetailService) {
    $log.debug("enter Orderrdetail ctrl");
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
        $log.debug("Orderrdetail ctrl beforeEnter");
    });
    /**
     * 进入后
     */
    $scope.$on('$ionicView.afterEnter', function() {
        $log.debug("Orderrdetail ctrl afterEnter");
        if (ctrlReinitMap.get('OrderrdetailCtrl')) {
            ctrlReinitMap.remove('OrderrdetailCtrl');
            $log.debug("Orderrdetail ctrl afterEnter init");
            $scope.init();
        }
	});
    /**
     * 结束后
     */
	$scope.$on('$destroy', function() {
		$log.debug("Orderrdetail ctrl destroy");
	});
    /**
     * 初始化
     */
    $scope.init=function(){
        $log.debug("Orderrdetail ctrl init id="+id);
		$scope.get();
    };
    /**
     * 获取本地对象
     */
    $scope.getlocal=function(){
        $log.debug("Orderrdetail ctrl getlocal id="+id);
        if(isblank0(id)){
            $scope.obj= _.clone(_Orderrdetail);
        }else{
            $scope.obj=OrderrdetailService.getlocal(id);
        }
        $log.debug($scope.obj);
    };
    /**
     * 获取网络对象
     */
    $scope.get=function(){
		OrderrdetailService.get(id).then(function (data) {
			$log.debug("Orderrdetail ctrl get then");
			$scope.obj=data;
		});
    };
    $scope.init();
    ctrlReinitMap.remove('OrderrdetailCtrl');
});
