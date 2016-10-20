/**
 * Doctor，医生会员详细
 */
appctrl.controller('DoctorCtrl', function($scope, $rootScope, $log, $timeout,
                                             $ionicTabsDelegate, $ionicPopover, $ionicModal, $ionicLoading,
                                             $location, $state,
                                             $cordovaNetwork,$ionicHistory, $cordovaGoogleAnalytics,
                                             $stateParams,Storage,
                                             ENV,CommonService,DoctorService,Upload) {
    $log.debug("enter Doctor ctrl");
	/**参数*/
    $scope.user=Storage.get(LOGINED_USER_B);
    var id = $stateParams.id;
    id=($scope.user)?$scope.user.id:0;
    var uprooturl="http://yijian.zjjnyd.com/yijian/rest";
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
        $log.debug("Doctor ctrl beforeEnter");
        $scope.user=Storage.get(LOGINED_USER_B);
        id=($scope.user)?$scope.user.id:0;
    });
    /**
     * 进入后
     */
    $scope.$on('$ionicView.afterEnter', function() {
        $log.debug("Doctor ctrl afterEnter");
        if (ctrlReinitMap.get('DoctorCtrl')) {
            ctrlReinitMap.remove('DoctorCtrl');
            $log.debug("Doctor ctrl afterEnter init");
            $scope.init();
        }
	});
    /**
     * 初始化
     */
    $scope.init=function(){
        $log.debug("Doctor ctrl init id="+id);
		$scope.get();
    };
    /**
     * 获取本地对象
     */
    $scope.getlocal=function(){
        $log.debug("Doctor ctrl getlocal id="+id);
        if(isblank0(id)){
            $scope.obj= _.clone(_Doctor);
        }else{
            $scope.obj=DoctorService.getlocal(id);
        }
        $log.debug($scope.obj);
    };
  /**
   * 选择了科室2
   */
  $scope.makeProductchannelId=function(){
    $log.debug("productchannelId"+$scope.obj.productchannelId);
    if(isblankobj($scope.obj.productchannelIdProductchannelObj)){
      return;
    }else{
      $scope.obj.productchannelId=$scope.obj.productchannelIdProductchannelObj.id;
    }
  };
    /**
     * 获取网络对象
     */
    $scope.get = function () {
      $log.debug("Doctor ctrl get id=" + id);
      if (isblank0(id)) {
        return;
      } else {
        DoctorService.get(id).then(function (data) {
          $scope.obj = data;
          angular.forEach(data.obj1, function (item) {
            angular.forEach(item.children, function (item2) {
              if (data.productchannelId == item2.id) {
                $scope.obj.productchannelIdProductchannelObj = item2;
                $scope.obj.ks1 = item;
              }
            });
          });
        });
      }
    };
    /**
     * 保存
     */
    $scope.save=function(){
        $log.debug("Doctor ctrl get id="+id);
        $scope.makeProductchannelId();
        if(isblank0(id)) {
            return;
        }else{
            DoctorService.update($scope.obj).then(function (data) {
                $log.debug("Doctor ctrl update then");
                $scope.obj=data;
                CommonService.alertm("信息保存成功");
              $location.path("/tab/my");
            });
        }
    };
  /**
   * 上传照片
   */
  /**上传进度 %*/
  $scope.progressPercentage =0;
  /**错误信息*/
  $scope.errorMsg = null;
  /*上传图片*/
  $scope.upload = function(file, imgfield) {
    var clientInfo=Storage.get(CLIENT_INFO);
    var token=(clientInfo)?clientInfo.token:'';
    token =urlValueTranslation(token);
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
          $log.debug(item.value);
          if(item.value!=null){
            $scope.obj[imgfield]=wbase+item.value;
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
  $scope.files=$scope;
  $scope.$watch('files.files_img1', function (files) {
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

    $scope.modelOptionsObj = {};
    $scope.init();
    ctrlReinitMap.remove('DoctorCtrl');
});
