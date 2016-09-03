
  myapp.controller('profielCtl', ['$scope', '$http','$location','$rootScope', function ($scope, $http, $location,$rootScope) {
    $scope.currentuserProfiel     = $rootScope.accountProfiel;
    $scope.apiRegisteren          = $rootScope.accountProfiel;
    $scope.wachtwoorden = false;
    $scope.Goedgekeurd = false;
    $scope.afgekeurd = false;

    $scope.goToTop = function(){
        $("html, body").animate({ scrollTop: 0 }, 0);
    }

    $scope.opnemengegevens = function(){


    $http({
      method: 'GET',
      url: $scope.currentuserProfiel
          }).then(function successCallback(response) {
            console.log(response.data);
            $scope.profiel = response.data;
            $scope.user.voornaam = $scope.profiel.FirstName;
            $scope.user.tussenvoegsel = $scope.profiel.MiddleName;
            $scope.user.achternaam = $scope.profiel.LastName;
            $scope.user.email = $scope.profiel.Email;
            $scope.user.password_o = '';
            $scope.user.password = '';
            $scope.user.password_c = '';


            },  function errorCallback(response) {

          });
}
$scope.opnemengegevens();



          $scope.submitForm2 = function() {

            voornaam = $scope.user.voornaam;
            tussenvoegsel = $scope.user.tussenvoegsel;
            achternaam = $scope.user.achternaam;
            email = $scope.user.email;
            wachtwoord_o = $scope.user.password_o;
            wachtwoord = $scope.user.password;
            herwachtwoord = $scope.user.password_c;

            var postObjectprofiel = new Object();
            postObjectprofiel.FirstName = voornaam;
            postObjectprofiel.MiddleName = tussenvoegsel;
            postObjectprofiel.LastName = achternaam;
            postObjectprofiel.Email = email;
            postObjectprofiel.Password = wachtwoord_o;
            postObjectprofiel.NewPassword = wachtwoord;
            postObjectprofiel.RepeatPassword = herwachtwoord;


            console.log(postObjectprofiel);
          $http({
            method: 'POST',
            url: $scope.currentuserProfiel,
            data:  postObjectprofiel,
            headers: {'Content-Type': 'application/json'}
                }).then(function successCallback(response) {
                  console.log(response.status);
                  $scope.opnemengegevens();
                  $scope.Goedgekeurd = true;
                  $scope.afgekeurd = false;
                  $scope.goToTop();

                }, function errorCallback(response) {
                    console.log(response.status);
                    $scope.afgekeurd = true;
                    $scope.Goedgekeurd = false;
                    $scope.goToTop();
                });


          }

}]);
