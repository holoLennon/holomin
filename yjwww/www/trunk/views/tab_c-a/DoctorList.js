/**
 * DoctorList，手机页首页配置详细
 */
appctrl.controller('DoctorListCtrl', function($scope, $rootScope,$log,
                                                      $ionicTabsDelegate, $ionicPopover, $ionicModal, $ionicLoading,
                                                      $location, $state,$stateParams,
                                                      $cordovaNetwork, $cordovaGoogleAnalytics,
                                                      Storage,
                                                      ENV,CommonService,DoctorService) {
  $log.debug("enter DoctorList ctrl");
  /**页码*/
  $scope.page=_.clone(_Page);
  /**页面显示的列表*/
  $scope.list=[];
  /**搜索关键字*/
  $scope.searchData='';
  //业务员id==user.id
  $scope.sellerId=0;
  if(Storage.get(LOGINED_USER_C)!=null){
    $scope.sellerId=Storage.get(LOGINED_USER_C).id;
  }
  /**
   * 进入前
   */
  $scope.$on('$ionicView.beforeEnter', function() {
    $log.debug("DoctorList ctrl beforeEnter");
  });
  /**
   * 进入后
   */
  $scope.$on('$ionicView.afterEnter', function() {
    $log.debug("DoctorList ctrl afterEnter");
    if (ctrlReinitMap.get('DoctorListCtrl')) {
      ctrlReinitMap.remove('DoctorListCtrl');
      $log.debug("DoctorList ctrl afterEnter init");
      $scope.init();
    }
  });
  /**
   * 初始化
   */
  $scope.init=function(){
    $log.debug("DoctorList ctrl init ");
    $log.debug(  $scope.sellerId);
    $scope.page=_.clone(_Page)
    $scope.page.where="seller_id="+$scope.sellerId;
    $scope.page.pageNo=1;
    $log.debug($scope.page.where);
    $scope.page.hasNextPage=false;
    $scope.list=[];
    $scope.first();
  };
  /**
   * 第一次查询
   */
  $scope.first=function(){
    DoctorService.first(null,$scope.page).then(function (data) {
      $log.debug("DoctorList ctrl query then");
      $scope.addList(data);
      $scope.$broadcast('scroll.refreshComplete');
    });

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
    if($scope.list.length<1){
      CommonService.alertm('您还未有发展医生！');
    }
    $log.debug("DoctorList addlist");
  };
  /**
   * 上拉刷新
   */
  $scope.doRefresh=function(){
    $scope.init();
  };
  /**
   * 下拉加载更多查询
   */
  $scope.more=function(){
    $log.debug("DoctorList ctrl more=========");
    if(!$scope.page.hasNextPage){
      return;
    }
      DoctorService.more($scope.page).then(function (data) {
      $log.debug("DoctorList ctrl more then");
      $scope.addList(data);
      $scope.$broadcast('scroll.infiniteScrollComplete');
    });
  };

  /**
   * 搜索
   */
  $scope.search=function(){
    $log.debug("kw ="+$scope.searchData);
    if(isblank($scope.searchData))
      return;
    $scope.rx('#/tab/DoctorListSearch/'+$scope.searchData);
  };
  $scope.goUrlDoctor=function(obj){
    $scope.rx('#/tab/Doctor/'+obj.id);
  };
  $scope.init();
  ctrlReinitMap.remove('DoctorListCtrl');
});

