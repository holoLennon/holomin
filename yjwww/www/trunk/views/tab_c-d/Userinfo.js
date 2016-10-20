/**
 * User，账号信息修改详细
 */
appctrl.controller('UserinfoCtrl', function($scope, $rootScope, $log, $timeout,
                                             $ionicTabsDelegate, $ionicPopover, $ionicModal, $ionicLoading,
                                             $location, $state,
                                             $cordovaNetwork, $cordovaGoogleAnalytics,
                                             $stateParams,Storage,$ionicHistory,
                                             ENV,CommonService,UserService) {
    $log.debug("enter Userinfo ctrl");
	/**参数*/
    var id = $stateParams.id;
    $scope.user=Storage.get(LOGINED_USER_C);
    id=($scope.user)?$scope.user.id:0;
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
        $log.debug("Userinfo ctrl beforeEnter");
        $scope.user=Storage.get(LOGINED_USER_C);
        id=($scope.user)?$scope.user.id:0;
    });
    /**
     * 进入后
     */
    $scope.$on('$ionicView.afterEnter', function() {
        $log.debug("Userinfo ctrl afterEnter");
        if (ctrlReinitMap.get('UserinfoCtrl')) {
            ctrlReinitMap.remove('UserinfoCtrl');
            $log.debug("Userinfo ctrl afterEnter init");
            $scope.init();
        }
	});
    /**
     * 初始化
     */
    $scope.init=function(){
        $log.debug("Userinfo ctrl init id="+id);
		$scope.get();
    };
    /**
     * 获取本地对象
     */
    $scope.getlocal=function(){
        $log.debug("Userinfo ctrl getlocal id="+id);
        if(isblank0(id)){
            $scope.obj= _.clone(_User);
        }else{
            $scope.obj=UserService.getlocal(id);
        }
        $log.debug($scope.obj);
    };
    /**
     * 获取网络对象
     */
    $scope.get=function(){
        $log.debug("Userinfo ctrl get id="+id);
        if(isblank0(id)) {
            UserService.newget().then(function (data) {
                $log.debug("Userinfo ctrl newget then");
                $scope.obj=data;
            });
        }else{
            UserService.get(id).then(function (data) {
                $log.debug("Userinfo ctrl get then");
                $scope.obj=data;
                $scope.obj.password="";
            });
        }
    };
    /**
     * 保存
     */
    $scope.save=function(){
        $log.debug("Userinfo ctrl get id="+id);
        $log.debug($scope.obj)
        if(isblank0(id)) {
            UserService.create($scope.obj).then(function (data) {
                $log.debug("Userinfo ctrl save then");
                $scope.obj=data;
                /*$location.path("/tab/Mystore/"+$scope.obj.id);*/
            });
        }else{
            UserService.update($scope.obj).then(function (data) {
                $log.debug("Userinfo ctrl update then");
                $scope.obj=data;
                $log.debug($scope.obj.id);
                CommonService.alertm('密码修改成功，请退出后重新登录','密码修改').then(function (res) {
                  $scope.user=null;
                  Storage.remove(LOGINED_USER_C);
                  if(window.localStorage.length!=0){
                    var clientInfo=Storage.get(CLIENT_INFO);
                    clientInfo.token=null;
                    Storage.set(CLIENT_INFO,clientInfo);
                  }
                  location.replace(document.referrer);
                });
            });
        }
    };
    $scope.init();
    ctrlReinitMap.remove('UserinfoCtrl');
});
