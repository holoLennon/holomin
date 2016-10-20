/**
 * Member，个人会员详细
 */
appctrl.controller('MemberCtrl', function($scope, $rootScope, $location, $log, Storage, ENV, CommonService, MemberService) {
    $log.debug("enter Member ctrl");
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
        $log.debug("Member ctrl beforeEnter");
    });
    /**
     * 进入后
     */
    $scope.$on('$ionicView.afterEnter', function() {
        $log.debug("Member ctrl afterEnter");
        if (ctrlReinitMap.get('MemberCtrl')) {
            ctrlReinitMap.remove('MemberCtrl');
            $log.debug("Member ctrl afterEnter init");
            $scope.init();
        }
	});
    /**
     * 结束后
     */
	$scope.$on('$destroy', function() {
		$log.debug("Member ctrl destroy");
	});
    /**
     * 初始化
     */
    $scope.init=function(){
        $log.debug("Member ctrl init id="+id);
		$scope.get();
    };
    /**
     * 获取本地对象
     */
    $scope.getlocal=function(){
        $log.debug("Member ctrl getlocal id="+id);
        if(isblank0(id)){
            $scope.obj= _.clone(_Member);
        }else{
            $scope.obj=MemberService.getlocal(id);
        }
        $log.debug($scope.obj);
    };
    /**
     * 获取网络对象
     */
    $scope.get=function(){
		MemberService.get(id).then(function (data) {
			$log.debug("Member ctrl get then");
			$scope.obj=data;
		});
    };
    $scope.init();
    ctrlReinitMap.remove('MemberCtrl');
});
