/**
 * Cmschannel，内容频道详细
 */
appctrl.controller('CmschannelCtrl', function($scope, $rootScope, $location, $log, Storage, ENV, CommonService, CmschannelService) {
    $log.debug("enter Cmschannel ctrl");
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
        $log.debug("Cmschannel ctrl beforeEnter");
    });
    /**
     * 进入后
     */
    $scope.$on('$ionicView.afterEnter', function() {
        $log.debug("Cmschannel ctrl afterEnter");
        if (ctrlReinitMap.get('CmschannelCtrl')) {
            ctrlReinitMap.remove('CmschannelCtrl');
            $log.debug("Cmschannel ctrl afterEnter init");
            $scope.init();
        }
	});
    /**
     * 结束后
     */
	$scope.$on('$destroy', function() {
		$log.debug("Cmschannel ctrl destroy");
	});
    /**
     * 初始化
     */
    $scope.init=function(){
        $log.debug("Cmschannel ctrl init id="+id);
		$scope.get();
    };
    /**
     * 获取本地对象
     */
    $scope.getlocal=function(){
        $log.debug("Cmschannel ctrl getlocal id="+id);
        if(isblank0(id)){
            $scope.obj= _.clone(_Cmschannel);
        }else{
            $scope.obj=CmschannelService.getlocal(id);
        }
        $log.debug($scope.obj);
    };
    /**
     * 获取网络对象
     */
    $scope.get=function(){
		CmschannelService.get(id).then(function (data) {
			$log.debug("Cmschannel ctrl get then");
			$scope.obj=data;
		});
    };
    $scope.init();
    ctrlReinitMap.remove('CmschannelCtrl');
});
