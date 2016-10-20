'use strict';

var uprooturl="http://yijian1.zjjnyd.com/yijian/rest";

var app = angular.module('fileUpload', ['ngFileUpload']);
var version = '11.0.0';

app.controller('MyCtrl', ['$scope', '$http', '$timeout', '$compile', 'Upload', function ($scope, $http, $timeout, $compile, Upload) {


  $scope.upload = function(file, resumable) {
    //console.log("$scope.upload(file, resumable)");
    $scope.errorMsg = null;
    uploadUsingUpload(file, resumable);
  };
  function uploadUsingUpload(file, resumable) {
    file.upload = Upload.upload({
      url: uprooturl+'/upload' + $scope.getReqParams(),
      resumeSizeUrl: resumable ? uprooturl+'/upload?name=' + encodeURIComponent(file.name) : null,
      resumeChunkSize: resumable ? $scope.chunkSize : null,
      headers: {
        'optional-header': 'header-value'
      },
      data: {username: $scope.username, file: file}
    });

    file.upload.then(function (response) {
      $timeout(function () {
        file.result = response.data;
      });
    }, function (response) {
      if (response.status > 0)
        $scope.errorMsg = response.status + ': ' + response.data;
    }, function (evt) {
      // Math.min is to fix IE which reports 200% sometimes
      file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
    });

    file.upload.xhr(function (xhr) {
      // xhr.upload.addEventListener('abort', function(){console.log('abort complete')}, false);
    });
  }


  /**
   * 如果files发生改变，则进行上传
   */
  $scope.$watch('files', function (files) {
    if (files != null) {
      if (!angular.isArray(files)) {
        $timeout(function () {
          $scope.files = files = [files];
        });
        return;
      }
      for (var i = 0; i < files.length; i++) {
        Upload.imageDimensions(files[i]).then(function (d) {
          $scope.d = d;
          console.log(d);
        });
        $scope.errorMsg = null;
        (function (f) {
          $scope.upload(f, true);
        })(files[i]);
      }
    }
  });



  $scope.isResumeSupported = Upload.isResumeSupported();



  $scope.chunkSize = 100000;






  $scope.success_action_redirect = $scope.success_action_redirect || window.location.protocol + '//' + window.location.host;
  $scope.jsonPolicy = $scope.jsonPolicy || '{\n  "expiration": "2020-01-01T00:00:00Z",\n  "conditions": [\n    {"bucket": "angular-file-upload"},\n    ["starts-with", "$key", ""],\n    {"acl": "private"},\n    ["starts-with", "$Content-Type", ""],\n    ["starts-with", "$filename", ""],\n    ["content-length-range", 0, 524288000]\n  ]\n}';
  $scope.acl = $scope.acl || 'private';


  $scope.confirm = function () {
    return confirm('Are you sure? Your local changes will be lost.');
  };

  $scope.getReqParams = function () {
    return $scope.generateErrorOnServer ? '?errorCode=' + $scope.serverErrorCode +
    '&errorMessage=' + $scope.serverErrorMsg : '';
  };

  angular.element(window).bind('dragover', function (e) {
    e.preventDefault();
  });
  angular.element(window).bind('drop', function (e) {
    e.preventDefault();
  });

  $scope.modelOptionsObj = {};
  $scope.$watch('validate+dragOverClass+modelOptions+resize+resizeIf', function (v) {
    $scope.validateObj = eval('(function(){return ' + $scope.validate + ';})()');
    $scope.dragOverClassObj = eval('(function(){return ' + $scope.dragOverClass + ';})()');
    $scope.modelOptionsObj = eval('(function(){return ' + $scope.modelOptions + ';})()');
    $scope.resizeObj = eval('(function($file){return ' + $scope.resize + ';})()');
    $scope.resizeIfFn = eval('(function(){var fn = function($file, $width, $height){return ' + $scope.resizeIf + ';};return fn;})()');
  });

}]);
