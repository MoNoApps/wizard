window.app.controller('WizardController',['$scope', '$rootScope', '$http', function($scope, $rootScope, $http) {

  $scope.token =  window.localStorage.getItem('token');
    
}]);
