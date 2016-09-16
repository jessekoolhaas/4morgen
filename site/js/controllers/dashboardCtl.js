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

    $scope.posts = [];
    $scope.post = function(winkel, doel, donatie){
        $scope.rounddonatie = parseFloat(Math.round(donatie * 100) / 100).toFixed(2);
        // var beschrijving = "Ik doneer gratis aan "+$scope.goededoeldisplay.Name+" door online te shoppen via 4MORGEN. Doe jij ook mee?"
        var img = 'http://4morgen.local/site/image/onbekend.png'
        $scope.posts = [{

            name            :'4MORGEN',
            url             :'https://4morgen.org',
            image           : 'http://i.imgur.com/PwpQfLa.png',
            // caption         :" Dit is de caption1",
            description     :'Mijn online aankoop bij '+ winkel + ' via 4MORGEN is goed voor een donatie van '+        $scope.rounddonatie+' aan '+doel+'. Gratis doneren via 4MORGEN, doe je ook mee?',
            message         :"Asdmessage message message message asdasd"
        }];

        $scope.share($scope.posts);
    };

    $scope.share = function(post){
        console.log(post);
        console.log(post[0].title);
        var PostToWall = post[0];
        // console.log(url);


        FB.ui(
            {
                method: 'feed',
                name: PostToWall.name,
                link: PostToWall.url,
                picture: PostToWall.image,
                caption: PostToWall.caption,
                description: PostToWall.description,
                message: PostToWall.message
            });
    };














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
