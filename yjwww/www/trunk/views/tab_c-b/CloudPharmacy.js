/**
 * ProductTypeLinkProductListHomeCtrl，商品类型包含商品列表
 */
appctrl.controller('CloudPharmacyCtrl', function ($scope, $rootScope, $timeout,
                                                                   $ionicTabsDelegate, $ionicPopover, $ionicModal, $ionicLoading,
                                                                   $location, $state,
                                                                   $cordovaNetwork, $cordovaGoogleAnalytics, $log, Storage,
                                                                   ENV, ProductTypeLinkProductService, GaodeService, CommonService) {
  $log.debug("enter CloudPharmacy ctrl");
  /**页码*/
  $scope.page = _.clone(_Page);
  /**页面显示的列表*/
  $scope.list = [];
  /**
   * 进入前
   */
  $scope.$on('$ionicView.beforeEnter', function () {
    $log.debug("CloudPharmacy ctrl beforeEnter");
  });
  /**
   * 进入后
   */
  $scope.$on('$ionicView.afterEnter', function () {
    $log.debug("CloudPharmacy ctrl afterEnter");
    if (ctrlReinitMap.get('CloudPharmacyCtrl')) {
      ctrlReinitMap.remove('CloudPharmacyCtrl');
      $log.debug("CloudPharmacy ctrl afterEnter init");
      $scope.init();
    }
  });

  /**
   * 初始化
   */
  $scope.init = function () {
    $log.debug("CloudPharmacy ctrl init ");
    $scope.pcc = areaTree;
    //地区默认选浙江
    $scope.province = areaTree[3];
    $scope.city = $scope.province.children[0];
    $scope.county = $scope.city.children[1];
    $scope.page.where = "productTypeId=" + ProductTypeNew;
    $scope.page.pageNo = 1;
    $scope.page.hasNextPage = false;
    $scope.list = [];
    $scope.first();
  };
  /**
   * 上拉刷新
   */
  $scope.doRefresh = function () {
    $scope.init();
  };
  /**
   * 给list上加数据
   * @param data
   */
  $scope.addList = function (data) {
    angular.forEach(data, function (item) {
      var Code = item.productIdProductObj.agentarea;
      var cityCode = parseInt($scope.city.id/100 )*100;
      var provinceCode = parseInt($scope.province.id / 10000)*10000;
      if (Code == $scope.county.id || Code == 0 || Code == cityCode || Code == provinceCode) {
        $log.debug(Code + "----" + cityCode + "------" + provinceCode);
        $scope.list.push(item);
      };
    });
    if (data && data.length < $scope.page.pageSize) {
      $scope.page.hasNextPage = false;
    } else {
      $scope.page.hasNextPage = true;
    }
  };

  /**
   * 第一次查询
   */
  $scope.first = function () {
    ProductTypeLinkProductService.first(null, $scope.page).then(function (data) {
      $log.debug("CloudPharmacy ctrl query then");
      $scope.addList(data);
      $scope.$broadcast('scroll.refreshComplete');
    });
  };

  /**
   * 下拉加载更多查询
   */
  $scope.more = function () {
    $log.debug("CloudPharmacy ctrl more=========");
    if (!$scope.page.hasNextPage) {
      return;
    }
    ProductTypeLinkProductService.more($scope.page).then(function (data) {
      $log.debug("CloudPharmacy ctrl more then");
      $scope.addList(data);
      $scope.$broadcast('scroll.infiniteScrollComplete');
    });
  };
  $scope.searchByCounty = function (county, city, province) {
    //if (county == $scope.city.children[0]) {
    //  CommonService.alertm("请选择 区");
    //}
    $scope.county = county;
    $scope.city = city;
    $scope.province = province;
    $scope.page.where = "productTypeId=" + ProductTypeNew;
    $scope.page.pageNo = 1;
    $scope.page.hasNextPage = false;
    $scope.list = [];
    $scope.first();
  };

  $scope.init();
  ctrlReinitMap.remove('CloudPharmacyCtrl');
});
