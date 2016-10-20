/**
 * OrderrSnSearchhis，订单号搜索历史详细
 */
appctrl.controller('OrderrSnSearchhisCtrl', function($scope, $rootScope, $location, $log, Storage, ENV, CommonService, OrderrSnSearchhisService) {
    $log.debug("enter OrderrSnSearchhis ctrl");
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
        $log.debug("OrderrSnSearchhis ctrl beforeEnter");
    });
    /**
     * 进入后
     */
    $scope.$on('$ionicView.afterEnter', function() {
        $log.debug("OrderrSnSearchhis ctrl afterEnter");
        if (ctrlReinitMap.get('OrderrSnSearchhisCtrl')) {
            ctrlReinitMap.remove('OrderrSnSearchhisCtrl');
            $log.debug("OrderrSnSearchhis ctrl afterEnter init");
            $scope.init();
        }
	});
    /**
     * 结束后
     */
	$scope.$on('$destroy', function() {
		$log.debug("OrderrSnSearchhis ctrl destroy");
	});
    /**
     * 初始化
     */
    $scope.init=function(){
        $log.debug("OrderrSnSearchhis ctrl init id="+id);
		$scope.get();
    };
    /**
     * 获取本地对象
     */
    $scope.getlocal=function(){
        $log.debug("OrderrSnSearchhis ctrl getlocal id="+id);
        if(isblank0(id)){
            $scope.obj= _.clone(_OrderrSnSearchhis);
        }else{
            $scope.obj=OrderrSnSearchhisService.getlocal(id);
        }
        $log.debug($scope.obj);
    };
    /**
     * 获取网络对象
     */
    $scope.get=function(){
		OrderrSnSearchhisService.get(id).then(function (data) {
			$log.debug("OrderrSnSearchhis ctrl get then");
			$scope.obj=data;
		});
    };
    $scope.init();
    ctrlReinitMap.remove('OrderrSnSearchhisCtrl');
});
