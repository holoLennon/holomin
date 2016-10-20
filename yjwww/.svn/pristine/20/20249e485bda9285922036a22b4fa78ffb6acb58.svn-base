/**
 * Seller，业务员详细
 */
appctrl.controller('SellerCtrl', function($scope, $rootScope, $location, $log, Storage, ENV, CommonService, SellerService) {
    $log.debug("enter Seller ctrl");
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
        $log.debug("Seller ctrl beforeEnter");
    });
    /**
     * 进入后
     */
    $scope.$on('$ionicView.afterEnter', function() {
        $log.debug("Seller ctrl afterEnter");
        if (ctrlReinitMap.get('SellerCtrl')) {
            ctrlReinitMap.remove('SellerCtrl');
            $log.debug("Seller ctrl afterEnter init");
            $scope.init();
        }
	});
    /**
     * 结束后
     */
	$scope.$on('$destroy', function() {
		$log.debug("Seller ctrl destroy");
	});
    /**
     * 初始化
     */
    $scope.init=function(){
        $log.debug("Seller ctrl init id="+id);
		$scope.get();
    };
    /**
     * 获取本地对象
     */
    $scope.getlocal=function(){
        $log.debug("Seller ctrl getlocal id="+id);
        if(isblank0(id)){
            $scope.obj= _.clone(_Seller);
        }else{
            $scope.obj=SellerService.getlocal(id);
        }
        $log.debug($scope.obj);
    };
    /**
     * 获取网络对象
     */
    $scope.get=function(){
		SellerService.get(id).then(function (data) {
			$log.debug("Seller ctrl get then");
			$scope.obj=data;
		});
    };
    $scope.init();
    ctrlReinitMap.remove('SellerCtrl');
});
