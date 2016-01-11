window.app.controller('EditorController',[
  '$scope',
  '$http',
  'Editor',
  '$timeout',
  '$rootScope',
function(
  $scope,
  $http,
  Editor,
  $timeout,
  $rootScope) {

  $scope.tags = {
    input: {
      options: [
        'button', 'checkbox', 'color', 'date', 'datetime',
        'datetime-local', 'email', 'file', 'hidden',
        'month', 'number', 'password', 'radio', 'range', 'reset',
        'search', 'tel', 'text', 'time', 'url', 'week'
      ]
    },
    image: {
      options: ['text', 'url']
    },
    select: { },
    textarea: { }
  };

  $scope.resource = {
    desc: '',
    collection: '',
    admin: true,
    param: '',
    clean: {},
    schema: {},
    exclude: false
  };

  $scope.collection = '';
  $scope.prop = false;
  $scope.view = 'editor';
  $scope.token = window.localStorage.getItem('token');

  $scope.colName = function() {
    if(!$scope.modelForm.modelInput.$error.pattern) {
      $scope.collection = $scope.resource.desc.split(' ').join('').toLowerCase();
      $scope.resource.collection = angular.copy($scope.collection);
    }
  };

  $scope.goToKeyBox = function() {
    Editor.tabs('#keys');
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

  $scope.pinKey = function(key) {
    $scope.prop = window.angular.copy($scope.resource.schema[key]);
    Editor.tabs('#editor');
  };

  $scope.saveKey = function() {
    $scope.resource.schema[$scope.prop.name] = window.angular.copy($scope.prop);
    $scope.prop = false;
    $scope.goToKeyBox();
  };

  var getTargets = function() {
    $http.get('/api/wizard/targets')
    .success(function(data){
      $scope.targets = data;
    });
  };

  var cleaner = function() {
    $scope.resource.clean = {};
    for (var prop in $scope.resource.schema) {
      if ($scope.resource.schema[prop].exclude) {
        $scope.resource.clean[prop] = 1;
      }
    }
  };

  $rootScope.$on('editor::draw', function() {
    pretiffy();
  });

  $rootScope.$on('editor::targets', function() {
    getTargets();
  });

  var pretiffy = function() {
    cleaner();
    var content = JSON.stringify($scope.resource, undefined, 2);
    var template = Editor.jshl(content);
    Editor.draw('#jsonmodel', template);
  };

  var hash = function() {
    var url = document.location.toString();
    if (url.match('#')) {
      Editor.tabs('.nav-tabs a[href=#'+url.split('#')[1]+']');
    }
  };

  var init = function() {
    Editor.nav();
    hash();
    $timeout(function() {
      $scope.resource.desc = angular.copy(Editor.model());
      $scope.colName();
    }, 1);
  };

  init();
  Editor.nav();

}]);
