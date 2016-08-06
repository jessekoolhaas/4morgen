myapp.controller('goededoelenDisplay', function ( $scope,$stateParams,$http,$location,$window,$sce ){



  $scope.currentWinkel = $stateParams.goededoel;
  $scope.apiLogin   = "https://api.4morgen.org/v1/authentication/login";
  $scope.Toevoegen = "https://api.4morgen.org/v1/currentuser/favoritecharities";
  $scope.verwijderen = "https://api.4morgen.org/v1/currentuser/favoritecharities";

$scope.getWinkelUrl = "https://api.4morgen.org/v1/charity/{charityId}";
$scope.auth = "https://api.4morgen.org/v1/authentication";
$scope.redirect = "https://api.4morgen.org/v1/tracking/redirect/{winkelId}";
$scope.relatedGoededoelen = "https://api.4morgen.org/v1/charity/{charityId}/related";

$scope.errorMessageWinkel = false;


  // console.log($scope.currentWinkel);

  var urlrelated = $scope.relatedGoededoelen.replace("{charityId}", $scope.currentWinkel);
  $http.get(urlrelated)
      .success(function (data, status, headers, config) {
          $scope.relatedGoededoelendisplay = data;

      })
      .error(function (data, status, headers, config) {
      });


      var url = $scope.getWinkelUrl.replace("{charityId}", $scope.currentWinkel);
      $http.get(url)
          .success(function (data, status, headers, config) {
              $scope.goededoeldisplay = data;
              $scope.winkeltext = data.Description;
              $scope.trustedHtml = $sce.trustAsHtml($scope.winkeltext);
              $scope.CommissionUnit = data.CommissionUnit;



          })
          .error(function (data, status, headers, config) {
            console.log("error 404");
            $scope.errorMessageWinkel = true;
          });

          $scope.gaNaarGoedDoel = function(test){
            window.open(test,'_blank');
          };


          $scope.verwijderenFav = function(charitieId){
            $scope.datatsad = charitieId;
            $http({
              method: 'DELETE',
              url: $scope.verwijderen,
              data: $scope.datatsad,
              headers: { 'Content-Type': 'application/json' }
                  }).then(function successCallback(response) {

                  }, function errorCallback(response) {
                    console.log(response.status + " ERROR");

                  });
          };
          $scope.ToevoegenAanFav = function(charitieId,charitieName){
            $scope.datatsad = charitieId;
            $http({
              method: 'PUT',
              url: $scope.Toevoegen,
              data: $scope.datatsad,
              headers: { 'Content-Type': 'application/json' }
                  }).then(function successCallback(response) {
                    alert("Deze organisatie is toegevoegd aan jouw favoriete goede doelen. ")
                  }, function errorCallback(response) {
                    if (response.status === 400) {
                      alert("Je hebt deze organisatie reeds toegevoegd aan jouw favoriete goede doelen. ");
                    }
                    if (response.status === 401) {

                      $scope.eerstInloggen(charitieName);

                    }


                  });
          }
          $scope.eerstInloggen = function(charitieName) {
            $scope.inlogModal = true;
            $scope.vergetenError = true;
            $scope.charitieName = charitieName;
          }

          $scope.loginSubmit2 = function(charitieId){
            var voornaam = $scope.voornaam
            var wachtwoord = $scope.wachtwoord
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
                    $scope.ToevoegenAanFav(charitieId,0);
                    $scope.inlogModal = false;
                    $scope.getrekt = function(){
                            return true;
                            }
                            $scope.$on('inlogEvent', function(e) {
                            $scope.$parent.userlog = ( $scope.getrekt())
                            });




                  }, function errorCallback(response) {
                    $scope.loginError = true;
                    $scope.vergetenError = false;

                  });
          };

});
