/**
 * 服务:Gaode，高德地图
 */
appservice
    .service('GaodeService', function($resource, $rootScope,$q,$http,$log,Storage,ENV) {
        $log.debug("GaodeService in");
        //地图
        var map;
        //地图中心点
        var mapcenter=[120.17189,30.264664];
        //当前城市信息
        var cityinfo={province:'浙江省',city:'杭州市',citycode:'0571',district:'下城区'};
        //驾车导航对象，这样导航不会重复显示在地图上
        var driving;
        //我的地点
        var myLocate=[120.158276,30.285134];
        //地图上的marker对象，marker,itype:0公共，1个人，2自己，10公共红色，11公共橙色，12公共绿色
        //var mapMarker={marker:null,itype:0};
        //图上的marker列表，marker是高德对象，加itype:0公共，1个人，2自己，10公共红色，11公共橙色，12公共绿色
        var listMarker=[];
        //唯一的marker
        var onlyMarker;
        //浏览器GPS定位
        var geolocationBrowser=null;
        //GPS定位后，地图前往
        var locateAfterGeo=false;
        // 搜索
        var MSearch;
        ////////下面是常量
        var icon0 = new AMap.Icon({
            image :'res/img/png2/iconfont-dingwei-green.png',//24px*24px
            size : new AMap.Size(24,24)
        });
        var icon1 = new AMap.Icon({
            image :'res/img/png2/iconfont-dingwei-yellow.png',//24px*24px
            size : new AMap.Size(24,24)
        });
        var icon2 = new AMap.Icon({
            image :'res/img/png2/iconfont-dingwei-red.png',//24px*24px
            size : new AMap.Size(24,24)
        });
        var icon10 = new AMap.Icon({
            image :'res/img/png2/iconfont-dingwei-blue.png',//24px*24px
            size : new AMap.Size(24,24)
        });
        var icon11 = new AMap.Icon({
            image :'res/img/png2/iconfont-dingweidizhigpsditu-blue.png',//24px*24px
            size : new AMap.Size(24,24)
        });
        var icon12 = new AMap.Icon({
            image :'res/img/png2/iconfont-dingweidizhigpsditu-orange.png',//24px*24px
            size : new AMap.Size(24,24)
        });

        return {
            /**
             * 重置变量，因为GaodeService是单例，再进入地图的时候重置上次的变量
             */
            retset: function() {
                amap = null;
                map = null;
                onlyMarker = null;
                listMarker = [];
                $log.debug('mapaddr reset');
            },
            /**
             * 创建地图
             * @param amapId 地图容器外层框架名称，默认为 amap
             * @param mapContainerId 地图容器id名称，默认为 gaode_container_shopdrugstore
             */
            createMap: function (amapId, mapContainerId) {
                this.retset();
                if (!amapId)
                    amapId = "amap";
                if (!mapContainerId)
                    mapContainerId = "gaode_container_shopdrugstore";
                var amap = document.getElementById(amapId);
                amap.parentNode.style.height = "100%"; //这个没有的话，地图高度为0就看不到了
                //从存储获取上次的中心点
                var storagemapcenter = Storage.get(MAP_CENTER);
                if (storagemapcenter)
                    mapcenter = storagemapcenter;
                map = new AMap.Map(mapContainerId, {
                    resizeEnable: true,
                    zoom: DEFMAPLEVEL,
                    center: mapcenter
                });
                AMap.plugin(['AMap.ToolBar','AMap.Scale','AMap.Geolocation'],function(){
                    var toolBar = new AMap.ToolBar();
                    var scale = new AMap.Scale();
                    var geolocation = new AMap.Geolocation({
                        enableHighAccuracy: true,//是否使用高精度定位，默认:true
                        timeout: 10000,          //超过10秒后停止定位，默认：无穷大
                        maximumAge: 0,           //定位结果缓存0毫秒，默认：0
                        convert: true,           //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
                        showButton: true,        //显示定位按钮，默认：true
                        buttonPosition: 'LB',    //定位按钮停靠位置，默认：'LB'，左下角
                        buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
                        showMarker: true,        //定位成功后在定位到的位置显示点标记，默认：true
                        showCircle: true,        //定位成功后用圆圈表示定位精度范围，默认：true
                        panToLocation: true,     //定位成功后将定位到的位置作为地图中心点，默认：true
                        zoomToAccuracy:true      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
                    });
                    map.addControl(toolBar);
                    map.addControl(scale);
                    map.addControl(geolocation);
                });
                AMap.service(["AMap.PlaceSearch"], function () {
                    //关键字查询
                    //中心点坐标
                    //var cpoint = [116.405467, 39.907761];
                    MSearch = new AMap.PlaceSearch({ //构造地点查询类
                        pageSize: 10,
                        pageIndex: 1,
                        city: cityinfo.citycode //城市
                    });
                });
                map.on('moveend', this.mapMove);
                return map;
            },
            /**
             * 地图移动时做的事
             */
            mapMove: function () {
                //城市信息
                map.getCity(function (data) {
                    if (data['province'] && typeof data['province'] === 'string') {
                        cityinfo.province = data['province'];
                        cityinfo.city = data['city'];
                        cityinfo.citycode = data['citycode'];
                        cityinfo.district = data['district'];
                        //console.log(cityinfo);
                    }
                });
                //当前位置保存
                var ll = map.getCenter();
                Storage.set(MAP_CENTER, [ll.getLng(), ll.getLat()]);
            },
            /**
             * 计算两点距离
             * @param lnglat1 ex.[120.17189,30.264664]
             * @param lnglat2 ex.[120.17189,30.264664]
             */
            distance:function(lnglat1,lnglat2){
                var aLnglat1=new AMap.LngLat(lnglat1[0],lnglat1[1]);
                var aLnglat2=new AMap.LngLat(lnglat2[0],lnglat2[1]);
                var dist= aLnglat1.distance(aLnglat2);
                dist=parseInt(dist);
                return dist;
            },
            /**
             * 加标记
             * 标记事件如marker.on('click',function(e){})在controller中做
             * @param lnglat ex.[120.17189,30.264664]
             * @param itype :0公共，1个人，2自己，10公共红色，11公共橙色，12公共绿色
             * @returns {AMap.Marker}
             */
            addMarker: function (lnglat, itype) {
                var marker = this.findMarker(lnglat);
                if (marker == null) {
                    var icon = this.getIcon(itype);
                    marker = new AMap.Marker({
                        map: map,
                        icon: icon,
                        position: lnglat
                    });
                    marker.itype = itype;
                    listMarker.push(marker);
                }
                return marker;
            },
            /**
             * 唯一marker
             * @param lnglat
             * @returns {*}
             */
            onlyMarker: function (lnglat) {
                if (onlyMarker == null) {
                    var icon = this.getIcon(0);
                    onlyMarker = new AMap.Marker({
                        map: map,
                        icon: icon,
                        position: lnglat
                    });
                }else{
                    onlyMarker.setPosition(lnglat);
                }
            },
            /**
             * 根据经纬度在marker列表中寻找marker
             * @param lnglat.[120.17189,30.264664]
             * @returns {*}
             */
            findMarker: function (lnglat) {
                for (var index in listMarker) {
                    var marker = listMarker[index];
                    if (marker.getPosition().getLng() === lnglat[0] && marker.getPosition().getLat() === lnglat[1]) {
                        return marker;
                    }
                }
                return null;
            },

            /**
             * 根据标记类型获取标记图标
             * @param itype
             * @returns {AMap.Icon}
             */
            getIcon: function (itype) {
                switch (itype) {
                    case 1:
                        return icon1;
                        break;
                    case 2:
                        return icon2;
                        break;
                    case 10:
                        return icon10;
                        break;
                    case 11:
                        return icon11;
                        break;
                    case 12:
                        return icon12;
                        break;
                    default:
                        return icon0;
                }
            },
            /**
             * 地图搜索之关键字，找到后地图自动跳到第一项所指地区
             * @param kw
             */
            searchMap: function (kw) {
                MSearch.search(kw, function (status, result) {
                    if (status === 'complete' && result.info === 'OK') {
                        var poiList = result.poiList;
                        if (!poiList)
                            return;
                        var pois = poiList.pois;
                        if (pois && pois.length > 0) {
                            map.setZoomAndCenter(DEFMAPLEVEL, pois[0].location);
                        }
                        $log.debug('pois length' + pois.length);
                    }
                });
            },
            /**
             * 设置我的位置
             * @param lnglat ex.[120.17189,30.264664]
             */
            setMyLocate: function (lnglat) {
                myLocate = lnglat;
            },
            /**
             * 我的位置
             * @returns {number[]}
             */
            getMyLocate: function () {
                return myLocate;
            },
            /**
             * 导航
             * @param dest 到达 ex. [120.17189,30.264664]
             * @param from 发出，为空默认为自己当前位置 ex. [120.17189,30.264664]
             */
            drivingNav: function (dest, from) {
                AMap.service(["AMap.Driving"], function () {
                    if (!driving) {
                        driving = new AMap.Driving({
                            map: map
                        }); //构造路线导航类
                    }
                    if (!from)
                        from = myLocate;
                    //根据起终点坐标规划路线
                    driving.search(from, dest, function (status, result) {
                        console.log(result);
                    });
                });
            },
            /**
             * 导航之可拖版
             * @param dest 到达 ex. [120.17189,30.264664]
             * @param from 发出，为空默认为自己当前位置 ex. [120.17189,30.264664]
             */
            drivingRouteNav: function (dest, from) {
                if (!from)
                    from = myLocate;
                var path = [form, dest];
                map.plugin("AMap.DragRoute", function () {
                    if (!driving)
                        driving = new AMap.DragRoute($scope.map, path, AMap.DrivingPolicy.LEAST_FEE); //构造拖拽导航类
                    driving.search(); //查询导航路径并开启拖拽导航
                });
            },
            /**
             * 反地理编码
             * @param lnglat ex.[120.0,30.0]
             * @returns {*}
             */
            geocoder: function (lnglat) {
                var deferred = $q.defer();
                AMap.service('AMap.Geocoder',function() {//回调函数
                    //实例化Geocoder
                    var geocoder = new AMap.Geocoder({
                        city: "010"//城市，默认：“全国”
                    });
                    geocoder.getAddress(lnglat, function(status, result) {
                        //把返回数据组装成一个对象
                        var data = {
                            'status': status,
                            'result': result,
                            'lnglat': lnglat
                        };
                        deferred.resolve(data);
                    });
                });
                return deferred.promise;
            },
            ////////////////高德版浏览器
            /**
             * 通过高德控件浏览器定位，不太准
             * @returns {number}
             */
            geoByBrowserGdInit: function () {
                $log.debug("geoByBrowserGdInit");
                map.plugin('AMap.Geolocation', function () {
                    geolocationBrowser = new AMap.Geolocation({
                        enableHighAccuracy: true,//是否使用高精度定位，默认:true
                        timeout: 10000,          //超过10秒后停止定位，默认：无穷大
                        maximumAge: 0,           //定位结果缓存0毫秒，默认：0
                        convert: true,           //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
                        showButton: true,        //显示定位按钮，默认：true
                        buttonPosition: 'LB',    //定位按钮停靠位置，默认：'LB'，左下角
                        buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
                        showMarker: true,        //定位成功后在定位到的位置显示点标记，默认：true
                        showCircle: true,        //定位成功后用圆圈表示定位精度范围，默认：true
                        panToLocation: true,     //定位成功后将定位到的位置作为地图中心点，默认：true
                        zoomToAccuracy: true      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
                    });
                    map.addControl(geolocationBrowser);
                    AMap.event.addListener(geolocationBrowser, 'complete', this.onGeoBrowserComplete);//返回定位信息
                    AMap.event.addListener(geolocationBrowser, 'error', this.onGeoBrowserError);      //返回定位出错信息
                });
            },
            /**
             * 获取当前浏览器GPS定位
             */
            getBrowseGdPosition:function(){
                if(geolocationBrowser==null)
                    this.geoByBrowserGdInit();
                else
                    geolocationBrowser.getCurrentPosition();
            },
            onGeoBrowserComplete: function (data) {
                $log.debug("onGeoBrowserComplete"+data);
                /*
                 var str = '<div>定位成功</div>';
                 str += '<div>经度：' + data.position.getLng() + '</div>';
                 str += '<div>纬度：' + data.position.getLat() + '</div>';
                 str += '<div>精度：' + data.accuracy + ' 米</div>';
                 str += '<div>是否经过偏移：' + (data.isConverted ? '是' : '否') + '</div>';
                 */
                if (data && data.position){
                    myLocate = [data.position.getLng(), data.position.getLat()];
                    this.addMarker(myLocate,2);
                    if(locateAfterGeo){
                        //设置缩放级别和中心点
                        map.setZoomAndCenter(DEFMAPLEVEL,myLocate);
                    }
                    console.log(myLocate)
                }
            },
            onGeoBrowserError: function (data) {
                $log.debug(data);
                var str = '<p>定位失败</p>';
                switch (data.info) {
                    case 'PERMISSION_DENIED':
                        str += '浏览器阻止了定位操作';
                        break;
                    case 'POSITION_UNAVAILBLE':
                        str += '无法获得当前位置';
                        break;
                    case 'TIMEOUT':
                        str += '定位超时';
                        break;
                    default:
                        str += '未知错误';
                        break;
                }

            },
            ////////////////////以上是高德版浏览器
            ///////////原生版浏览器定们
            /**
             * 初如化GPS定位浏览器原生版
             * @param _locateAfterGeo
             */
            geoByBrowserInit: function (_locateAfterGeo) {
                $log.debug("geoByBrowserInit");
                locateAfterGeo=_locateAfterGeo;
                if (navigator.geolocation)
                {
                    navigator.geolocation.getCurrentPosition(this.onGeoBrowserComplete,this.onGeoBrowserError);
                }
            },
            tmp1:function(){
                return 0;
            },
            tmp1:function(){
                return 0;
            },
            tmp:function(){
                return 0;
            },
            getMSearch: function() {
                return MSearch;
            }
        };
    })
