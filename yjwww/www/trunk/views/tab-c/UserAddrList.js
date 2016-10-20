/**
 * UserAddrList，用户的收货地址列表
 */
appctrl.controller('UserAddrListCtrl', function($scope, $rootScope,$timeout,
                                           $ionicTabsDelegate, $ionicPopover, $ionicModal, $ionicLoading,
                                           $location, $state,
                                           $cordovaNetwork, $cordovaGoogleAnalytics,$log,Storage,
                                           ENV,UserAddrService,CommonService,$ionicHistory,$stateParams) {
    $log.debug("enter UserAddrList ctrl");
    /**参数*/
    var id = $stateParams.id;
    /**页码*/
    $scope.page=_.clone(_Page);
    /**页面显示的列表*/
    $scope.list=[];
    $scope.memberId=0;
    $scope.vm={};
    $scope.vm.orderrId=id;
  if(!isblank(Storage.get("DefaultMemberUserAddrId"))){
   $scope.vm.id=Storage.get("DefaultMemberUserAddrId");
  };
    /**
     * 进入前
     */
    $scope.$on('$ionicView.beforeEnter', function() {
        $log.debug("UserAddrList ctrl beforeEnter");
    });
    /**
     * 进入后
     */
    $scope.$on('$ionicView.afterEnter', function() {
        $log.debug("UserAddrList ctrl afterEnter");
        if (ctrlReinitMap.get('UserAddrListCtrl')) {
            ctrlReinitMap.remove('UserAddrListCtrl');
            $log.debug("UserAddrList ctrl afterEnter init");
            $scope.init();
        }
    });

    /**
     * 初始化
     */
    $scope.init=function(){
        $log.debug("UserAddrList ctrl init ");
        if(Storage.get(LOGINED_USER)!=null){
          $scope.memberId=Storage.get(LOGINED_USER).id;
        }
        $scope.page.where="statusValidOrNot=1 and memberId="+$scope.memberId;
		    $scope.page.pageNo=1;
        $scope.page.hasNextPage=false;
        $scope.list=[];
        $scope.first();
    };
    /**
     * 上拉刷新
     */
    $scope.doRefresh=function(){
        $scope.init();
    };
    /**
     * 给list上加数据
     * @param data
     */
    $scope.addList=function(data){
        angular.forEach(data, function (item) {
            $scope.list.push(item);
        });
        if(data && data.length < $scope.page.pageSize){
            $scope.page.hasNextPage=false;
        }else{
            $scope.page.hasNextPage=true;
        }
    };

    /**
     * 第一次查询
     */
    $scope.first=function(){
        UserAddrService.first(null,$scope.page).then(function (data) {
            $log.debug("UserAddrList ctrl query then");
            $scope.addList(data);
            $scope.$broadcast('scroll.refreshComplete');
        });

    };

    /**
     * 下拉加载更多查询
     */
    $scope.more=function(){
        $log.debug("UserAddrList ctrl more=========");
        if(!$scope.page.hasNextPage){
            return;
        }
        UserAddrService.more($scope.page).then(function (data) {
            $log.debug("UserAddrList ctrl more then");
            $scope.addList(data);
            $scope.$broadcast('scroll.infiniteScrollComplete');
        });
    };
  /**
   * 删除收货地址，实际上把收货地址的有效状态改成无效
   * @param obj
   */
  $scope.deleteUserAdd=function(obj){
    CommonService.confirm("是否确认将该地址删除?").then(function(res) {if(res) {
      obj.statusValidOrNot=0;
      if(!isblank(Storage.get("DefaultMemberUserAddrId"))){
        if(obj.id==Storage.get("DefaultMemberUserAddrId"))Storage.remove("DefaultMemberUserAddrId");
      };
      if(!isblank(Storage.get("MemberUserAddrId"))){
        if(obj.id==Storage.get("MemberUserAddrId"))Storage.remove("MemberUserAddrId");
      };
      UserAddrService.update(obj).then(function (data) {
        $log.debug("UserAddrList ctrl delete");
        $location.path("/tab/RC_receiveWay/"+$scope.vm.orderrId);
      });
    } else {
    }});
  }
  /**
   * 返回
   */
  $scope.fanhui=function(){
    $ionicHistory.goBack();
  };

    $scope.init();
    ctrlReinitMap.remove('UserAddrListCtrl');
});
