/**
 * MedicalrecRpt，病历之检查报告详细
 */
appctrl.controller('MedicalrecRptCtrl', function($scope, $rootScope, $log, $timeout,
                                             $ionicTabsDelegate, $ionicPopover, $ionicModal, $ionicLoading,
                                             $location, $state,
                                             $cordovaNetwork, $cordovaGoogleAnalytics,
                                             $stateParams,
                                             ENV,CommonService,MedicalrecRptService,Storage,Upload) {
    $log.debug("enter MedicalrecRpt ctrl");
	/**参数*/
    var id = $stateParams.id;
    /**页面对象*/
    $scope.vm={};
    $scope.vm.isedit=false;
    $scope.files=$scope;
    if(id==='0')
        $scope.vm.isedit=true;
	/**对象*/
	$scope.obj={};
    /**
     * 进入前
     */
    $scope.$on('$ionicView.beforeEnter', function() {
        $log.debug("MedicalrecRpt ctrl beforeEnter");
    });
    /**
     * 进入后
     */
    $scope.$on('$ionicView.afterEnter', function() {
        $log.debug("MedicalrecRpt ctrl afterEnter");
        if (ctrlReinitMap.get('MedicalrecRptCtrl')) {
            ctrlReinitMap.remove('MedicalrecRptCtrl');
            $log.debug("MedicalrecRpt ctrl afterEnter init");
            $scope.init();
        }
	});
    /**
     * 结束后
     */
	$scope.$on('$destroy', function() {
		$log.debug("MedicalrecRpt ctrl destroy");
	});
    /**
     * 初始化
     */
    $scope.init=function(){
        $log.debug("MedicalrecRpt ctrl init id="+id);
		$scope.get();
    };
    /**
     * 获取本地对象
     */
    $scope.getlocal=function(){
        $log.debug("MedicalrecRpt ctrl getlocal id="+id);
        if(isblank0(id)){
            $scope.obj= _.clone(_MedicalrecRpt);
        }else{
            $scope.obj=MedicalrecRptService.getlocal(id);
        }
        $log.debug($scope.obj);
    };
    /**
     * 获取网络对象
     */
    $scope.get=function(){
        $log.debug("MedicalrecRpt ctrl get id="+id);
        if(isblank0(id)) {
            MedicalrecRptService.newget().then(function (data) {
                $log.debug("MedicalrecRpt ctrl newget then");
                $scope.obj=data;
                $scope.obj.ttype=-1;
            });
        }else{
            MedicalrecRptService.get(id).then(function (data) {
                $log.debug("MedicalrecRpt ctrl get then");
                $scope.obj=data;
                $scope.obj.ttype=-1;
            });
        }
    };
    /**
     * 保存
     */
    $scope.save=function(){
        $log.debug("MedicalrecRpt ctrl get id="+id);
        if(isblank($scope.obj.img1)||$scope.obj.ttype==-1){
          CommonService.alertm('请填写完整的信息');
          $scope.vm.isedit=true;
          return;
        }
        if(isblank0(id)) {
          if(Storage.get(LOGINED_USER)!=null){
            $scope.obj.medicalrecId=Storage.get(LOGINED_USER).id;
          }
            MedicalrecRptService.create($scope.obj).then(function (data) {
                $log.debug("MedicalrecRpt ctrl save then");
                $scope.obj=data;
                $location.path("/tab/MedicalrecRpt/"+$scope.obj.id);
            });
        }else{
            MedicalrecRptService.update($scope.obj).then(function (data) {
                $log.debug("MedicalrecRpt ctrl update then");
                $scope.obj=data;
                $location.path("/tab/MedicalrecRpt/"+$scope.obj.id);
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
  $scope.vmfiles=$scope;
  /**
   * 如果"files_img1"这个控件发生改变，则进行上传
   */
  $scope.$watch('vmfiles.files_img1', function (files) {
    $log.debug("vmfiles.files_img1 change!");
    var file;
    if(files==null)
      return;
    if (angular.isArray(files)) {
      file=files[0];
    }else{
      file=files;
    }
    $log.debug("upload...");
    $log.debug(file);
    $scope.uploadPic(file, $scope.obj,"img1");
  });
    $scope.init();
    ctrlReinitMap.remove('MedicalrecRptCtrl');
});
