/**
 * Manufacturer，药品生产厂家详细
 */
appctrl.controller('ManufacturerCtrl', function($scope, $rootScope, $log, $timeout,
                                             $ionicTabsDelegate, $ionicPopover, $ionicModal, $ionicLoading,
                                             $location, $state,
                                             $cordovaNetwork, $cordovaGoogleAnalytics,
                                             $stateParams,
                                             ENV,CommonService,ManufacturerService) {
    $log.debug("enter Manufacturer ctrl");
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
        $log.debug("Manufacturer ctrl beforeEnter");
    });
    /**
     * 进入后
     */
    $scope.$on('$ionicView.afterEnter', function() {
        $log.debug("Manufacturer ctrl afterEnter");
        if (ctrlReinitMap.get('ManufacturerCtrl')) {
            ctrlReinitMap.remove('ManufacturerCtrl');
            $log.debug("Manufacturer ctrl afterEnter init");
            $scope.init();
        }
	});
    /**
     * 结束后
     */
	$scope.$on('$destroy', function() {
		$log.debug("Manufacturer ctrl destroy");
	});
    /**
     * 初始化
     */
    $scope.init=function(){
        $log.debug("Manufacturer ctrl init id="+id);
		$scope.get();
    };
    /**
     * 获取本地对象
     */
    $scope.getlocal=function(){
        $log.debug("Manufacturer ctrl getlocal id="+id);
        if(isblank0(id)){
            $scope.obj= _.clone(_Manufacturer);
        }else{
            $scope.obj=ManufacturerService.getlocal(id);
        }
        $log.debug($scope.obj);
    };
    /**
     * 获取网络对象
     */
    $scope.get=function(){
        $log.debug("Manufacturer ctrl get id="+id);
        if(isblank0(id)) {
            ManufacturerService.newget().then(function (data) {
                $log.debug("Manufacturer ctrl newget then");
                $scope.obj=data;
            });
        }else{
            ManufacturerService.get(id).then(function (data) {
                $log.debug("Manufacturer ctrl get then");
                $scope.obj=data;
            });
        }
    };
    /**
     * 保存
     */
    $scope.save=function(){
        $log.debug("Manufacturer ctrl get id="+id);
        $log.debug($scope.obj)
        if(isblank0(id)) {
            ManufacturerService.create($scope.obj).then(function (data) {
                $log.debug("Manufacturer ctrl save then");
                $scope.obj=data;
                $location.path("/tab/Manufacturer/"+$scope.obj.id);
            });
        }else{
            ManufacturerService.update($scope.obj).then(function (data) {
                $log.debug("Manufacturer ctrl update then");
                $scope.obj=data;
                $location.path("/tab/Manufacturer/"+$scope.obj.id);
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
  /**上传进度 %*/
  $scope.progressPercentage =0;
  /**错误信息*/
  $scope.errorMsg = null;
  /*上传图片*/
  $scope.upload = function(file, imgfield) {
    var clientInfo=Storage.get(CLIENT_INFO);
    var token=(clientInfo)?clientInfo.token:'';
    file.upload = Upload.upload({
      url: restbase+'/upload',
      resumeSizeUrl: restbase+'/upload?name=' + encodeURIComponent(file.name)+"&token="+token,
      resumeChunkSize:100000,
      headers: {
        'optional-header': 'header-value'
      },
      data: {username: $scope.username},
      file: file
    }).progress(function (evt) {
      //进度条
      $scope.progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
      $scope.progressPercentage = ($scope.progressPercentage>100)?100:$scope.progressPercentage;
      //$log.debug('progess:' + $scope.progressPercentage + '%,' + evt.config.file.name);
    }).success(function (data) {
      angular.forEach(data.result, function (item) {
        if(item.fieldName=='url'){
          //$log.debug(item.value);
          if(item.value!=null){
            $scope.obj[imgfield]=wbase+item.value;
            //上传完成后，提交并且保存
            $scope.save();
          }
        }
      });
    })

    file.upload.then(function (response) {
      $timeout(function () {
        file.result = response.data;
      });
    }, function (response) {
      if (response.status > 0)
        $scope.errorMsg = response.status + ': ' + response.data;
    }, function (evt) {
      file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
    });
    file.upload.xhr(function (xhr) {

    });
  };
  /**
   * 如果"files_img"这个控件发生改变，则进行上传
   */
  $scope.$watch('files_img', function (files) {
    if (files != null) {
      if (!angular.isArray(files)) {
        $timeout(function () {
          $scope.files_img = files = [files];
        });
        return;
      }
      for (var i = 0; i < files.length; i++) {
        Upload.imageDimensions(files[i]).then(function (d) {
          $scope.d = d;
          console.log(d);
        });
        $scope.errorMsg = null;
        (function (f) {
          $scope.upload(f, 'img');
        })(files[i]);
      }
    }
  });
    $scope.init();
    ctrlReinitMap.remove('ManufacturerCtrl');
});
