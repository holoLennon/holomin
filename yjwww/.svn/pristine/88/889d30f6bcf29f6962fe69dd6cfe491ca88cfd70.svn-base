/**
 * ProductExtTxt，商品详细详细
 */
appctrl.controller('ProductExtTxtCtrl', function($scope, $rootScope, $location, $log, Storage, ENV, CommonService, ProductExtTxtService) {
    $log.debug("enter ProductExtTxt ctrl");
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
        $log.debug("ProductExtTxt ctrl beforeEnter");
    });
    /**
     * 进入后
     */
    $scope.$on('$ionicView.afterEnter', function() {
        $log.debug("ProductExtTxt ctrl afterEnter");
        if (ctrlReinitMap.get('ProductExtTxtCtrl')) {
            ctrlReinitMap.remove('ProductExtTxtCtrl');
            $log.debug("ProductExtTxt ctrl afterEnter init");
            $scope.init();
        }
	});
    /**
     * 结束后
     */
	$scope.$on('$destroy', function() {
		$log.debug("ProductExtTxt ctrl destroy");
	});
    /**
     * 初始化
     */
    $scope.init=function(){
        $log.debug("ProductExtTxt ctrl init id="+id);
		$scope.get();
    };
    /**
     * 获取本地对象
     */
    $scope.getlocal=function(){
        $log.debug("ProductExtTxt ctrl getlocal id="+id);
        if(isblank0(id)){
            $scope.obj= _.clone(_ProductExtTxt);
        }else{
            $scope.obj=ProductExtTxtService.getlocal(id);
        }
        $log.debug($scope.obj);
    };
    /**
     * 获取网络对象
     */
    $scope.get=function(){
		ProductExtTxtService.get(id).then(function (data) {
			$log.debug("ProductExtTxt ctrl get then");
			$scope.obj=data;
		});
    };
    $scope.init();
    ctrlReinitMap.remove('ProductExtTxtCtrl');
});
