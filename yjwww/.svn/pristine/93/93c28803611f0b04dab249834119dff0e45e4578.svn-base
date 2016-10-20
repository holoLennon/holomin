/**
 * ProductTypeLinkProduct，商品类型包含商品详细
 */
appctrl.controller('ProductTypeLinkProductCtrl', function($scope, $rootScope, $location, $log, Storage, ENV, CommonService, ProductTypeLinkProductService) {
    $log.debug("enter ProductTypeLinkProduct ctrl");
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
        $log.debug("ProductTypeLinkProduct ctrl beforeEnter");
    });
    /**
     * 进入后
     */
    $scope.$on('$ionicView.afterEnter', function() {
        $log.debug("ProductTypeLinkProduct ctrl afterEnter");
        if (ctrlReinitMap.get('ProductTypeLinkProductCtrl')) {
            ctrlReinitMap.remove('ProductTypeLinkProductCtrl');
            $log.debug("ProductTypeLinkProduct ctrl afterEnter init");
            $scope.init();
        }
	});
    /**
     * 结束后
     */
	$scope.$on('$destroy', function() {
		$log.debug("ProductTypeLinkProduct ctrl destroy");
	});
    /**
     * 初始化
     */
    $scope.init=function(){
        $log.debug("ProductTypeLinkProduct ctrl init id="+id);
		$scope.get();
    };
    /**
     * 获取本地对象
     */
    $scope.getlocal=function(){
        $log.debug("ProductTypeLinkProduct ctrl getlocal id="+id);
        if(isblank0(id)){
            $scope.obj= _.clone(_ProductTypeLinkProduct);
        }else{
            $scope.obj=ProductTypeLinkProductService.getlocal(id);
        }
        $log.debug($scope.obj);
    };
    /**
     * 获取网络对象
     */
    $scope.get=function(){
		ProductTypeLinkProductService.get(id).then(function (data) {
			$log.debug("ProductTypeLinkProduct ctrl get then");
			$scope.obj=data;
		});
    };
    $scope.init();
    ctrlReinitMap.remove('ProductTypeLinkProductCtrl');
});
