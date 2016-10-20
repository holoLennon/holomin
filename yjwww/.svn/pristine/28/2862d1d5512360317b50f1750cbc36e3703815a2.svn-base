/**
 * CmscontentExtTxt，内容详细
 */
appctrl.controller('CmscontentExtTxtCtrl', function($scope, $rootScope, $log, $timeout,
                                             $ionicTabsDelegate, $ionicPopover, $ionicModal, $ionicLoading,
                                             $location, $state,
                                             $cordovaNetwork, $cordovaGoogleAnalytics,
                                             $stateParams,
                                             ENV,CommonService,CmscontentExtTxtService) {
    $log.debug("enter CmscontentExtTxt ctrl");
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
        $log.debug("CmscontentExtTxt ctrl get id="+id);
        if(isblank0(id)) {
            CmscontentExtTxtService.newget().then(function (data) {
                $log.debug("CmscontentExtTxt ctrl newget then");
                $scope.obj=data;
            });
        }else{
            CmscontentExtTxtService.get(id).then(function (data) {
                $log.debug("CmscontentExtTxt ctrl get then");
                $scope.obj=data;
            });
        }
    };
    /**
     * 保存
     */
    $scope.save=function(){
        $log.debug("CmscontentExtTxt ctrl get id="+id);
        $log.debug($scope.obj)
        if(isblank0(id)) {
            CmscontentExtTxtService.create($scope.obj).then(function (data) {
                $log.debug("CmscontentExtTxt ctrl save then");
                $scope.obj=data;
                $location.path("/tab/CmscontentExtTxt/"+$scope.obj.id);
            });
        }else{
            CmscontentExtTxtService.update($scope.obj).then(function (data) {
                $log.debug("CmscontentExtTxt ctrl update then");
                $scope.obj=data;
                $location.path("/tab/CmscontentExtTxt/"+$scope.obj.id);
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
    ctrlReinitMap.remove('CmscontentExtTxtCtrl');
});
