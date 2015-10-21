window.app.controller('WizardController',[
  '$scope',
  '$rootScope',
  '$http',
  '$timeout',
function(
  $scope,
  $rootScope,
  $http,
  $timeout) {

  // scope functions
  $scope.token = window.localStorage.getItem('token');

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
    var idx = $scope.forms.missing.indexOf(name);
    return (idx !== -1) ? true : false;
  };

  // private functions
  var action = function(method, list){
    $http.post('/api/wizard/' + method, list);
  };

  var init = function(){
    $scope.forms = {
      valid: [],
      models: [],
      missing: [],
      resources: []
    };

    $http.get('/api/wizard/analize')
    .success(function(data) {
      if(data.code !== "InternalError") {
        $timeout(function () {
          $scope.forms = data;
          console.log(data);
        }, 1);
      }
    });
  };

  init();

}]);
