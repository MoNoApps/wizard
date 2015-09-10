window.app.controller('EditorController',['$scope', 'Editor', function($scope, Editor) {

  $scope.token =  window.localStorage.getItem('token');
  var token = '?token=' + window.localStorage.getItem('token');

  $scope.resource = {
    desc: '',
    collection: '',
    admin: true,
    schema: {}
  };

  $scope.collection = '';
  $scope.prop = false;
  $scope.view = 'editor';

  $scope.colName = function() {
    $scope.collection = $scope.resource.desc.split(' ').join('_').toLowerCase();
    $scope.resource.collection = angular.copy($scope.collection);
  };

  $scope.goToKeyBox = function() {
    Editor.focus('[ng-model="name"]');
  };

  $scope.addKey = function() {
    $scope.resource.schema[$scope.name] = {
      tag: 'input',
      type: 'text',
      active: true,
      text: $scope.name,
      name: $scope.name
    };
    Editor.focus('[ng-model="name"]');
  };

  $scope.removeKey = function(key) {
    delete $scope.resource.schema[key];
    $scope.prop = false;
    Editor.focus('[ng-model="name"]');
  };

  $scope.addProperty = function(key, prop, spec) {
    $scope.resource.schema[key][prop] = spec;
  };

  $scope.excludeToggle = function(key, value) {
    $scope.resource.schema[key].exclude = !value;
  };

  $scope.setView = function(view) {
    $scope.view = view;
  };

  $scope.pinKey = function(key) {
    $scope.prop = window.angular.copy($scope.resource.schema[key]);
  };

  $scope.saveKey = function() {
    $scope.resource.schema[$scope.prop.name] = window.angular.copy($scope.prop);
    $scope.prop = false;
  };

}]);
