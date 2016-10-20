/**
 * Suggestion，意见建议详细
 */
appctrl.controller('SuggestionCtrl', function($scope, $rootScope, $location, $log, Storage, ENV, CommonService, SuggestionService) {
    $log.debug("enter Suggestion ctrl");
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
        $log.debug("Suggestion ctrl beforeEnter");
    });
    /**
     * 进入后
     */
    $scope.$on('$ionicView.afterEnter', function() {
        $log.debug("Suggestion ctrl afterEnter");
        if (ctrlReinitMap.get('SuggestionCtrl')) {
            ctrlReinitMap.remove('SuggestionCtrl');
            $log.debug("Suggestion ctrl afterEnter init");
            $scope.init();
        }
	});
    /**
     * 结束后
     */
	$scope.$on('$destroy', function() {
		$log.debug("Suggestion ctrl destroy");
	});
    /**
     * 初始化
     */
    $scope.init=function(){
        $log.debug("Suggestion ctrl init id="+id);
		$scope.get();
    };
    /**
     * 获取本地对象
     */
    $scope.getlocal=function(){
        $log.debug("Suggestion ctrl getlocal id="+id);
        if(isblank0(id)){
            $scope.obj= _.clone(_Suggestion);
        }else{
            $scope.obj=SuggestionService.getlocal(id);
        }
        $log.debug($scope.obj);
    };
    /**
     * 获取网络对象
     */
    $scope.get=function(){
		SuggestionService.get(id).then(function (data) {
			$log.debug("Suggestion ctrl get then");
			$scope.obj=data;
		});
    };
    $scope.init();
    ctrlReinitMap.remove('SuggestionCtrl');
});
