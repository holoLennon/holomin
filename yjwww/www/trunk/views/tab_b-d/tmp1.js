appctrl.controller('tmp1Ctrl', function($scope, $state, $rootScope, $timeout,
                                      $cordovaClipboard, $cordovaEmailComposer, $cordovaGoogleAnalytics,$ionicPopover,
                                      $ionicHistory, $ionicLoading, $ionicPopup, $log, ENV
                                      ,CommonService,Storage,WxService

    ) {
    console.log("enter tmp1 ctrl");

    $scope.$on('$ionicView.beforeEnter', function() {
        console.log("tmp1 ctrl beforeEnter");
    });

    $scope.$on('$ionicView.afterEnter', function() {
        console.log("tmp1 ctrl afterEnter");
        if (ctrlReinitMap.get('tmp1Ctrl')) {
            ctrlReinitMap.remove('tmp1Ctrl');
            $scope.init();
        }
    });

    /**
     * 初始化
     */
    $scope.init=function(){
        console.log("tmp1 init ");
        $scope.ppp={id:123};
        //pubnowtab="A";
    };

    $scope.init();

});
