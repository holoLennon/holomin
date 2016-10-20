/**
 * Cmscontent，内容详细
 */
appctrl.controller('CmscontentCtrl', function($scope, $rootScope, $log, $timeout,
                                             $ionicTabsDelegate, $ionicPopover, $ionicModal, $ionicLoading,
                                             $location, $state,
                                             $cordovaNetwork, $cordovaGoogleAnalytics,
                                             $stateParams,
                                             ENV,CommonService,CmscontentService) {
    $log.debug("enter Cmscontent ctrl");
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
        $log.debug("Cmscontent ctrl beforeEnter");
    });
    /**
     * 进入后
     */
    $scope.$on('$ionicView.afterEnter', function() {
        $log.debug("Cmscontent ctrl afterEnter");
        if (ctrlReinitMap.get('CmscontentCtrl')) {
            ctrlReinitMap.remove('CmscontentCtrl');
            $log.debug("Cmscontent ctrl afterEnter init");
            $scope.init();
        }
	});
    /**
     * 结束后
     */
	$scope.$on('$destroy', function() {
		$log.debug("Cmscontent ctrl destroy");
	});
    /**
     * 初始化
     */
    $scope.init=function(){
        $log.debug("Cmscontent ctrl init id="+id);
		$scope.get();
    };
    /**
     * 获取本地对象
     */
    $scope.getlocal=function(){
        $log.debug("Cmscontent ctrl getlocal id="+id);
        if(isblank0(id)){
            $scope.obj= _.clone(_Cmscontent);
        }else{
            $scope.obj=CmscontentService.getlocal(id);
        }
        $log.debug($scope.obj);
    };
    /**
     * 获取网络对象
     */
    $scope.get=function(){
        $log.debug("Cmscontent ctrl get id="+id);
        if(isblank0(id)) {
            CmscontentService.newget().then(function (data) {
                $log.debug("Cmscontent ctrl newget then");
                $scope.obj=data;
            });
        }else{
            CmscontentService.get(id).then(function (data) {
                $log.debug("Cmscontent ctrl get then");
                $scope.obj=data;
            });
        }
    };
    /**
     * 保存
     */
    $scope.save=function(){
        $log.debug("Cmscontent ctrl get id="+id);
        $log.debug($scope.obj)
        if(isblank0(id)) {
            CmscontentService.create($scope.obj).then(function (data) {
                $log.debug("Cmscontent ctrl save then");
                $scope.obj=data;
                $location.path("/tab/Cmscontent/"+$scope.obj.id);
            });
        }else{
            CmscontentService.update($scope.obj).then(function (data) {
                $log.debug("Cmscontent ctrl update then");
                $scope.obj=data;
                $location.path("/tab/Cmscontent/"+$scope.obj.id);
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
   * 如果"files_img1"这个控件发生改变，则进行上传
   */
  $scope.$watch('files_img1', function (files) {
    if (files != null) {
      if (!angular.isArray(files)) {
        $timeout(function () {
          $scope.files_img1 = files = [files];
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
          $scope.upload(f, 'img1');
        })(files[i]);
      }
    }
  });
  /**
   * 如果"files_img2"这个控件发生改变，则进行上传
   */
  $scope.$watch('files_img2', function (files) {
    if (files != null) {
      if (!angular.isArray(files)) {
        $timeout(function () {
          $scope.files_img2 = files = [files];
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
          $scope.upload(f, 'img2');
        })(files[i]);
      }
    }
  });
  /**
   * 如果"files_img3"这个控件发生改变，则进行上传
   */
  $scope.$watch('files_img3', function (files) {
    if (files != null) {
      if (!angular.isArray(files)) {
        $timeout(function () {
          $scope.files_img3 = files = [files];
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
          $scope.upload(f, 'img3');
        })(files[i]);
      }
    }
  });
  /**
   * 如果"files_img4"这个控件发生改变，则进行上传
   */
  $scope.$watch('files_img4', function (files) {
    if (files != null) {
      if (!angular.isArray(files)) {
        $timeout(function () {
          $scope.files_img4 = files = [files];
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
          $scope.upload(f, 'img4');
        })(files[i]);
      }
    }
  });
  /**
   * 如果"files_img5"这个控件发生改变，则进行上传
   */
  $scope.$watch('files_img5', function (files) {
    if (files != null) {
      if (!angular.isArray(files)) {
        $timeout(function () {
          $scope.files_img5 = files = [files];
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
          $scope.upload(f, 'img5');
        })(files[i]);
      }
    }
  });
    $scope.init();
    ctrlReinitMap.remove('CmscontentCtrl');
});
