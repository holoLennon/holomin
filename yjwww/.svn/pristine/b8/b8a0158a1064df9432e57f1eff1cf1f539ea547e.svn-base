/**
 * Suggestion，意见建议详细
 */
appctrl.controller('SuggestionCtrl', function($scope, $rootScope, $log, $timeout,
                                             $ionicTabsDelegate, $ionicPopover, $ionicModal, $ionicLoading,
                                             $location, $state,
                                             $cordovaNetwork, $cordovaGoogleAnalytics,
                                             $stateParams,
                                             ENV,CommonService,SuggestionService) {
    $log.debug("enter Suggestion ctrl");
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
        $log.debug("Suggestion ctrl get id="+id);
        if(isblank0(id)) {
            SuggestionService.newget().then(function (data) {
                $log.debug("Suggestion ctrl newget then");
                $scope.obj=data;
            });
        }else{
            SuggestionService.get(id).then(function (data) {
                $log.debug("Suggestion ctrl get then");
                $scope.obj=data;
            });
        }
    };
    /**
     * 保存
     */
    $scope.save=function(){
        $log.debug("Suggestion ctrl get id="+id);
        $log.debug($scope.obj)
        if(isblank0(id)) {
            SuggestionService.create($scope.obj).then(function (data) {
                $log.debug("Suggestion ctrl save then");
                $scope.obj=data;
                $location.path("/tab/Suggestion/"+$scope.obj.id);
            });
        }else{
            SuggestionService.update($scope.obj).then(function (data) {
                $log.debug("Suggestion ctrl update then");
                $scope.obj=data;
                $location.path("/tab/Suggestion/"+$scope.obj.id);
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
    ctrlReinitMap.remove('SuggestionCtrl');
});
