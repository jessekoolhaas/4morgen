myapp.controller('dashboardCtl', ['$scope', '$http','$location','$window','$state','$rootScope', function ($scope, $http, $location,$window,$state,$rootScope) {


  $scope.$state = $state;


$scope.auth                     = $rootScope.auth;
$scope.apiLogout                = $rootScope.authLogout;

$scope.currentDonation          = $rootScope.donatieJaar;
$scope.TotaalDonatiesutl        = $rootScope.donatieLijst;
$scope.jaaropgave               = $rootScope.jaarOpgave;

$scope.skip = 0;
$scope.topj = 50;
$scope.order = "Date";








$scope.favoriteCharities        = $rootScope.goededoelenToevoegenFav;
$scope.favoriteShops            = $rootScope.winkelToevoegenFav;
$scope.verwijderen              = $rootScope.goededoelenToevoegenFav;


$scope.hoverIn = function(){
    $scope.hoverEdit = true;
};

$scope.hoverOut = function(){
    $scope.hoverEdit = false;
};

$scope.hoverInwinkels = function(){
    $scope.hoverEditwinkels = true;
};

$scope.hoverOutwinkels = function(){
    $scope.hoverEditwinkels = false;
};

$http({
  method: 'GET',
  url: $scope.auth
      }).then(function successCallback(response) {

          $location.path("/dashboard/overzicht")
          $scope.getrekt = function(){
                  return true;
                  }
                  $scope.$on('inlogEvent', function(e) {
                  $scope.$parent.userlog = ( $scope.getrekt())
                  });
        },  function errorCallback(response) {


          $location.path("/login");
          $scope.getrekt = function(){
                  return false;
                  }
                  $scope.$on('inlogEvent', function(e) {
                  $scope.$parent.userlog = ( $scope.getrekt())
                  });

      });
      $scope.favChar = function(){
        $http.get($scope.favoriteCharities)
            .then(function(response) {
                $scope.myWelcome = response.data;
                $scope.MijnFavCharities = $scope.myWelcome.Result;

            });
      }

      $scope.FavShops = function(){
        $http.get($scope.favoriteShops)
            .then(function(response) {
                $scope.myWelcome = response.data;
                $scope.MijnFavShops = $scope.myWelcome.Result;

            });
      }



      $scope.verwijderenFav = function(charitieId){

        $scope.datatsad = charitieId;

        $http({
          method: 'DELETE',
          url: $scope.verwijderen,
          data: $scope.datatsad,
          headers: { 'Content-Type': 'application/json' }
              }).then(function successCallback(response) {

              $scope.favChar();

              }, function errorCallback(response) {


              });
      };
      $scope.verwijderenFavwinkel = function(charitieId){

        $scope.datatsad = charitieId;

        $http({
          method: 'DELETE',
          url: $scope.favoriteShops,
          data: $scope.datatsad,
          headers: { 'Content-Type': 'application/json' }
              }).then(function successCallback(response) {

              $scope.FavShops();

              }, function errorCallback(response) {


              });
      }







  $scope.logoutSubmit = function(){
    $http({
      method: 'POST',
      url: $scope.apiLogout
          }).then(function successCallback(response) {

          $location.path("/");


          $scope.getrekt = function(){
                  return false;
                  }
                  $scope.$on('inlogEvent', function(e) {
                  $scope.$parent.userlog = ( $scope.getrekt())
                  });

          }, function errorCallback(response) {


          });
  }

  $scope.currentDonationf = function(){
    $http({
      method: 'GET',
      url: $scope.currentDonation
          }).then(function successCallback(response) {


          $scope.ditjaar = response.data;

          if ($scope.ditjaar === "0.0") {
            $scope.ditjaar = '0.00';

          }
          $scope.ditjaar = parseFloat(Math.round($scope.ditjaar * 100) / 100).toFixed(2);
          $scope.ditjaar = $scope.ditjaar.replace(".", ",");



          }, function errorCallback(response) {


          });
  }

  $scope.TotaalDonaties = function(){

    var urltotaal = $scope.TotaalDonatiesutl
        .replace("{skip}", $scope.skip)
        .replace("{top}", $scope.topj)
        .replace("{orderby}", $scope.order)
        .replace("{includeCount}", true);


    $http({
      method: 'GET',
      url: urltotaal
          }).then(function successCallback(response) {




          $scope.donatietable = response.data.Result;


          if (response.data.TotalCount == 0) {
            $scope.totaalstand = '0.00';
          }


          $scope.totaalstand = 0;
          var yearArray = [];
          var postObjectprofiel = new Object();

          for (donatie in response.data.Result){
            $scope.data = response.data.Result[donatie];
            $scope.bedrag = $scope.data.Donation;
            $scope.datum = $scope.data.Date;
            $scope.datum = $scope.datum.slice(0,4)
            var year = $scope.datum;

            if(yearArray.indexOf(year) === -1){
                                yearArray.push(year);
                            }




            // var year = bedrag.Date.slice(0,4);
          $scope.donatiebedrag = $scope.donatiebedrag + Math.round($scope.bedrag * 100) / 100;
            if ($scope.data.Status == 1 || $scope.data.Status == 3) {
              $scope.totaalstand = $scope.totaalstand + Math.round($scope.bedrag * 100) / 100;
            }
          }

          $scope.jaren = yearArray;

          $scope.totaalstand = parseFloat(Math.round($scope.totaalstand * 100) / 100).toFixed(2);

          $scope.totaalstand = $scope.totaalstand.replace(".", ",");


          }, function errorCallback(response) {


          });
  }
  $scope.gotochromestore = function() {
    window.location = "https://chrome.google.com/webstore/detail/4morgen/doncbpppgoadlamedckeclamjckbcegd?hl=nl","_blank";
  }
  $scope.jaaropgavedownloaden = function(jaar){
    var jaaropgaveurl = $scope.jaaropgave.replace("{year}", jaar);
      $window.location = jaaropgaveurl, "_blank";

  }

  $scope.favChar();
  $scope.FavShops();
  $scope.currentDonationf();
  $scope.TotaalDonaties();
}]);

myapp.filter('cmdate', [
    '$filter', function($filter) {
        return function(input, format) {
            return $filter('date')(new Date(input), format);
        };
    }
]);
