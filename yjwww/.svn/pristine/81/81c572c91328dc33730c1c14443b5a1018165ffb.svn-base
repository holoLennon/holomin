appctrl.controller('DoctorCtrl', function($scope, $rootScope, $log, $timeout,
                                          $ionicTabsDelegate, $ionicPopover, $ionicModal, $ionicLoading,
                                          $location, $state,
                                          $cordovaNetwork, $cordovaGoogleAnalytics,
                                          $stateParams,$ionicHistory,
                                          ENV,CommonService,DoctorService,Upload,$compile, $http) {
  $log.debug("enter Doctor ctrl");
  /**参数*/
  /**页面显示的列表*/
  /**页码*/
  $scope.page=_.clone(_Page);
  var id = $stateParams.id;
  $scope.list=[];
  $scope.obj={};
  var uprooturl="http://yijian.zjjnyd.com/yijian/rest";


  /**
   * 进入前
   */
  $scope.$on('$ionicView.beforeEnter', function() {
    $log.debug("Doctor ctrl beforeEnter");
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
    $scope.get();
  };
  /**
   * 选择了科室2
   */
  $scope.makeProductchannelId=function(){
    $log.debug("productchannelId"+$scope.obj.productchannelId);
    $scope.obj.productchannelId=$scope.obj.productchannelIdProductchannelObj.id;
  };
  /**
   * 选择了科室1
   */
  $scope.makeProductchannelId1=function(obj){
    if(YIJIAN){
      obj.productchannelIdProductchannelObj=obj.ks1.children[0];
    }else{
      obj.productchannelIdProductchannelObj=obj.ks1.children[0];
      $scope.obj.productchannelId=obj.ks1.children[0].id;
    }
  };

  /**
   * 获取网络对象
   */
  $scope.get=function(){
    if(!id)
      return;
    DoctorService.get(id).then(function (data) {
      $log.debug("DoctorService ctrl get then");
      $scope.obj=data;
      $scope.dataProcessing(data);
    });
  };
  /**
   * 科室：对传过来的json进行处理
   */
  $scope.dataProcessing=function(data){
    angular.forEach(data.obj1, function (item) {
      angular.forEach(item.children, function (item2) {
        if(data.productchannelId==item2.id){
          $scope.obj.productchannelIdProductchannelObj=item2;
          $scope.obj.ks1=item;
        }
      });
    });
  }
  /**
   * 保存
   */
  $scope.save=function(){
    $log.debug("Doctor ctrl get id="+id);
    if(YIJIAN){
      $scope.makeProductchannelId();
    }
    $log.debug($scope.obj)
    if(isblank0(id)) {
      return;
    }else{
      DoctorService.update($scope.obj).then(function (data) {
        $log.debug("Doctor ctrl update then");
        CommonService.alertm("修改成功");
        $ionicHistory.goBack();
      });
    }
  };
  /**
   * 图片上传结束
   */
  $scope.uploadsave=function(){
    $log.debug("Doctor ctrl get id="+id);
    $log.debug($scope.obj);
    if(isblank0(id)) {

    }else{
      DoctorService.update($scope.obj).then(function (data) {
        $log.debug("Doctor ctrl update then");
        $scope.dataProcessing(data);
        CommonService.alertm("上传成功");
      });
    }
  };

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
            $scope.obj.imgqa=upurl;
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


  $scope.init();
  ctrlReinitMap.remove('DoctorCtrl');
});
