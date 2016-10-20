/**
 * Medicalrec，病历详细
 */
appctrl.controller('MedicalrecCtrl', function($scope, $rootScope, $log, $timeout,
                                             $ionicTabsDelegate, $ionicPopover, $ionicModal, $ionicLoading,
                                             $location, $state,
                                             $cordovaNetwork, $cordovaGoogleAnalytics,
                                             $stateParams,
                                             ENV,CommonService,MedicalrecService) {
    $log.debug("enter Medicalrec ctrl");
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
        $log.debug("Medicalrec ctrl beforeEnter");
    });
    /**
     * 进入后
     */
    $scope.$on('$ionicView.afterEnter', function() {
        $log.debug("Medicalrec ctrl afterEnter");
        if (ctrlReinitMap.get('MedicalrecCtrl')) {
            ctrlReinitMap.remove('MedicalrecCtrl');
            $log.debug("Medicalrec ctrl afterEnter init");
            $scope.init();
        }
	});
    /**
     * 结束后
     */
	$scope.$on('$destroy', function() {
		$log.debug("Medicalrec ctrl destroy");
	});
    /**
     * 初始化
     */
    $scope.init=function(){
        $log.debug("Medicalrec ctrl init id="+id);
		$scope.get();
    };
    /**
     * 获取本地对象
     */
    $scope.getlocal=function(){
        $log.debug("Medicalrec ctrl getlocal id="+id);
        if(isblank0(id)){
            $scope.obj= _.clone(_Medicalrec);
        }else{
            $scope.obj=MedicalrecService.getlocal(id);
        }
        $log.debug($scope.obj);
    };
    /**
     * 获取网络对象
     */
    $scope.get=function(){
        $log.debug("Medicalrec ctrl get id="+id);
        if(isblank0(id)) {
            MedicalrecService.newget().then(function (data) {
                $log.debug("Medicalrec ctrl newget then");
                $scope.obj=data;
            });
        }else{
            MedicalrecService.get(id).then(function (data) {
                $log.debug("Medicalrec ctrl get then");
                $scope.obj=data;
            });
        }
    };
    /**
     * 保存
     */
    $scope.save=function(){
        $log.debug("Medicalrec ctrl get id="+id);
        $log.debug($scope.obj)
        if(isblank0(id)) {
            MedicalrecService.create($scope.obj).then(function (data) {
                $log.debug("Medicalrec ctrl save then");
                $scope.obj=data;
                $location.path("/tab/Medicalrec/"+$scope.obj.id);
            });
        }else{
            MedicalrecService.update($scope.obj).then(function (data) {
                $log.debug("Medicalrec ctrl update then");
                $scope.obj=data;
                $location.path("/tab/Medicalrec/"+$scope.obj.id);
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
    ctrlReinitMap.remove('MedicalrecCtrl');
});
