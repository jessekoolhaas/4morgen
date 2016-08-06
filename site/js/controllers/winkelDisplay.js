myapp.controller('winkelDisplay', function ( $scope,$stateParams,$http, $location, $window, $timeout,$sce){

$scope.currentWinkel = $stateParams.winkel;



$scope.loginError = false;

$scope.apiLogin   = "https://api.4morgen.org/v1/authentication/login";
$scope.apiLogout  = "https://api.4morgen.org/v1/authentication/logoff";
$scope.Toevoegen = "https://api.4morgen.org/v1/currentuser/favoriteshops";

$scope.showModal = false;
$scope.inlogModal = false;
$scope.inlogModaltoevoegen = false;


$scope.getWinkelUrl = "https://api.4morgen.org/v1/shop/{shopId}";
$scope.related = "https://api.4morgen.org/v1/shop/{shopId}/related";
$scope.auth = "https://api.4morgen.org/v1/authentication";
$scope.redirect = "https://api.4morgen.org/v1/tracking/redirect/{winkelId}";

$scope.errorMessageWinkel = false;
$scope.winkels = true;
$scope.winkelNuNietIngeloged = false;
$scope.winkelNuIngeloged = false;


$scope.benIkIngeloged = function() {

  $http({
    method: 'GET',
    url: $scope.auth
        }).then(function successCallback(response) {

            $scope.winkelNuNietIngeloged = false;
            $scope.winkelNuIngeloged = true;

          },  function errorCallback(response) {
          // $scope.showModal = true;
          $scope.winkelNuNietIngeloged = true;
          $scope.winkelNuIngeloged = false;

        });
      };
      $scope.benIkIngeloged();



      var url = $scope.getWinkelUrl.replace("{shopId}", $scope.currentWinkel);
      $http.get(url)
          .success(function (data, status, headers, config) {
              $scope.winkeldisplay = data;
              $scope.CommissionUnit = data.CommissionUnit;
              $scope.winkeltext = data.Description;
              $scope.trustedHtml = $sce.trustAsHtml($scope.winkeltext);
          })
          .error(function (data, status, headers, config) {
            $scope.errorMessageWinkel = true;
            $scope.winkels = false;
          });

          var urlrelated = $scope.related.replace("{shopId}", $scope.currentWinkel);
          $http.get(urlrelated)
              .success(function (data, status, headers, config) {
                  $scope.relatedwinkels = data;
              })
              .error(function (data, status, headers, config) {
              });



          $scope.gaNaarWinkel = function(winkelId) {

            $http({
              method: 'GET',
              url: $scope.auth
                  }).then(function successCallback(response) {

                      $scope.doorNaarWinkel(winkelId);

                    },  function errorCallback(response) {

                    $scope.showModal = true;

                  });
                };



          $scope.DoorgaanZonderInlog = function(winkelId){
            $scope.doorNaarWinkel(winkelId);
            $scope.showModal = false;

          }
          $scope.showModalInloggen = function(){
            $scope.showModal = false;
            $scope.inlogModal = true;
          }



          $scope.loginSubmit = function(winkelId){
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

                    $scope.inlogModal = false;
                    $scope.doorNaarWinkel(winkelId);


                  }, function errorCallback(response) {
                    $scope.loginError = true;

                  });
          };



          $scope.doorNaarWinkel = function(winkelId){

                var url = $scope.redirect.replace("{winkelId}", winkelId);
                  var newWindow = window.open();
                  newWindow.location = url;
          };






          $scope.toevoegen = function(charitieId,charitieName){
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
          $scope.eerstinloggentoevoegen = function(charitieId,charitieName) {
            $scope.inlogModaltoevoegen = true;
            $scope.vergetenError = true;
            $scope.charitieNametoevoegen = charitieName;
          }

          $scope.toevoegenfav = function(charitieId,charitieName){
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

                      $scope.eerstinloggentoevoegen(charitieId,charitieName);

                    }


                  });
          }
          $scope.Winkeltoevoegen = function(charitieId,charitieName){
          $scope.toevoegenfav(charitieId,charitieName);

          };
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

                    $scope.toevoegenfav(charitieId,0);
                    $scope.inlogModaltoevoegen = false;
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

          $scope.gotorankabrand = function(){
            var test = "http://www.rankabrand.org/"
            window.open(test,'_blank');
          }



});
