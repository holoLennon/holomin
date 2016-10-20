/**
 * PrescriptList，药方列表
 */
appctrl.controller('PrescriptListCtrl', function($scope, $rootScope,$timeout,
                                           $ionicTabsDelegate, $ionicPopover, $ionicModal, $ionicLoading,
                                           $location, $state,$stateParams,
                                           $cordovaNetwork, $cordovaGoogleAnalytics,$log,Storage,
                                           ENV,PrescriptService,zspecService,CommonService,PrescriptProductService) {
    $log.debug("enter PrescriptList ctrl");
    /**页码*/
    $scope.page=_.clone(_Page);
    /**页面显示的列表*/
    $scope.list=[];
//参数0表示从首页的常用药方来，1表示为开药笺那个地方过来的
  $scope.act = $stateParams.act;
  /**页面对象*/
  $scope.vm={
    delshow:false
  };
    /**
     * 进入前
     */
    $scope.$on('$ionicView.beforeEnter', function() {
        $log.debug("PrescriptList ctrl beforeEnter");
    });
    /**
     * 进入后
     */
    $scope.$on('$ionicView.afterEnter', function() {
        $log.debug("PrescriptList ctrl afterEnter");
        if (ctrlReinitMap.get('PrescriptListCtrl')) {
            ctrlReinitMap.remove('PrescriptListCtrl');
            $log.debug("PrescriptList ctrl afterEnter init");
            $scope.init();
        }
    });
    /**
     * 初始化
     */
    $scope.init=function(){
        $log.debug("PrescriptList ctrl init ");
	    $scope.page.where="status=1";
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
        PrescriptService.first(null,$scope.page).then(function (data) {
            $log.debug("PrescriptList ctrl query then");
            $scope.addList(data);
            $scope.$broadcast('scroll.refreshComplete');
        });
    };
    /**
     * 下拉加载更多查询
     */
    $scope.more=function(){
        $log.debug("PrescriptList ctrl more=========");
        if(!$scope.page.hasNextPage){
            return;
        }
        PrescriptService.more($scope.page).then(function (data) {
            $log.debug("PrescriptList ctrl more then");
            $scope.addList(data);
            $scope.$broadcast('scroll.infiniteScrollComplete');
        });
    };
  /**
   * 删除药方
   * @param id
   */
  $scope.delPrescrip=function(prescript){
    CommonService.confirm('确认删除？').then(function(res) {
      if(res) {
        PrescriptService.getPage.cmd=cmd_PRESCRIPT_CANCEL;
        PrescriptService.update(prescript, PrescriptService.getPage).then(function(){
          CommonService.alertm("药方已取消");
          $scope.init();
        })
      } else {

      }});

  };
  //医生选中此药方
  $scope.chooseThis=function(obj){
    $scope.where="status=1 and prescriptId="+obj.id;
    $scope.first3($scope.where);
  };
  /**
   * 查询该处方药品
   */
  $scope.first3=function(parame){
    PrescriptProductService.first(parame).then(function (data) {
      angular.forEach(data, function (item) {
        $scope.cartAdd2(item,item.productIdProductObj);
      });
      $location.path("/tab/RA_Orderryaojian/0");
    });

  };
  /**
   * 从处方过来加入购物车
   * @param product
   */
  $scope.cartAdd2=function(prescriptProduct,product) {
    var cart=$scope.cartFind(product.id);
    if(!cart)
      cart=$scope.cartCreate(product.id);
    // 我正在看的患者
    $scope.memberDoctorWatching=Storage.get(MEMBER_DOCTOR_WATCHING);
    cart.productId=product.id;
    cart.memberId=$scope.memberDoctorWatching.id;
    cart.img1=product.img1;
    cart.title=product.title;
    cart.price=product.price;
    cart.num += prescriptProduct.num;
    //obj1放成产品，以后在购物车界面上会用到
    cart.obj1=product;
    Storage.set(LISTCART, $scope.listCart);
    $scope.refereshPrice();
  };
  /**
   * 删除按钮，点击删除按钮出现，再点击删除按钮消失
   */
  $scope.change=function(){
    if($scope.vm.delshow){
      $scope.vm.delshow=false;
    }else{
      $scope.vm.delshow=true;
    }
  };
    $scope.init();
    ctrlReinitMap.remove('PrescriptListCtrl');
});
