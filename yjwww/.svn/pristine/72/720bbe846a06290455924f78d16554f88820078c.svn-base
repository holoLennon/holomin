appctrl.controller('tabCtrl', function($scope, $rootScope, $log, $timeout,
                                       $ionicTabsDelegate, $ionicPopover, $ionicModal, $ionicLoading,
                                       $location, $state,$ionicHistory,
                                       $cordovaNetwork, $cordovaGoogleAnalytics,
                                       CommonService,Storage,RegService,zspecService,WxService,
                                       ENV) {
  $log.debug("enter tab ctrl3");

  // 登录用户信息
  $scope.rolemem = 808;
  $scope.user={};

  $scope.tab = 'sms';
  $scope.countdown = 0;

  //我User
  $scope.meuser=Storage.get(LOGINED_USER_C);
  if(!$scope.meuser)
    $scope.meuser={};

  $scope.memberDoctorWatching={};
  /**
   * 进入前
   */
  $scope.$on('$ionicView.beforeEnter', function() {
    $log.debug("tab ctrl beforeEnter");
  });

  /**
   * 进入后
   */
  $scope.$on('$ionicView.afterEnter', function() {
    $log.debug("tab ctrl afterEnter");
  });
  /**
   * 初始化
   */
  $scope.init=function(){
    $log.debug("tab ctrl init");

  };
  /**
   * 通知：需要登录，弹出登录窗口
   * @param event
   * @param data 从哪里过来的 'serv':ajax注入返回的
   */
  $scope.$on('event.NeedLoginException', function(event,data) {
    //如果是微信版，同时本地无openid，去外面转一圈取openid回来
    if(wxNoOpenid()) {
      window.location.href=outGetOpenidUrl_c_yjtcm;
      return;
    }
    $log.debug("收到通知：event.NeedLoginException,data="+data);
    if(data==="reg"){
      $scope.user=Storage.get(REG_USER);
      $scope.user.password='';
      $scope.user.rememberpwd=true;
      $scope.user.autologin=true;
    }else{
      $scope.user=Storage.get(LOGINED_USER_C);
      if ($scope.user == null || $scope.user === "")
        $scope.user = {};
    }
    $scope.openPopLogin();
  });
  /**
   * [多客户端版本]
   * 通知：需要微信支付，弹出微信支付窗口
   * @param event
   * @param data 是Json对象json.data=["WaJsapiPaymentParam", waJsapiPaymentParam]
   */
  $scope.$on('event.NeedWxpayWindow', function(event,data) {
    $log.debug("收到通知：event.NeedWxpayWindow,data="+JSON.stringify(data));
    $scope.openPopWxpay();
    if(_ClientInfo.cli==3) {
      var waJsapiPaymentParam=data.obj["WaJsapiPaymentParam"];
      console.log("by cashticketMember");
      WxService.config().then(function (data) {
        console.log("WxService config then ");
        WxService.pay(waJsapiPaymentParam).then(function(res){
          //支付完成就可以关了

        });
      });
    }
    if(_ClientInfo.cli===1) {
      var waAppapiPaymentParam=data.obj["WaAppapiPaymentParam"];
      wxpay.pay(waAppapiPaymentParam,
        function(){

        },
        function(){

        });

    }
    if(_ClientInfo.cli===2) {

    }
    if(_ClientInfo.cli==null || _ClientInfo.cli===3) {

    }

  });
  /**
   * 弹个警告框
   * @param event
   * @param data 消息内容
   */
  $scope.$on('event.alertm', function(event,data) {
    $log.debug("收到通知：event.alertm,data="+data);
    CommonService.alertm(data).then(function (res) {});
  });
  $scope.tabChange = function(tab) {
    $scope.tab = tab;
  }
  /**
   * 请求验证码
   */
  $scope.requestCode = function(user) {
    $log.debug("请求验证码");
    $log.debug(user);
    var re = /^0?1[0-9]{10}$/;
    if (!re.test(user.mobile)) {
      CommonService.alertm("手机号无效");
      return;
    }
    zspecService.requestCode(user.mobile).then(function() {
      CommonService.alertm("验证码已发送");
      $scope.count(60);
    });
  }
  /**
   * 倒计时
   */
  $scope.count = function(n) {
    $scope.countdown = n;
    if (n != 0) {
      $timeout(function() {
        $scope.count(n - 1);
      }, 1000);
    }
  }
  /**
   * 短信验证登陆
   */
  $scope.dologinbysms = function(user) {
    //如果是微信版，同时本地无openid，去外面转一圈取openid回来
    if(wxNoOpenid()) {
      window.location.href=outGetOpenidUrl_c_yjtcm;
      return;
    }
    user.roleId=8;
    $log.debug("短信验证登陆");
    zspecService.dologinbysms(user).then(function (data) {
      $scope.popLogin.hide();
      //密码复原
      var oldUser= _.clone($scope.user);
      $scope.user=data;
      $scope.user.passwordmd5=$scope.user.password;

      Storage.set(LOGINED_USER_C,$scope.user);
      //token以clientInfo为准，因此从user中复制过去
      var clientInfo=Storage.get(CLIENT_INFO);
      if(!clientInfo){
        clientInfo=_.clone(_ClientInfo);
      }
      clientInfo.token=$scope.user.token;
      Storage.set(CLIENT_INFO,clientInfo);
      $ionicHistory.goBack();
      $rootScope.$broadcast('event.logined'); //通知其它人登录成功
    });
  }
  /**
   * 登录
   */
  $scope.dologin=function(user){
    //如果是微信版，同时本地无openid，去外面转一圈取openid回来
    if(wxNoOpenid()) {
      window.location.href=outGetOpenidUrl_c_yjtcm;
      return;
    }
    $scope.user=user;
    user.roleId=8;
    user.isauto=0;
    console.log(user);
    RegService.dologin(user).then(function (data) {
      $scope.popLogin.hide();
      //密码复原
      var oldUser= _.clone($scope.user);
      $scope.user=data;
      $scope.user.passwordmd5=$scope.user.password;
      $scope.user.password=oldUser.password;

      Storage.set(LOGINED_USER_C,$scope.user);
      //token以clientInfo为准，因此从user中复制过去
      var clientInfo=Storage.get(CLIENT_INFO);
      if(!clientInfo){
        clientInfo=_.clone(_ClientInfo);
      }
      clientInfo.token=$scope.user.token;
      Storage.set(CLIENT_INFO,clientInfo);
      $scope.meuser=Storage.get(LOGINED_USER_C);
      $ionicHistory.goBack();
      $rootScope.$broadcast('event.logined'); //通知其它人登录成功
      location.reload();
    });
  }

  ///////////////////////////以下是弹窗系列

  /**关闭窗口_登录*/
  $scope.closePopLogin = function(e) {
    $log.debug("closePopLogin");
    $scope.popLogin.hide();
    $ionicHistory.goBack();
  };
  /**
   * 设定弹出窗口_登录
   */
  $ionicPopover.fromTemplateUrl('views/pub/login.html', {
    scope: $scope
  }).then(function(popover) {
    $scope.popLogin = popover;
  });
  /**打开窗口_登录*/
  $scope.openPopLogin = function(e) {
    $scope.popLogin.show(e);
  };

  /**弹出窗_微信支付*/
  $scope.popWxpay={};
  /**
   * 设定弹出窗口_微信支付
   */
  $ionicPopover.fromTemplateUrl('views/pub/wxpay.html', {
    scope: $scope
  }).then(function(popover) {
    $scope.popWxpay = popover;
  });
  /**打开窗口_微信支付*/
  $scope.openPopWxpay = function(e) {
    $scope.popWxpay.show(e);
  };

  /**弹出窗_微信支付*/
  $scope.popApay={};
  /**
   * 设定弹出窗口_微信支付
   */
  $ionicPopover.fromTemplateUrl('views/pub/apay.html', {
    scope: $scope
  }).then(function(popover) {
    $scope.popApay = popover;
  });
  /**打开窗口_微信支付*/
  $scope.openPopApay = function(e) {
    $scope.popApay.show(e);
  };


  /////////////////////////
  /**
   * 点击TAB做的事，覆盖了href
   * @param nowtab
   */
  $scope.nowtabs=function(nowtab){
    $log.debug("当前的tab="+nowtab);
    pubnowtab=nowtab;
    if('B'===nowtab){
      $scope.jumpPage('CloudPharmacy');
      //$scope.jumpPage('RB_ProductType/woman');
    }else if('C'===nowtab){
      $scope.jumpPage('Drugstore');
    }else if('D'===nowtab){
      $scope.jumpPage('Mystore');
    }else{
      $scope.jumpPage('DoctorList');
    }
  };
  /**
   * 返回屏幕一半高度
   * @returns {number}
   */
  $scope.getHalfHeight=function(){
    return 300;
  }

  /**
   * 根据当前tab自动放置页面
   * ex. ng-click="rx('#/tab/Product/'+obj1.productId)"
   * @param src
   */
  $scope.rx=function(src){
    src="R"+pubnowtab+"_"+src.substring(6);
    $scope.jumpPage(src);
  }

  /**
   * 跳转
   * @param uri
   */
  $scope.jumpPage=function(uri) {
    $location.path("/tab/"+uri);
  };

  /**
   * 把xxxController放到ctrlReinitMap中
   * @param key
   */
  $scope.ctrlMapPut = function(key) {
    ctrlReinitMap.put(key,1);
  };
  var module = angular.module('app.directives', []);
  module.directive('hideTabs', function($rootScope) {
    return {
      restrict: 'AE',
      link: function(scope, element, attributes) {
        scope.$watch(attributes.hideTabs, function(value){
          $rootScope.hideTabs = value;
        });

        scope.$on('$destroy', function() {
          $rootScope.hideTabs = false;
        });
      }
    };
  });

  $scope.init();
});
