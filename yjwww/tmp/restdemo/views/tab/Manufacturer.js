/**
 * Manufacturer，药品生产厂家详细
 */
appctrl.controller('ManufacturerCtrl', function($scope, $rootScope, $location, $log, Storage, ENV, CommonService, ManufacturerService) {
    $log.debug("enter Manufacturer ctrl");
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
        $log.debug("Manufacturer ctrl beforeEnter");
    });
    /**
     * 进入后
     */
    $scope.$on('$ionicView.afterEnter', function() {
        $log.debug("Manufacturer ctrl afterEnter");
        if (ctrlReinitMap.get('ManufacturerCtrl')) {
            ctrlReinitMap.remove('ManufacturerCtrl');
            $log.debug("Manufacturer ctrl afterEnter init");
            $scope.init();
        }
	});
    /**
     * 结束后
     */
	$scope.$on('$destroy', function() {
		$log.debug("Manufacturer ctrl destroy");
	});
    /**
     * 初始化
     */
    $scope.init=function(){
        $log.debug("Manufacturer ctrl init id="+id);
		$scope.get();
    };
    /**
     * 获取本地对象
     */
    $scope.getlocal=function(){
        $log.debug("Manufacturer ctrl getlocal id="+id);
        if(isblank0(id)){
            $scope.obj= _.clone(_Manufacturer);
        }else{
            $scope.obj=ManufacturerService.getlocal(id);
        }
        $log.debug($scope.obj);
    };
    /**
     * 获取网络对象
     */
    $scope.get=function(){
		ManufacturerService.get(id).then(function (data) {
			$log.debug("Manufacturer ctrl get then");
			$scope.obj=data;
		});
    };
    $scope.init();
    ctrlReinitMap.remove('ManufacturerCtrl');
});
