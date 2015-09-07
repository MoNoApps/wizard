window.app.controller('WizardController',['$scope', '$rootScope', '$http', '$timeout', function($scope, $rootScope, $http, $timeout) {

  $scope.token =  window.localStorage.getItem('token');
  var token = '?token=' + window.localStorage.getItem('token');

  $scope.forms = {
    valid: [],
    models: [],
    missing: [],
    resources: []
  };

  $scope.genAll = function(){
    action('generate', {missing: $scope.forms.missing});
  };

  $scope.genOne = function(name){
    action('generate', {missing: [name]});
  };

  $scope.destroy = function(name){
    action('destroy', {models: [name]});
  };

  $scope.destAll = function(name){
    action('destroy', {models: $scope.forms.models});
  };

  $scope.deleteable = function(name){
    if($scope.forms.missing.indexOf(name) != -1){
      return true;
    }
    return false;
   };

  // scope functions
  var action = function(method, list){
    $timeout(function () {
      $scope.forms = [];
    }, 1);

    $http.post('/api/wizard/' + method + token, list)
    .success(function(data) {
      console.log(data);
      if(data.code !== "InternalError") {
      }
      init();
    })
    .error(function(data, status) {
      if(status === 401) { window.location = '/'; return false; }
      console.log(data, status);
    });
  };

  // private functions
  var init = function(){
    $http.get('/api/wizard/analize' + token)
    .success(function(data) {
      if(data.code !== "InternalError") {
        $timeout(function () {
          $scope.forms = data;
          console.log(data);
        }, 1);
      }
    })
    .error(function(data, status) {
      if(status === 401) { window.location = '/'; return false; }
      console.log(data, status);
    });
  };

  init();

}]);
