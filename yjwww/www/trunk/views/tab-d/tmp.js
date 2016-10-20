appctrl.controller('tmpCtrl', function($scope, $rootScope, $log, $timeout,
                                       $ionicTabsDelegate, $ionicPopover, $ionicModal, $ionicLoading,
                                       $location, $state,
                                       $cordovaNetwork, $cordovaGoogleAnalytics,
                                       $stateParams,
                                       ENV,CommonService,MemberService,Storage,$ionicHistory,Upload,$cordovaCapture,$sce) {
  $log.debug("enter tmp ctrl");
  var me;
  $scope.obj={};
  $scope.vm={};
  $scope.sce = $sce.trustAsResourceUrl;

  /**
   * 进入前
   */
  $scope.$on('$ionicView.beforeEnter', function() {
    $log.debug("tmp ctrl beforeEnter");
  });
  /**
   * 进入后
   */
  $scope.$on('$ionicView.afterEnter', function() {
    $log.debug("tmp ctrl afterEnter");
    if (ctrlReinitMap.get('tmpCtrl')) {
      ctrlReinitMap.remove('tmpCtrl');
      $log.debug("tmp ctrl afterEnter init");
      $scope.init();
    }
  });
  /**
   * 初始化
   */
  $scope.init=function(){

  };
  /**
   * 录音
   *
   */
  $scope.captureAudio = function() {
    $log.debug("captureAudio..."+_ClientInfo.cli);
    if (_ClientInfo.cli == 1 || _ClientInfo.cli == 2) {
      $scope.captureAudioHd();
    }else{
      $scope.obj.voa1=wbase+"/userfiles/users/1037/files/201608/20160811201207zjbo.amr";
    }

  };
  /**
   * 录音
   * 获取录音，上传服务器，得到文件的互联网地址
   */
  $scope.captureAudioHd = function() {
    $log.debug("captureAudio...");
    //文件数量=1，时长限制=30秒
    var options = { limit: 1, duration: 30 };
    $cordovaCapture.captureAudio(options).then(function(mediaFiles) {
      //得到声音文件
      $log.debug("captureAudio...Success! Audio data is here");
      var i, path, len;
      for (i = 0, len = mediaFiles.length; i < len; i += 1) {
        path = mediaFiles[i].fullPath;
        $log.debug(path);
        //声音文件上传服务器
        $scope.ftUpload(path,
          function(ret){
            //$log.debug(JSON.stringify(ret));
            var jr=jsonpObj2Obj(ret);
            //声音文件互联网地址
            $scope.obj.voa1=wbase+jr["msg"];
          }
        );
        // do something interesting with the file
      }
      // Success! Audio data is here
    }, function(err) {
      // An error occurred. Show a message to the user
      $log.debug("captureAudio...An error occurred "+err);
    });
  }

  $scope.play = function() {
    var voa = document.getElementById("audio");
    voa.play();
  }

  $scope.init();
  ctrlReinitMap.remove('tmpCtrl');
});
