myapp.controller('zoekCtl', function ($scope,$http,$stateParams,$location,$state ,$rootScope){

  $scope.goto = function(Id) {

    $location.path("/goededoelen/" + Id)
  };
  $scope.goto2 = function(Id) {

    $location.path("/winkels/" + Id)
  };
// STATUS 1 == GOEDE doelen
// STATUS 2 == WINKELS
$scope.ToevoegenCharitie                = $rootScope.goededoelenToevoegenFav;
$scope.ToevoegenWinkels                 = $rootScope.winkelToevoegenFav;
$scope.apiLogin                         = $rootScope.authLogin;
$scope.zoeken                           = $rootScope.zoeken;

$scope.inlogModalGoedeDoelen = false;
$scope.winkelsGedeelte = true;
$scope.charitiesGedeelte = true;
$scope.zoekquery = $stateParams.zoek;



  var test = $scope.zoekquery;



var urlzoek = $scope.zoeken.replace("{search}",test)

  $http({

    method: 'GET',
    url: urlzoek,
    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(function successCallback(response) {

          $scope.resultaatDoelen = response.data.Charities;
          if ($scope.resultaatDoelen != 0) {

            $scope.charitiesGedeelte = false;
          }


          $scope.resultaatWinkels = response.data.Shops;
          if ($scope.resultaatWinkels != 0) {

            $scope.winkelsGedeelte = false;
          }
          if ($scope.resultaatWinkels == 0 && $scope.resultaatDoelen == 0) {
            console.log("bijde result is 0");
            $scope.geenresult = true;
          }

        }, function errorCallback(response) {


        });


        $scope.ToevoegenAan = function(charitieId,status){
          $scope.datatsad = charitieId;

          if (status == 1) {
            $scope.ToevoegenAanCharitie(charitieId,status);

          }
          if (status == 2) {

            $scope.ToevoegenAanWinkel(charitieId,status);

          }
        }

        $scope.eerstInloggen = function(charitieId,status) {
          $scope.inlogModalGoedeDoelen = true;
          $scope.vergetenError = true;

          $scope.GoededoelenId = charitieId;
          $scope.StatusId = status;
        }

        $scope.ToevoegenAanCharitie = function(charitieId,status){
        $http({
          method: 'PUT',
          url: $scope.ToevoegenCharitie,
          data: $scope.datatsad,
          headers: { 'Content-Type': 'application/json' }
              }).then(function successCallback(response) {

                alert("Deze organisatie is toegevoegd aan jouw favoriete goede doelen. ")
              }, function errorCallback(response) {

                if (response.status === 400) {

                  alert("Je hebt deze organisatie reeds toegevoegd aan jouw favoriete goede doelen. ");
                }
                if (response.status === 401) {

                  $scope.eerstInloggen(charitieId,status);

                }


              });
            }
            $scope.ToevoegenAanWinkel = function(charitieId,status){
            $http({
              method: 'PUT',
              url: $scope.ToevoegenWinkels,
              data: $scope.datatsad,
              headers: { 'Content-Type': 'application/json' }
                  }).then(function successCallback(response) {

                    alert("Deze organisatie is toegevoegd aan jouw favoriete goede doelen. ")
                  }, function errorCallback(response) {

                    if (response.status === 400) {

                      alert("Je hebt deze organisatie reeds toegevoegd aan jouw favoriete goede doelen. ");
                    }
                    if (response.status === 401) {

                      $scope.eerstInloggen(charitieId,status);

                    }


                  });
                }

                $scope.loginSubmit = function(){
                  var voornaam = $scope.voornaam
                  var wachtwoord = $scope.wachtwoord


                  $http({
                    method: 'POST',
                    url: $scope.apiLogin,
                    data: 'UserName='+ voornaam+'&Password=' + wachtwoord,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                        }).then(function successCallback(response) {

                          $scope.ToevoegenAan($scope.GoededoelenId,$scope.StatusId);
                          $scope.inlogModalGoedeDoelen = false;



                        }, function errorCallback(response) {

                          $scope.loginError = true;
                          $scope.vergetenError = false;

                        });
                };


                    $scope.lawltest = function(){
                    $scope.getrekt = function(){
                            return false;
}
$scope.$on('inlogEvent', function(e) {
$scope.$parent.userlog = ( $scope.getrekt())

});

}


});
myapp.controller('ZoekbalkCtl', function ($scope,$http,$stateParams,$location ){





  $scope.zoekbalkverzenden = function(zoekbalk){

    $location.path("/zoek/" + zoekbalk)

  };



});
