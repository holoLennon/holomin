/**
 * 服务:Productchannel，商品目录
 */
 appservice
    .service('ProductchannelService', function($resource, $rootScope,$q,$http,$log,ENV) {
        $log.debug("ProductchannelService in");
        //列表
        var list;
		//当前的对象
        var obj;
        //此Service共用页码信息
        var page = {
            where: '', //条件
            pageNo: 1, //第几页，从1开始
            pageSize:DEFPAGESIZE, //每页多少数量
            hasNextPage: true, //是否还有下一页
            cmd: '' //命令
        };
        var aurl=ENV.api + "/Productchannel";
        return {
            /**
             * 初次查询
             * @param _where 条件 可以为空
             * @param _page 页码对象，如果为空使用全局页码对象
             */
            first: function(_where,_page) {
                if(_page){
                    if(_where)_page.where=_where;
                    _page.pageNo=1;
                    return this.query(_page);
                }
                page.where=(_where)?_where:"";
                page.pageNo=1;
                return this.query();
            },
            /**
             * 更多查询
             * @param _page 页码对象，如果为空使用全局页码对象
             */
            more: function(_page) {
                if(_page){
                    _page.pageNo=_page.pageNo+1;
                    return this.query(_page);
                }
                page.pageNo=page.pageNo+1;
                return this.query();
            },
            /**
             * 查询Promise版
             * @param _page 页码对象，如果为空使用全局页码对象
             * @returns {*}
             */
            query: function(_page) {
                var thispage=page;
                if(_page)thispage=_page;
                var deferred = $q.defer();
                var url =aurl+"/query";
                $http({
                    method: 'GET',
                    url: url,
                    params: thispage
                }).success(
                    function (data, status, header, config) {
						list= _.union(list,data);
                        deferred.resolve(data);
                    }
                );
                return deferred.promise;
            },
            /**
             * 查询树
             * @param _page 页码对象{orderstr:'',where:'',cmd:''}，如果为空使用全局页码对象
             * @returns List
             */
            tree: function(_page) {
                var thispage=page;
                if(_page)thispage=_page;
                var deferred = $q.defer();
                var url =aurl+"/tree";
                $http({
                    method: 'GET',
                    url: url,
                    params: thispage
                }).success(
                    function (data, status, header, config) {
						list= _.union(list,data);
                        deferred.resolve(data);
                    }
                );
                return deferred.promise;
            },
            /**
             * 查询此pid名下的树
             * @param _page 页码对象{orderstr:'',where:'',cmd:''}，如果为空使用全局页码对象
			 * @param pid 此id名下的树
             * @returns List
             */
            treebypid: function(_page,pid) {
                var thispage=page;
                if(_page)thispage=_page;
				thispage=_.extend(thispage, {pid: pid});
                var deferred = $q.defer();
                var url =aurl+"/treebypid";
                $http({
                    method: 'GET',
                    url: url,
                    params: thispage
                }).success(
                    function (data, status, header, config) {
						list= _.union(list,data);
                        deferred.resolve(data);
                    }
                );
                return deferred.promise;
            },
            /**
             * 获取一个新对象，加上各种LIST让用户选择，和get/0一个效果
             * @param _page 页码对象，如果为空使用全局页码对象
             * @returns {*}
             */
            newget: function(_page) {
                var thispage=page;
                if(_page)thispage=_page;
                var deferred = $q.defer();
                var url =aurl+"/getnew";
                $http({
                    method: 'GET',
                    url: url,
                    params: thispage
                }).success(
                    function (data, status, header, config) {
                        list= _.union(list,data);
                        deferred.resolve(data);
                    }
                );
                return deferred.promise;
            }, 
			/**
             * 创建Promise版
             * @param productchannel 要被创建的对象
             * @param _page 页码对象，如果为空使用全局页码对象
             */
            create: function(productchannel,_page) {
                var thispage=page;
                if(_page)thispage=_page;
                var tmpparam=_.omit(productchannel, function(value, key, object) {
                    return _.isObject(value) || _.isArray(value)
                        || key.indexOf("String") != -1 || key.indexOf("gmt") != -1
                        ;
                });
                tmpparam=_.extend(tmpparam, {cmd: thispage.cmd});
                $log.debug("ProductchannelService create");
                $log.debug(tmpparam);
                var deferred = $q.defer();
                var url =aurl+"/create";
                $http({
                    method: 'POST',
                    url: url,
                    params: tmpparam
                }).success(
                    function (data, status, header, config) {
                        list= _.union(list,data);
                        deferred.resolve(data);
                    }
                );
                return deferred.promise;
            },
            /**
             * 更新Promise版
             * @param productchannel 要被更新的对象
             * @param _page 页码对象，如果为空使用全局页码对象
             */
            update: function(productchannel,_page) {
                var thispage=page;
                if(_page)thispage=_page;
                var tmpparam=_.omit(productchannel, function(value, key, object) {
                    return _.isObject(value) || _.isArray(value)
                        || key.indexOf("String") != -1 || key.indexOf("gmt") != -1
                        ;
                });
                tmpparam=_.extend(tmpparam, {cmd: thispage.cmd});
                $log.debug("ProductchannelService update");
                $log.debug(tmpparam);
                var deferred = $q.defer();
                var url =aurl+"/update";
                $http({
                    method: 'POST',
                    url: url,
                    params: tmpparam
                }).success(
                    function (data, status, header, config) {
                        list= _.union(list,data);
                        deferred.resolve(data);
                    }
                );
                return deferred.promise;
            }, 
			/**
             * 获取数据，不通过网络查询，直接取列表
             * @param id
             * @returns {*}
             */
            getlocal: function(id) {
                for(var index in list){
                    if (list[index].id.toString() === id.toString()) {
                        return list[index];
                    }
                }
                return {};
            },
            /**
             * 获取数据，通过网络查询
             * @param id 如果id=0，返回一个新对象
             * @param _page 页码对象，如果为空使用全局页码对象
             * @returns {*}
             */
            get: function(id,_page) {
                var thispage=page;
                if(_page)thispage=_page;
                var deferred = $q.defer();
                var url =aurl+"/get/"+id;
                $http({
                    method: 'GET',
                    url: url,
                    params: thispage
                }).success(
                    function (data, status, header, config) {
                        deferred.resolve(data);
                    }
                );
                return deferred.promise;
            },
            getList: function() {
                return list;
            },
            getPage: function() {
                return page;
            },
            getObj: function() {
                return obj;
            },
            newObj: function() {
                return _.clone(_Productchannel);
            }
        };
    })
