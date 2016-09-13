myapp.controller('registratieCtl', ['$scope', '$http','$location','$cookies','$cookieStore', '$rootScope',function ($scope, $http, $location,$cookies,$cookieStore,$rootScope) {



  $scope.apiRegisteren = $rootScope.Registratie;
  console.log($rootScope.Registratie);
$scope.registratieSucces = false;
$scope.submitForm = function() {

  voornaam = $scope.user.voornaam;
  tussenvoegsel = $scope.user.tussenvoegsel;
  achternaam = $scope.user.achternaam;
  email = $scope.user.email;
  wachtwoord = $scope.user.password;
  herwachtwoord = $scope.user.password_c;
  voorwaarden = $scope.user.voorwaarden;
  // nieuwsbrief = $scope.user.nieuwsbrief;

  var registratie = new Object();
  registratie.FirstName = voornaam;
  registratie.MiddleName = tussenvoegsel;
  registratie.LastName = achternaam;
  registratie.Email = email;
  registratie.Password = wachtwoord;
  registratie.RepeatPassword = wachtwoord;
  // postObjectprofiel.Newsletter = nieuwsbrief;

  console.log(registratie);



$http({
  method: 'POST',
  url: $scope.apiRegisteren,
  data: registratie,
  headers: {'Content-Type': 'application/json'}
      }).then(function successCallback(response) {
        console.log(response.status);
        $scope.registratieSucces = true;

      }, function errorCallback(response) {
          console.log(response.status);

      });


}
}]);

angular.module('UserValidation', []).directive('validPasswordC', function () {
    return {
        require: 'ngModel',
        link: function (scope, elm, attrs, ctrl) {
            ctrl.$parsers.unshift(function (viewValue, $scope) {
                var noMatch = viewValue != scope.userForm.password.$viewValue
                ctrl.$setValidity('noMatch', !noMatch)
            })
        }
    }
})
