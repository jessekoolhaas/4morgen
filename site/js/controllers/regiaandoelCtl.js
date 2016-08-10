myapp.controller('regiaandoelCtl', function ( $scope,$stateParams,$http,$location,$window,$sce ){

$scope.registratieSucces = false;
  $scope.currentGoededoel = $stateParams.goeddoel;
  console.log($scope.currentGoededoel);

  $scope.getWinkelUrl = "https://api.4morgen.org/v1/charity/{charityId}";

  $scope.errorMessageWinkel = false;

  var url = $scope.getWinkelUrl.replace("{charityId}", $scope.currentGoededoel);
  $http.get(url)
      .success(function (data, status, headers, config) {
          $scope.goededoeldisplay = data;
          $scope.winkeltext = data.Description;
          $scope.trustedHtml = $sce.trustAsHtml($scope.winkeltext);
          console.log(data);
      })
      .error(function (data, status, headers, config) {
        console.log("error 404");
        $scope.errorMessageWinkel = true;
      });


      $scope.submitForm = function() {
        $scope.apiRegisteren = "https://api.4morgen.org/v1/account";
        voornaam = $scope.user.voornaam;
        tussenvoegsel = $scope.user.tussenvoegsel;
        achternaam = $scope.user.achternaam;
        email = $scope.user.email;
        wachtwoord = $scope.user.password;
        herwachtwoord = $scope.user.password_c;
        voorwaarden = $scope.user.voorwaarden;
        nieuwsbrief = $scope.user.nieuwsbrief;
        charityId =   $scope.currentGoededoel;



      $http({
        method: 'POST',
        url: $scope.apiRegisteren,
        data:   'FirstName=' + voornaam +
                '&MiddleName=' + tussenvoegsel +
                '&LastName=' + achternaam +
                '&Email=' + email +
                '&Password=' + wachtwoord +
                '&RepeatPassword=' + wachtwoord +
                '&Newsletter=' + nieuwsbrief +
                '&IdCharity=' + charityId,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(function successCallback(response) {
              console.log(response.status);
              
              $scope.registratieSucces = true;

            }, function errorCallback(response) {
                console.log(response.status);

            });


      }
});
