/**
 * myresumeprescription，新增的简历处方
 */
appctrl.controller('myresumeprescriptionCtrl', function($scope, $rootScope, $log, $timeout,
                                                    $ionicTabsDelegate, $ionicPopover, $ionicModal, $ionicLoading,
                                                    $location, $state,
                                                    $cordovaNetwork, $cordovaGoogleAnalytics,
                                                    $stateParams,
                                                    ENV,CommonService,Storage,$ionicScrollDelegate,Upload) {
  $log.debug("enter myresumeprescription ctrl");
  /**参数*/
  var id = $stateParams.id;
  /**页面对象*/
  $scope.vm={};
  $scope.vm.isedit=false;
  if(id==='0')
    $scope.vm.isedit=true;
  /**对象*/
  $scope.obj={};
  var uprooturl="http://yijian.zjjnyd.com/yijian/rest";
  /**
   * 进入前
   */
  $scope.$on('$ionicView.beforeEnter', function() {
    $log.debug("myresumeprescription ctrl beforeEnter");
  });
  /**
   * 进入后
   */
  $scope.$on('$ionicView.afterEnter', function() {
    $log.debug("myresumeprescription ctrl afterEnter");
    if (ctrlReinitMap.get('myresumeprescriptionCtrl')) {
      ctrlReinitMap.remove('myresumeprescriptionCtrl');
      $log.debug("myresumeprescription ctrl afterEnter init");
      $scope.init();
    }
  });
  /**
   * 结束后
   */
  $scope.$on('$destroy', function() {
    $log.debug("myresumeprescription ctrl destroy");
  });
  /**
   * 初始化
   */
  $scope.init=function(){
    $log.debug("myresumeprescription ctrl init id="+id);
    /*$scope.get();*/
  };
  /**
   * 获取本地对象
   */
  /*$scope.getlocal=function(){
    $log.debug("myresumeprescription ctrl getlocal id="+id);
    if(isblank0(id)){
      $scope.obj= _.clone(_MedicalrecHealth);
    }else{
      $scope.obj=MedicalrecHealthService.getlocal(id);
    }
    $log.debug($scope.obj);
  };
  /!**
   * 获取网络对象
   *!/
  $scope.get=function(){
    $log.debug("myresumeprescription ctrl get id="+id);
    if(isblank0(id)) {
      MedicalrecHealthService.newget().then(function (data) {
        $log.debug("myresumeprescription ctrl newget then");
        $scope.obj=data;
      });
    }else{
      MedicalrecHealthService.get(id).then(function (data) {
        $log.debug("myresumeprescription ctrl get then");
        $scope.obj=data;
      });
    }
  };
  /!**
   * 保存
   *!/
  $scope.save=function(){
    $log.debug("myresumeprescription ctrl get id="+id);
    $log.debug($scope.obj)
    if(isblank0(id)) {
      if(Storage.get(LOGINED_USER)!=null){
        $scope.obj.medicalrecId=Storage.get(LOGINED_USER).id;
      }
      MedicalrecHealthService.create($scope.obj).then(function (data) {
        $log.debug("myresumeprescription ctrl save then");
        $scope.obj=data;
        $location.path("/tab/myresumeprescription/"+$scope.obj.id);
      });
    }else{
      MedicalrecHealthService.update($scope.obj).then(function (data) {
        $log.debug("myresumeprescription ctrl update then");
        $scope.obj=data;
        $location.path("/tab/myresumeprescription/"+$scope.obj.id);
      });
    }
  };*/
  /*上传图片*/
  $scope.upload = function(file, resumable) {
    $scope.errorMsg = null;
    uploadUsingUpload(file, resumable);
  };
  function uploadUsingUpload(file, resumable) {
    file.upload = Upload.upload({
      url: uprooturl+'/upload' + $scope.getReqParams(),
      resumeSizeUrl: resumable ? uprooturl+'/upload?name=' + encodeURIComponent(file.name) : null,
      resumeChunkSize: resumable ? $scope.chunkSize : null,
      headers: {
        'optional-header': 'header-value'
      },
      data: {username: $scope.username},
      file: file
    }).progress(function (evt) {
      //进度条
      $scope.progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
      $log.debug('progess:' + $scope.progressPercentage + '%' + evt.config.file.name);
    }).success(function (data) {
      angular.forEach(data.result, function (item) {
        if(item.fieldName=='url'){
          $log.debug(item.value);
          if(item.value!=null){
            //$scope.obj.msg
            var upurl='http://yijian.zjjnyd.com/yijian'+item.value;
            $scope.obj.img1=upurl;
            $scope.uploadsave();
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
  }
  /**
   * 如果files发生改变，则进行上传
   */
  $scope.$watch('files', function (files) {
    $log.debug(files);
    if (files != null) {
      if (!angular.isArray(files)) {
        $timeout(function () {
          $scope.files = files = [files];
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
          $scope.upload(f, true);
        })(files[i]);
      }
    }
  });
  $scope.isResumeSupported = Upload.isResumeSupported();
  $scope.chunkSize = 100000;
  $scope.success_action_redirect = $scope.success_action_redirect || window.location.protocol + '//' + window.location.host;
  $scope.jsonPolicy = $scope.jsonPolicy || '{\n  "expiration": "2020-01-01T00:00:00Z",\n  "conditions": [\n    {"bucket": "angular-file-upload"},\n    ["starts-with", "$key", ""],\n    {"acl": "private"},\n    ["starts-with", "$Content-Type", ""],\n    ["starts-with", "$filename", ""],\n    ["content-length-range", 0, 524288000]\n  ]\n}';
  $scope.acl = $scope.acl || 'private';

  $scope.getReqParams = function () {
    return $scope.generateErrorOnServer ? '?errorCode=' + $scope.serverErrorCode +
    '&errorMessage=' + $scope.serverErrorMsg : '';
  };
  $scope.modelOptionsObj = {};
  /**
   * 点击了叉叉，如果是id=0，返回上一页
   */
  $scope.clickx=function(){
    if(id==='0')
      goBack();
    $ionicScrollDelegate.scrollTop();
  };
  $scope.init();
  ctrlReinitMap.remove('myresumeprescriptionCtrl');
});
