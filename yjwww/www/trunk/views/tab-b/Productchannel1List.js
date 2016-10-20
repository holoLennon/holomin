/**
 * Productchannel1List，商品目录列表
 */
appctrl.controller('Productchannel1ListCtrl', function($scope, $rootScope,$timeout,
                                                      $ionicTabsDelegate, $ionicPopover, $ionicModal, $ionicLoading,
                                                      $location, $state,$ionicScrollDelegate,
                                                      $cordovaNetwork, $cordovaGoogleAnalytics,$log,Storage,
                                                      ENV,Productchannel1Service,ProductTypeLinkProductService) {
  $log.debug("enter Productchannel1List ctrl");
  /**页码*/
  $scope.page=_.clone(_Page);
  /**页面显示的列表*/
  $scope.list=[];
  /**
   * 进入前
   */
  $scope.$on('$ionicView.beforeEnter', function() {
    $log.debug("Productchannel1List ctrl beforeEnter");
  });
  /**
   * 进入后
   */
  $scope.$on('$ionicView.afterEnter', function() {
    $log.debug("Productchannel1List ctrl afterEnter");
    if (ctrlReinitMap.get('ProductchannelListCtrl')) {
      ctrlReinitMap.remove('ProductchannelListCtrl');
      $log.debug("Productchannel1List ctrl afterEnter init");
      $scope.init();
    }
  });

  /**
   * 初始化
   */
  $scope.init=function(){
    $log.debug("Productchannel1List ctrl init ");
    $scope.page.where="parentid = 913";
    $scope.page.pageNo=1;
    $scope.page.hasNextPage=false;
    $scope.list=[];
    $scope.treebypid(93);
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
    //if(data && data.length < $scope.page.pageSize){
    //    $scope.page.hasNextPage=false;
    //}else{
    //    $scope.page.hasNextPage=true;
    //}

  };

  /**
   * 第一次查询
   */
  $scope.first=function(){
    Productchannel1Service.first(null,$scope.page).then(function (data) {
      $log.debug("Productchannel1List ctrl query then");
      $scope.addList(data);
      $scope.$broadcast('scroll.refreshComplete');
    });
  };
  /**
   * 查树
   */
  $scope.tree=function(){
    Productchannel1Service.tree($scope.page).then(function (data) {
      $log.debug("Productchannel1List ctrl tree then");
      $scope.addList(data);
      $scope.$broadcast('scroll.refreshComplete');
    });
  };
  /**
   * 根据pid查树
   * @param id
   */
  $scope.treebypid=function(id){
    Productchannel1Service.treebypid($scope.page,id).then(function (data) {
      $log.debug("Productchannel1List ctrl tree then");
      $scope.addList(data);
      $scope.$broadcast('scroll.refreshComplete');
    });

  };

  /**
   * 下拉加载更多查询
   */
  $scope.more=function(){
    $log.debug("ProductTypeList ctrl more=========");
    if(!$scope.page.hasNextPage){
      return;
    }
    ProductTypeService.more($scope.page).then(function (data) {
      $log.debug("ProductTypeList ctrl more then");
      $scope.addList(data);
      $scope.$broadcast('scroll.infiniteScrollComplete');
    });
  };
  /**导航栏左侧菜单点击切换**/
  $scope.selected = 0;

  /**
   * 是否被选中
   */
  $scope.isSelected = function(section) {
    return $scope.selected === section;
  }
  /**
   * 导航栏左侧菜单点击切换
   * @param section 序号
   * @param pid 频道id
   */
  $scope.changeNavCat = function(section, pid) {
    $scope.selected  = section;
    $ionicScrollDelegate.scrollTop();
  }
  /**
   * 第一次查询商品
   * @param pid 产品频道ID
   * @param index listProductTypeLinkProduct中的序号
   */
  $scope.firstProductTypeLinkProduct=function(pid,index){
    var where="productTypeId="+pid+" and statusValidOrNot=1";
    $log.debug("home ProductTypeLinkProductList first "+where);
    ProductTypeLinkProductService.first(where).then(function (data) {
      $log.debug("home ProductTypeLinkProductList query then");
      $scope.addListProductTypeLinkProduct(data,index);
      $scope.$broadcast('scroll.refreshComplete');
    });
  };
  /**
   * 给listProductTypeLinkProduct上加数据
   * @param data
   */
  $scope.addListProductTypeLinkProduct=function(data,index){
    angular.forEach(data, function (item) {
      // $log.debug('home id=' + item.id + '|title=' + item.title);
      item.num = 0;
      $scope.listProductTypeLinkProduct[index].push(item);
    });
    // $log.debug('home listProductTypeLinkProduct length : ' + $scope.listProductTypeLinkProduct[index].length);

    if(data && data.length < $scope.page[index].pageSize) {
      $scope.page[index].hasNextPage = false;
    } else {
      $scope.page[index].hasNextPage = true;
    }
    // $log.debug('home page['+ index + '] hasNextPage : ' + $scope.page[index].hasNextPage);
  };
  /**
   * 去 ProductList 页
   * @param productchannel
   */
  $scope.gotoUrlProductList=function(productchannel){
    $log.debug(productchannel.id);
    Storage.set("ProductList"+"QueryWhere","productchannel_id="+productchannel.id);
    ctrlReinitMap.put('ProductListCtrl',1);
    $location.path("/tab/ProductList");
  }

  $scope.init();
  ctrlReinitMap.remove('ProductTypeListCtrl');
});
