/**
 * ProductType，商品类型详细
 */
appctrl.controller('ProductTypeCtrl', function($scope, $rootScope, $log, $timeout,
                                             $ionicTabsDelegate, $ionicPopover, $ionicModal, $ionicLoading,
                                             $location, $state,
                                             $cordovaNetwork, $cordovaGoogleAnalytics,
                                             $stateParams,
                                             ENV,CommonService,ProductTypeService) {
    $log.debug("enter ProductType ctrl");
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
        $log.debug("ProductType ctrl beforeEnter");
    });
    /**
     * 进入后
     */
    $scope.$on('$ionicView.afterEnter', function() {
        $log.debug("ProductType ctrl afterEnter");
        if (ctrlReinitMap.get('ProductTypeCtrl')) {
            ctrlReinitMap.remove('ProductTypeCtrl');
            $log.debug("ProductType ctrl afterEnter init");
            $scope.init();
        }
	});
    /**
     * 结束后
     */
	$scope.$on('$destroy', function() {
		$log.debug("ProductType ctrl destroy");
	});
    /**
     * 初始化
     */
    $scope.init=function(){
        $log.debug("ProductType ctrl init id="+id);
		$scope.get();
    };
    /**
     * 获取本地对象
     */
    $scope.getlocal=function(){
        $log.debug("ProductType ctrl getlocal id="+id);
        if(isblank0(id)){
            $scope.obj= _.clone(_ProductType);
        }else{
            $scope.obj=ProductTypeService.getlocal(id);
        }
        $log.debug($scope.obj);
    };
    /**
     * 获取网络对象
     */
    $scope.get=function(){
        $log.debug("ProductType ctrl get id="+id);
        if(isblank0(id)) {
            ProductTypeService.newget().then(function (data) {
                $log.debug("ProductType ctrl newget then");
                $scope.obj=data;
            });
        }else{
            ProductTypeService.get(id).then(function (data) {
                $log.debug("ProductType ctrl get then");
                $scope.obj=data;
            });
        }
    };
    /**
     * 根据ckey/id获取网络对象
     */
    $scope.getckey=function(){
        $log.debug("ProductType ctrl getckey id="+id);
        if(isblank(id)) {
            ProductTypeService.newget().then(function (data) {
                $log.debug("ProductType ctrl newget then");
                $scope.obj=data;
            });
        }else{
            ProductTypeService.getckey(id).then(function (data) {
                $log.debug("ProductType ctrl getckey then");
                $scope.obj=data;
            });
        }
    };
    /**
     * 保存
     */
    $scope.save=function(){
        $log.debug("ProductType ctrl get id="+id);
        $log.debug($scope.obj)
        if(isblank0(id)) {
            ProductTypeService.create($scope.obj).then(function (data) {
                $log.debug("ProductType ctrl save then");
                $scope.obj=data;
                $location.path("/tab/ProductType/"+$scope.obj.id);
            });
        }else{
            ProductTypeService.update($scope.obj).then(function (data) {
                $log.debug("ProductType ctrl update then");
                $scope.obj=data;
                $location.path("/tab/ProductType/"+$scope.obj.id);
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
    ctrlReinitMap.remove('ProductTypeCtrl');
});
