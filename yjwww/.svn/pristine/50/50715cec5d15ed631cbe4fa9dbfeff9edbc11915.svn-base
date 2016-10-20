/**
 * 配置文件，项目名称出现在这里及index.html中的<body ng-app>标签中
 * 会员版与B版共用
 *
 */
var app=angular.module('zionic', ['ionic', 'ngCordova', 'ngResource',
    'zionic.config', 'zionic.services', 'zionic.controllers'
])
var appctrl=angular.module('zionic.controllers', []);
var appconfig=angular.module("zionic.config", []);
var appservice=angular.module('zionic.services', []);
/**
 * ENV环境变量设置
 */
appconfig.constant("ENV", {
    // "name": "production",
    "accessToken": '',
    "debug": true,
    "www": abase,
    "api": restbase,
    // "api": "http://localhost:3000/api/v1",
    "appleId": 'id981408438',
    'version':'1.0.1'
})
;

console.log("Config Done");



