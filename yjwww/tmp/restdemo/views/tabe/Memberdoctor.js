/**
 * Memberdoctor，医患关系详细
 */
appctrl.controller('MemberdoctorCtrl', function($scope, $rootScope, $log, $timeout,
                                             $ionicTabsDelegate, $ionicPopover, $ionicModal, $ionicLoading,
                                             $location, $state,
                                             $cordovaNetwork, $cordovaGoogleAnalytics,
                                             $stateParams,
                                             ENV,CommonService,MemberdoctorService) {
    $log.debug("enter Memberdoctor ctrl");
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
        $log.debug("Memberdoctor ctrl beforeEnter");
    });
    /**
     * 进入后
     */
    $scope.$on('$ionicView.afterEnter', function() {
        $log.debug("Memberdoctor ctrl afterEnter");
        if (ctrlReinitMap.get('MemberdoctorCtrl')) {
            ctrlReinitMap.remove('MemberdoctorCtrl');
            $log.debug("Memberdoctor ctrl afterEnter init");
            $scope.init();
        }
	});
    /**
     * 结束后
     */
	$scope.$on('$destroy', function() {
		$log.debug("Memberdoctor ctrl destroy");
	});
    /**
     * 初始化
     */
    $scope.init=function(){
        $log.debug("Memberdoctor ctrl init id="+id);
		$scope.get();
    };
    /**
     * 获取本地对象
     */
    $scope.getlocal=function(){
        $log.debug("Memberdoctor ctrl getlocal id="+id);
        if(isblank0(id)){
            $scope.obj= _.clone(_Memberdoctor);
        }else{
            $scope.obj=MemberdoctorService.getlocal(id);
        }
        $log.debug($scope.obj);
    };
    /**
     * 获取网络对象
     */
    $scope.get=function(){
        $log.debug("Memberdoctor ctrl get id="+id);
        if(isblank0(id)) {
            MemberdoctorService.newget().then(function (data) {
                $log.debug("Memberdoctor ctrl newget then");
                $scope.obj=data;
            });
        }else{
            MemberdoctorService.get(id).then(function (data) {
                $log.debug("Memberdoctor ctrl get then");
                $scope.obj=data;
            });
        }
    };
    /**
     * 保存
     */
    $scope.save=function(){
        $log.debug("Memberdoctor ctrl get id="+id);
        $log.debug($scope.obj)
        if(isblank0(id)) {
            MemberdoctorService.create($scope.obj).then(function (data) {
                $log.debug("Memberdoctor ctrl save then");
                $scope.obj=data;
                $location.path("/tab/Memberdoctor/"+$scope.obj.id);
            });
        }else{
            MemberdoctorService.update($scope.obj).then(function (data) {
                $log.debug("Memberdoctor ctrl update then");
                $scope.obj=data;
                $location.path("/tab/Memberdoctor/"+$scope.obj.id);
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
    ctrlReinitMap.remove('MemberdoctorCtrl');
});
