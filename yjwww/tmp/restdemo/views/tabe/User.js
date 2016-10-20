/**
 * User，账号信息修改详细
 */
appctrl.controller('UserCtrl', function($scope, $rootScope, $log, $timeout,
                                             $ionicTabsDelegate, $ionicPopover, $ionicModal, $ionicLoading,
                                             $location, $state,
                                             $cordovaNetwork, $cordovaGoogleAnalytics,
                                             $stateParams,
                                             ENV,CommonService,UserService) {
    $log.debug("enter User ctrl");
	/**参数*/
    var id = $stateParams.id;
    /**页面对象*/
    $scope.vm={};
    $scope.vm.isedit=false;
    if(id==='0')
        $scope.vm.isedit=true;
	/**对象*/
	$scope.obj={};
    /**
     * 进入前
     */
    $scope.$on('$ionicView.beforeEnter', function() {
        $log.debug("User ctrl beforeEnter");
    });
    /**
     * 进入后
     */
    $scope.$on('$ionicView.afterEnter', function() {
        $log.debug("User ctrl afterEnter");
        if (ctrlReinitMap.get('UserCtrl')) {
            ctrlReinitMap.remove('UserCtrl');
            $log.debug("User ctrl afterEnter init");
            $scope.init();
        }
	});
    /**
     * 结束后
     */
	$scope.$on('$destroy', function() {
		$log.debug("User ctrl destroy");
	});
    /**
     * 初始化
     */
    $scope.init=function(){
        $log.debug("User ctrl init id="+id);
		$scope.get();
    };
    /**
     * 获取本地对象
     */
    $scope.getlocal=function(){
        $log.debug("User ctrl getlocal id="+id);
        if(isblank0(id)){
            $scope.obj= _.clone(_User);
        }else{
            $scope.obj=UserService.getlocal(id);
        }
        $log.debug($scope.obj);
    };
    /**
     * 获取网络对象
     */
    $scope.get=function(){
        $log.debug("User ctrl get id="+id);
        if(isblank0(id)) {
            UserService.newget().then(function (data) {
                $log.debug("User ctrl newget then");
                $scope.obj=data;
            });
        }else{
            UserService.get(id).then(function (data) {
                $log.debug("User ctrl get then");
                $scope.obj=data;
            });
        }
    };
    /**
     * 保存
     */
    $scope.save=function(){
        $log.debug("User ctrl get id="+id);
        $log.debug($scope.obj)
        if(isblank0(id)) {
            UserService.create($scope.obj).then(function (data) {
                $log.debug("User ctrl save then");
                $scope.obj=data;
                $location.path("/tab/User/"+$scope.obj.id);
            });
        }else{
            UserService.update($scope.obj).then(function (data) {
                $log.debug("User ctrl update then");
                $scope.obj=data;
                $location.path("/tab/User/"+$scope.obj.id);
            });
        }
    };
    /**
     * 点击了叉叉，如果是id=0，返回上一页
     */
    $scope.clickx=function(){
        if(id==='0')
            goBack();
    };
    $scope.init();
    ctrlReinitMap.remove('UserCtrl');
});