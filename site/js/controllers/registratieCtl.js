myapp.controller('registratieCtl', ['$scope', '$http','$location','$cookies','$cookieStore', '$rootScope',function ($scope, $http, $location,$cookies,$cookieStore,$rootScope) {




$scope.registratieSucces = false;
$scope.submitForm = function() {
  $scope.apiRegisteren = $rootScope.Registratie;
  voornaam = $scope.user.voornaam;
  tussenvoegsel = $scope.user.tussenvoegsel;
  achternaam = $scope.user.achternaam;
  email = $scope.user.email;
  wachtwoord = $scope.user.password;
  herwachtwoord = $scope.user.password_c;
  voorwaarden = $scope.user.voorwaarden;
  nieuwsbrief = $scope.user.nieuwsbrief;



$http({
  method: 'POST',
  url: $scope.apiRegisteren,
  data:   'FirstName=' + voornaam +
          '&MiddleName=' + tussenvoegsel +
          '&LastName=' + achternaam +
          '&Email=' + email +
          '&Password=' + wachtwoord +
          '&RepeatPassword=' + wachtwoord +
          '&Newsletter=' + nieuwsbrief,
  headers: {'Content-Type': 'application/x-www-form-urlencoded'}
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
