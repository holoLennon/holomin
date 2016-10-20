/**
 * Orderr，订单详细
 */
appctrl.controller('OrderrCtrl', function($scope, $rootScope, $timeout,$ionicPopup,
                                          $ionicTabsDelegate, $ionicPopover, $ionicModal, $ionicLoading,
                                          $location, $state,$ionicScrollDelegate,
                                          $cordovaNetwork, $cordovaGoogleAnalytics,
                                          $stateParams,$log,Storage,$ionicHistory,
                                          ENV,CommonService,OrderrService,zspecService) {
  $log.debug("enter Orderr ctrl");
  /**参数*/
  var id = $stateParams.id;
  /**页面对象*/
  $scope.vm={};
  $scope.vm.isedit=(id=='0');
  /**选中的药店*/
  $scope.drugstore={};
  /**对象*/
  $scope.obj={};
  // 我正在看的患者
  $scope.memberDoctorWatching={};
  /**
   * 进入前
   */
  $scope.$on('$ionicView.beforeEnter', function() {
    $log.debug("Orderr ctrl1 beforeEnter");
    if(ctrlReinitMap.get('OrderrCtrl-drugstore')){
      $log.debug("wocongnaliguolai");
      $scope.drugstore=ctrlReinitMap.get('OrderrCtrl-drugstore');

    }
  });
  /**
   * 进入后
   */
  $scope.$on('$ionicView.afterEnter', function() {
    $log.debug("Orderr ctrl afterEnter");
    if (ctrlReinitMap.get('OrderrCtrl')) {
      ctrlReinitMap.remove('OrderrCtrl');
      $log.debug("Orderr ctrl afterEnter init");
      $scope.init();
    }
    // 我正在看的患者
    $scope.memberDoctorWatching=Storage.get(MEMBER_DOCTOR_WATCHING);
    $log.debug("$scope.memberDoctorWatching");
    $log.debug($scope.memberDoctorWatching);
    if(!isblank($scope.memberDoctorWatching)){
      $scope.obj.memberId=$scope.memberDoctorWatching.id;
    }
  });
  /**
   * 初始化
   */
  $scope.init=function(){
    $log.debug("Orderr ctrl init id="+id);
    $scope.get();
  };
  /**
   * 获取本地对象
   */
  $scope.getlocal=function(){
    $log.debug("Orderr ctrl getlocal id="+id);
    if(isblank0(id)){
      $scope.obj= _.clone(_Orderr);
    }else{
      $scope.obj=OrderrService.getlocal(id);
    }
    $log.debug($scope.obj);
  };
  /**
   * 获取网络对象
   */
  $scope.get=function(){
    $log.debug("Orderr ctrl get id="+id);
    if(isblank0(id)) {
      OrderrService.newget().then(function (data) {
        $log.debug("Orderr ctrl newget then");
        $scope.obj=data;
        //补全一些数据
        $scope.obj.memberId=$scope.memberDoctorWatching.id;
        if(Storage.get(NOW_ORDERR_DIAG))
          $scope.obj.diagnose=Storage.get(NOW_ORDERR_DIAG);
        if(YJTCM&&Storage.get(NOW_ORDERR_EACHNUM))
         $scope.obj.eachnum=Storage.get(NOW_ORDERR_EACHNUM);
        $log.debug($scope.obj);
      });
    }else{
      OrderrService.get(id).then(function (data) {
        $log.debug("Orderr ctrl get then");
        $scope.obj=data;
      });
    }
  };
  /**
   * 保存
   */
  $scope.saveOrderr=function(){
    $log.debug("Orderr ctrl get id="+id);
    $log.debug($scope.obj);
    if(isblanklist($scope.listCart)){
      //空药不能提交
      CommonService.alertm('亲，药笺中未选药,药笺无效 1哦').then(function (res) {});
      return;
    }
    if(isblanklist($scope.obj.diagnose)){
      //空药不能提交
      CommonService.alertm('亲，还未诊断哦，请填写诊断信息').then(function (res) {});
      return;
    }
    //obj的obj1是$scope.listCart从对象变成json字符串，记得不要太长。
    for(var i = 0;i < $scope.listCart.length; i++) {
      var orderrdetail=$scope.listCart[i];
      orderrdetail.obj1=null;
    }
    ctrlReinitMap.remove('OrderrCtrl-drugstore');
    if(!isblank($scope.drugstore)){
      $scope.obj.drugstoreId=$scope.drugstore.id;
      ctrlReinitMap.remove('OrderrCtrl-drugstore');
    }
    $scope.obj.listorderrdetail=$scope.listCart;
    if(YJTCM){
      for(var i=0;i<$scope.obj.listorderrdetail.length;i++){
        $scope.obj.listorderrdetail[i].otherdetail= $scope.obj.obj2;
      }
    }
    $scope.vm.isedit=false;
    $scope.obj.obj1=window.JSON.stringify($scope.obj.listorderrdetail);
    $scope.obj.myname=null;
    $scope.obj.mynameid=null;
    $scope.obj.itypePay=1;
    if(isblank0(id)) {
      OrderrService.create($scope.obj).then(function (data) {
        $log.debug("Orderr ctrl save then");
        $scope.obj=data;
        Storage.remove(NOW_ORDERR_DIAG);
        if(YJTCM){
          Storage.remove(NOW_ORDERR_EACHNUM);
        }
      });
    }else{
      OrderrService.update($scope.obj).then(function (data) {
        $log.debug("Orderr ctrl update then");
        $scope.obj=data;
        Storage.remove(NOW_ORDERR_DIAG);
        if(YJTCM){
          Storage.remove(NOW_ORDERR_EACHNUM);
        }
      });
    }
    $ionicScrollDelegate.scrollTop();
    //清除开完药笺后页面残留问题
    angular.forEach(Storage.get(LISTCART), function (item) {
      var index = $scope.cartFindIndex(item.productId);
      if (index > -1) {
        $scope.listCart.remove(index);
      }
      Storage.set(LISTCART,$scope.listCart);
      if ($scope.listCart.length == 0) {
        $scope.listCart = null;
      }
    });
    $scope.refereshPrice();
  };
  /**
   * 总价格显示2位小数
   * @param a
   * @param b
   * @returns {*}
     */
  $scope.countSumprice=function(a,b){
    if(isblank(a)||isblank(b)){
      return 0;
    }
    var c=a*b;
    return c.toFixed(2);
  }
  /**
   * 单贴价格显示2位小数
   * @param a
   * @returns {*}
     */
  $scope.countPrice=function(a){
    if(isblank(a)){
      return 0;
    }
    return a.toFixed(2);
  }
  /**
   * 保存处方
   */
  $scope.savePrescript=function(id){
    $scope.dialog = $ionicPopup.show({
      template:
      '<input type="text" ng-model="vm.title1" style="border: #DA0E0E 1px solid;">'+
      '   <a  ng-click="invalid(vm.title1)" class="button button-full button-balanced" style="width: 100%;border: none;background-color: #7E5335;margin-bottom: -10px;">确定</a> ',
      title: '请输入处方名称！',
      scope: $scope,
      buttons: [{
        text: '关闭'
      }]
    });
  };
  /**
   * 保存处方点击确定。
   * @param title
   */
  $scope.invalid=function(title){
    if(isblank(title)){
      CommonService.alertm("请给本处方取个名！");
      return;
    }
    zspecService.savePrescript( $scope.obj.id,title).then(function(data){
      if(data.msg="ok"){
        CommonService.alertm("保存成功！");
        $scope.vm.title1='';
        $scope.dialog.close();
      }else {
        CommonService.alertm(data.msg);
      }
    });
  };
  /**
   * 点击了叉叉，如果是id=0，返回上一页
   */
  $scope.clickx=function(){
    if(id==='0')
      goBack();
  };
  //加药
  $scope.addNum=function(listCart) {
    if (listCart.num >= 1) {
      listCart.num += 1;
    }
  }
  $scope.reduceNum=function(listCart) {
    if (listCart.num > 1) {
      listCart.num -= 1;
    }
  }
  $scope.addNewProduct=function(){
    $log.debug("abc"+JSON.stringify(Storage.get(LISTCART)));
    Storage.set(NOW_ORDERR_DIAG, $scope.obj.diagnose);
    if(YJTCM){
      Storage.set(NOW_ORDERR_EACHNUM, $scope.obj.eachnum);
    }
    $scope.cartSaveLocal();
    $scope.rx('#/tab/DoctorProductList/1');
  };
  /**
   * 贴数加1
   * @param product
     */
  $scope.eachnumAdd=function() {
    $scope.obj.eachnum=parseInt($scope.obj.eachnum)+1;
  };
  /**
   * 贴数减1
   * @param product
   */
  $scope.eachnumRemove=function(){
    if( $scope.obj.eachnum==1){
      return;
    }
    $scope.obj.eachnum=parseInt($scope.obj.eachnum)-1;
  };
  /**
   * 去药店页
   */
  $scope.gotodrugstoreList=function(){
    Storage.set(NOW_ORDERR_DIAG, $scope.obj.diagnose);
    if(YJTCM){
      Storage.set(NOW_ORDERR_EACHNUM, $scope.obj.eachnum);
    }
    $scope.rx('#/tab/DrugstoreList/0');
  }
  $scope.init();
  ctrlReinitMap.remove('OrderrCtrl');
});
