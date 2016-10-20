/**使用者角色 '5':'会员','6':'医生','8':'业务员'*/
var roleId=8;
/**
 * 配置路由
 */
app.config(function($stateProvider, $urlRouterProvider,$logProvider,ENV) {
    $logProvider.debugEnabled(ENV.debug);
    console.log("app.config.route");
    $stateProvider
        //菜单
        .state('tab', {
            url: "/tab",
            abstract: true,
            templateUrl: "views/pub/tabs_c.html",
            controller: 'tabCtrl'
        })
        ///////////////////////a
      //首页
      .state('tab.DoctorList', {
        url: '/DoctorList',
        views: {
          'tab_c-a': {
            templateUrl: 'views/tab_c-a/DoctorList.html',
            controller: 'DoctorListCtrl'
          }
        }
      })
      // 医生信息添加
      .state('tab.RA_Doctor', {
          url: '/RA_Doctor/:id',
          views: {
            'tab_c-a': {
              templateUrl: 'views/tab_c-a/Doctor.html',
              controller: 'DoctorCtrl'
            }
          }
        })
        //搜索医生
        .state('tab.RA_DoctorListSearch', {
          url: '/RA_DoctorListSearch/:kw',
          views: {
            'tab_c-a': {
              templateUrl: 'views/tab_c-a/DoctorListSearch.html',
              controller: 'DoctorListSearchCtrl'
            }
          }
        })
      //// 我的二维码
      .state('tab.RA_SalesmanQrcode', {
        url: '/RA_SalesmanQrcode/:id',
        views: {
          'tab_c-a': {
            templateUrl: 'views/tab_c-a/SalesmanQrcode.html',
            controller: 'SalesmanCtrl'
          }
        }
      })


      ///////////////////b
      //云药房
      .state('tab.CloudPharmacy', {
        url: '/CloudPharmacy',
        views: {
          'tab_c-b': {
            templateUrl: 'views/tab_c-b/CloudPharmacy.html',
            controller: 'CloudPharmacyCtrl'
          }
        }
      })
      //商品详细
      .state('tab.RB_StoreProduct', {
        url: '/RB_StoreProduct/:id',
        views: {
          'tab_c-b': {
            templateUrl: 'views/tab_c-b/StoreProduct.html',
            controller: 'StoreProductCtrl'
          }
        }
      })
      ///////////////////c
      //药店
      .state('tab.Drugstore', {
        url: '/Drugstore',
        views: {
          'tab_c-c': {
            templateUrl: 'views/tab_c-c/Drugstore.html',
            controller: 'DrugstoreCtrl'
          }
        }
      })
      ///////////////////d
      //我的
      .state('tab.Mystore', {
        url: '/Mystore',
        views: {
          'tab_c-d': {
            templateUrl: 'views/tab_c-d/Mystore.html',
            controller: 'MystoreCtrl'
          }
        }
      })
      //// 我的二维码
        .state('tab.RD_SalesmanQrcode', {
          url: '/RD_SalesmanQrcode/:id',
          views: {
            'tab_c-d': {
              templateUrl: 'views/tab_c-a/SalesmanQrcode.html',
              controller: 'SalesmanCtrl'
            }
          }
        })
      //个人信息
      .state('tab.RD_Editseller', {
        url: '/RD_Editseller',
        views: {
          'tab_c-d': {
            templateUrl: 'views/tab_c-d/Editseller.html',
            controller: 'SalesmanCtrl'
          }
        }
      })
      //密码修改
      .state('tab.RD_Userinfo', {
        url: '/RD_Userinfo',
        views: {
          'tab_c-d': {
            templateUrl: 'views/tab_c-d/Userinfo.html',
            controller: 'UserinfoCtrl'
          }
        }
      })
      //设置
      .state('tab.RD_Setting', {
        url: '/RD_Setting',
        views: {
          'tab_c-d': {
            templateUrl: 'views/tab_c-d/Setting.html',
            controller: 'MystoreCtrl'
          }
        }
      })

      //建设中跳转
      .state('tab.RD_Madingpage', {
        url: '/RD_Madingpage',
        views: {
          'tab_c-d': {
            templateUrl: 'views/tab-a/Madingpage.html'
          }
        }
      })
      //关于易健
      .state('tab.RD_yijian', {
        url: '/RD_yijian',
        views: {
          'tab_c-d': {
            templateUrl: 'views/tab_c-d/yijian.html'
          }
        }
      })
      //服务页
      .state('tab.RD_fuwu', {
        url: '/RD_fuwu',
        views: {
          'tab_c-d': {
            templateUrl: 'views/tab_c-d/fuwu.html',
            controller: 'MystoreCtrl'
          }
        }
      })
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/DoctorList');
});
