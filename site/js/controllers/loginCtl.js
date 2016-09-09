myapp.controller('loginCtl', ['$scope', '$http','$location','$cookies','$cookieStore','$state','$window','$rootScope', function ($scope, $http, $location,$cookies,$cookieStore,$state,$window,$rootScope) {

  $scope.loginError = false;

  $scope.apiLogin           = $rootScope.authLogin;
  $scope.apiLogout          = $rootScope.authLogout;
  $scope.facebooklogin      = $rootScope.facebookLogin;

  $scope.loginSubmit = function(){
      $scope.loginError = false;
    var voornaam = $scope.voornaam
    var wachtwoord = $scope.wachtwoord
    console.log(voornaam + wachtwoord);
      var Objectprofiel = new Object();
      Objectprofiel.UserName = voornaam;
      Objectprofiel.Password = wachtwoord;
      console.log(Objectprofiel);

    $http({
      method: 'POST',
      url: $scope.apiLogin,
      data: Objectprofiel,
      headers: {'Content-Type': 'application/json'}
          }).then(function successCallback(response) {
            $cookieStore.put('Ingeloged',true);
            $location.path("/dashboard");

          }, function errorCallback(response) {
            $scope.loginError = true;

          });
  };

  $scope.logoutSubmit = function(){
    $http({
      method: 'POST',
      url: $scope.apiLogout
          }).then(function successCallback(response) {
          console.log(response.status);

          }, function errorCallback(response) {
            console.log(response.status);

          });
  };

  $scope.facebook = function(){
    console.log("asdkahshd ahsjdas");
    var urlFacebook = $scope.facebooklogin
    .replace("{returnUrlSuccess}", $rootScope.fbSucces)
    .replace("{returnUrlFailure}", $rootScope.fbFailure);
    console.log(urlFacebook);
    $window.location = urlFacebook, "_blank";
  }




}]);
