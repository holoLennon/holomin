/**
 * ProductTypeLinkProductListHomeCtrl，商品类型包含商品列表
 */
appctrl.controller('ProductTypeLinkProductListHomeCtrl', function ($scope, $rootScope, $timeout,
                                                                   $ionicTabsDelegate, $ionicPopover, $ionicModal, $ionicLoading,
                                                                   $location, $state,
                                                                   $cordovaNetwork, $cordovaGoogleAnalytics, $log, Storage,
                                                                   ENV, ProductService, GaodeService, CommonService,MemberdoctorService,zspecService) {
  $log.debug("enter ProductTypeLinkProductListHome ctrl");
  /**页码*/
  $scope.page = _.clone(_Page);
  /**页面显示的列表*/
  $scope.list = [];
  /**页码2*/
  $scope.page2= _.clone(_Page);
  $scope.doctor_id=0;
  if(Storage.get(LOGINED_USER_B)!=null){
    $scope.doctor_id=Storage.get(LOGINED_USER_B).id;
  }
  $scope.page2.where="doctor_id="+$scope.doctor_id;
  /**给医生发消息的会员数量 */
  $scope.dmsgnum=0;
  /**
   * 进入前
   */
  $scope.$on('$ionicView.beforeEnter', function () {
    $log.debug("ProductTypeLinkProductListHome ctrl beforeEnter");
  });
  /**
   * 进入后
   */
  $scope.$on('$ionicView.afterEnter', function () {
    $log.debug("ProductTypeLinkProductListHome ctrl afterEnter");
    if (ctrlReinitMap.get('ProductTypeLinkProductListHomeCtrl')) {
      ctrlReinitMap.remove('ProductTypeLinkProductListHomeCtrl');
      $log.debug("ProductTypeLinkProductListHome ctrl afterEnter init");
      $scope.init();
    }
  });
  /**
   * 版本检查，只有安卓苹果才升级
   */
  $scope.checkver=function(){
    if(!_ClientInfo || !_ClientInfo.cli)
      return;
    //只有安卓苹果才升级
    if(_ClientInfo.cli!=1 && _ClientInfo.cli!=2)
      return;
    zspecService.verControl(_ClientInfo.ver,_ClientInfo.cli).then(function(data){
      if(data.msg=="FORCE"){
        if(_ClientInfo.cli==1){
          CommonService.alertm("亲 你的版本过低，请先升级").then(function(res) {
            window.location.href = 'http://yijian.zjjnyd.com/yijianwwwupdatea_b/yijian_b.apk';
          });
        }else if(_ClientInfo.cli==2){
          CommonService.alertm("亲 你的版本过低，请先升级").then(function(res) {
            window.location.href = 'https://itunes.apple.com/us/app/yi-yao-yi-jian-tong-yi-sheng-ban/id1102738605';
          });
        }
      }else if(data.msg=="ADVICE"){
        if(_ClientInfo.cli==1){
          CommonService.confirm("亲 你的版本过低，请先升级").then(function(res) {
            if(res) {
              window.location.href = 'http://yijian.zjjnyd.com/yijianwwwupdatea_b/yijian_b.apk';
            }
          });
        }else if(_ClientInfo.cli==2){
          CommonService.confirm("亲 你的版本过低，请先升级").then(function(res) {
            if(res) {
              window.location.href = 'https://itunes.apple.com/us/app/yi-yao-yi-jian-tong-yi-sheng-ban/id1102738605';
            }
          });
        }
      }else{
        return;
      }
    });
  }
  /**
   * 初始化
   */
  $scope.init = function () {
    $log.debug("ProductTypeLinkProductListHome ctrl init ");
    if(wxNoOpenid()) {
      window.location.href=outGetOpenidUrl_b;
      return;
    }
    //检查版本号
    $scope.checkver();

    $scope.pcc = areaTree;
    //地区默认选浙江
    $scope.province = areaTree[3];
    $scope.city = $scope.province.children[0];
    $scope.county = $scope.city.children[1];
    $scope.page.cmd = "agentarea=" + $scope.county.id;
    $scope.page.pageNo = 1;
    $scope.page.hasNextPage = false;
    $scope.list = [];
    $scope.first();
    $scope.havaMessage();
  };
  /**
   * 上拉刷新
   */
  $scope.doRefresh = function () {
    $scope.init();
  };
  /**
   * 获取给医生发消息的会员数量
   */
  $scope.havaMessage=function(){
    if(Storage.get(LOGINED_USER_B)==null){
      return;
    };
    MemberdoctorService.first(null,$scope.page2).then(function (data) {
      angular.forEach(data, function (item) {
        if(item.dmsgnotread>0){
          $scope.dmsgnum++;
        }
      });
    });
  }
  /**
   * 给list上加数据
   * @param data
   */
  $scope.addList = function (data) {
    /**
     * 根据代理地区进行查询分类
     */
    angular.forEach(data, function (item) {
      $scope.list.push(item);
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
    ProductService.first(null, $scope.page).then(function (data) {
      $log.debug("ProductTypeLinkProductListHome ctrl query then");
      $scope.addList(data);
      $scope.$broadcast('scroll.refreshComplete');
    });
  };

  /**
   * 下拉加载更多查询
   */
  $scope.more = function () {
    $log.debug("ProductTypeLinkProductListHome ctrl more=========");
    if (!$scope.page.hasNextPage) {
      return;
    }
    ProductService.more($scope.page).then(function (data) {
      $log.debug("ProductTypeLinkProductListHome ctrl more then");
      $scope.addList(data);
      $scope.$broadcast('scroll.infiniteScrollComplete');
    });
  };
  $scope.searchByCounty = function (county, city, province) {
    $scope.county = county;
    $scope.city = city;
    $scope.province = province;
    $scope.page.cmd = "agentarea=" + $scope.county.id;
    $scope.page.pageNo = 1;
    $scope.page.hasNextPage = false;
    $scope.list = [];
    $scope.first();
  };

  $scope.init();
  ctrlReinitMap.remove('ProductTypeLinkProductListHomeCtrl');
});
