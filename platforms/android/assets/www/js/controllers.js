angular.module('starter')

.controller('AppCtrl', function($scope, $state, $ionicPopup, AuthService, AUTH_EVENTS) {
  $scope.username = AuthService.username();
  $scope.picture_path = AuthService.picture_path();
  $scope.lastname = AuthService.lastname();
  $scope.department = AuthService.department();
  $scope.jobtitle = AuthService.jobtitle();
  $scope.qrcode = AuthService.qrcode();
 
  $scope.$on(AUTH_EVENTS.notAuthorized, function(event) {
    var alertPopup = $ionicPopup.alert({
      title: 'Unauthorized!',
      template: 'You are not allowed to access this resource.'
    });
  })
 
  $scope.$on(AUTH_EVENTS.notAuthenticated, function(event) {
    AuthService.logout();
    $state.go('login');
    var alertPopup = $ionicPopup.alert({
      title: 'Session Lost!',
      template: 'Sorry, You have to login again.'
    });
  })
 
  $scope.setCurrentUsername = function(name) {
    $scope.username = name;
  };

  $scope.setCurrentPicturepath = function(name) {
    $scope.picture_path = name;
  };
  $scope.setCurrentLastname = function(name) {
    $scope.lastname = name;
  };
  $scope.setCurrentDepartment = function(name) {
    $scope.department = name;
  };
  $scope.setCurrentJobtitle = function(name) {
    $scope.jobtitle = name;
  };
  $scope.setCurrentQrcode = function(name) {
    $scope.qrcode = name;
  };
})
.controller('LoginCtrl', function($scope, $state, $ionicPopup, $http, AuthService) {
  $scope.data = {};
 
  $scope.login = function(data) {
    
    AuthService.login(data.username, data.password).then(function(authenticated) {
      $state.go('main.dash', {}, {reload: true});
      //to reload shiz
      $scope.setCurrentUsername(AuthService.username());
      $scope.setCurrentPicturepath(AuthService.picture_path());
      $scope.setCurrentLastname(AuthService.lastname());
      $scope.setCurrentDepartment(AuthService.department());
      $scope.setCurrentJobtitle(AuthService.jobtitle());
      $scope.setCurrentQrcode(AuthService.qrcode());
      
    }, function(err) {
      var alertPopup = $ionicPopup.alert({
        title: 'Login failed!',
        template: 'Please check your credentials!'
      });
    });
  }
  function postLogin (data)
  {
    var link = 'http://localhost/teams/public/api.php';

        $http.post(link, {user : data.name, pass : data.pw}).then(function (response){
            //$scope.response = res.data;
            console.log(response.data);
        });
  }
})

.controller('ProfileCtrl', function($scope, $state, $http, $ionicPopup, AuthService) {
  $scope.logout = function() {
    AuthService.logout();
    $state.go('login');
  };
})

.controller('DashCtrl', function($scope, $state, $http, $ionicPopup, AuthService) {
  $scope.logout = function() {
    AuthService.logout();
    $state.go('login');
  };
 
  $scope.performValidRequest = function() {
    $http.get('http://localhost:8100/valid').then(
      function(result) {
        $scope.response = result;
      });
  };
 
  $scope.performUnauthorizedRequest = function() {
    $http.get('http://localhost:8100/notauthorized').then(
      function(result) {
        // No result here..
      }, function(err) {
        $scope.response = err;
      });
  };
 
  $scope.performInvalidRequest = function() {
    $http.get('http://localhost:8100/notauthenticated').then(
      function(result) {
        // No result here..
      }, function(err) {
        $scope.response = err;
      });
  };
})