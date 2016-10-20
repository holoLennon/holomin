/**
 * ProductType，商品类型详细
 */
appctrl.controller('ProductTypeCtrl', function($scope, $rootScope, $location, $log, Storage, ENV, CommonService, ProductTypeService) {
    $log.debug("enter ProductType ctrl");
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
        $log.debug("ProductType ctrl beforeEnter");
    });
    /**
     * 进入后
     */
    $scope.$on('$ionicView.afterEnter', function() {
        $log.debug("ProductType ctrl afterEnter");
        if (ctrlReinitMap.get('ProductTypeCtrl')) {
            ctrlReinitMap.remove('ProductTypeCtrl');
            $log.debug("ProductType ctrl afterEnter init");
            $scope.init();
        }
	});
    /**
     * 结束后
     */
	$scope.$on('$destroy', function() {
		$log.debug("ProductType ctrl destroy");
	});
    /**
     * 初始化
     */
    $scope.init=function(){
        $log.debug("ProductType ctrl init id="+id);
		$scope.get();
    };
    /**
     * 获取本地对象
     */
    $scope.getlocal=function(){
        $log.debug("ProductType ctrl getlocal id="+id);
        if(isblank0(id)){
            $scope.obj= _.clone(_ProductType);
        }else{
            $scope.obj=ProductTypeService.getlocal(id);
        }
        $log.debug($scope.obj);
    };
    /**
     * 获取网络对象
     */
    $scope.get=function(){
		ProductTypeService.get(id).then(function (data) {
			$log.debug("ProductType ctrl get then");
			$scope.obj=data;
		});
    };
    /**
     * 根据ckey/id获取网络对象
     */
    $scope.getckey=function(){
        $log.debug("ProductType ctrl getckey id="+id);
		ProductTypeService.getckey(id).then(function (data) {
			$log.debug("ProductType ctrl getckey then");
			$scope.obj=data;
		});
    };
	/**
     * 根据ckey获取对象+Tree
     */
    $scope.treebyckey=function(){
        $log.debug("ProductType ctrl treebyckey id="+id);
		ProductTypeService.treebyckey(null,id).then(function (data) {
			$log.debug("ProductType ctrl treebyckey then");
			$scope.obj=data;
		});
    };
    $scope.init();
    ctrlReinitMap.remove('ProductTypeCtrl');
});
