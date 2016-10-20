/**
 * CmscontentExtTxt，内容详细
 */
appctrl.controller('CmscontentExtTxtCtrl', function($scope, $rootScope, $location, $log, Storage, ENV, CommonService, CmscontentExtTxtService) {
    $log.debug("enter CmscontentExtTxt ctrl");
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
        $log.debug("CmscontentExtTxt ctrl beforeEnter");
    });
    /**
     * 进入后
     */
    $scope.$on('$ionicView.afterEnter', function() {
        $log.debug("CmscontentExtTxt ctrl afterEnter");
        if (ctrlReinitMap.get('CmscontentExtTxtCtrl')) {
            ctrlReinitMap.remove('CmscontentExtTxtCtrl');
            $log.debug("CmscontentExtTxt ctrl afterEnter init");
            $scope.init();
        }
	});
    /**
     * 结束后
     */
	$scope.$on('$destroy', function() {
		$log.debug("CmscontentExtTxt ctrl destroy");
	});
    /**
     * 初始化
     */
    $scope.init=function(){
        $log.debug("CmscontentExtTxt ctrl init id="+id);
		$scope.get();
    };
    /**
     * 获取本地对象
     */
    $scope.getlocal=function(){
        $log.debug("CmscontentExtTxt ctrl getlocal id="+id);
        if(isblank0(id)){
            $scope.obj= _.clone(_CmscontentExtTxt);
        }else{
            $scope.obj=CmscontentExtTxtService.getlocal(id);
        }
        $log.debug($scope.obj);
    };
    /**
     * 获取网络对象
     */
    $scope.get=function(){
		CmscontentExtTxtService.get(id).then(function (data) {
			$log.debug("CmscontentExtTxt ctrl get then");
			$scope.obj=data;
		});
    };
    $scope.init();
    ctrlReinitMap.remove('CmscontentExtTxtCtrl');
});
