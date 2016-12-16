myapp.controller('dashboardCtl', ['$scope', '$http','$location','$window','$state','$rootScope', 'dataFactory',function ($scope, $http, $location,$window,$state,$rootScope,dataFactory) {

  $http({
    method: 'GET',
url:  $rootScope.accountProfiel
  }).then(function successCallback(response) {
        $scope.url = response.data.ReferralCode;
        $scope.url = $location.host()+"/registratie-vriend/"+$scope.url;
        $scope.supTot = response.data.ReferredSupporterTotalCount;
        $scope.supSale = response.data.ReferredSupporterWithSalesCount;
        console.log($scope.url)
        console.log($scope.supTot)
        console.log($scope.supSale)


  },  function errorCallback(response) {
});
$scope.skip = 0;
$scope.topj = 50;
$scope.order = "Date";
dataFactory.auth()
    .then(function successCallback(response) {
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
      $state('/s')
    });
$scope.favChar = function(){
  dataFactory.GetFavoriteCharitie()
      .then(function(response) {
          $scope.myWelcome = response.data;
          $scope.MijnFavCharities = $scope.myWelcome.Result;
      });
}
$scope.FavShops = function(){
        dataFactory.GetFavoriteShop()
            .then(function(response) {
                $scope.myWelcome = response.data;
                $scope.MijnFavShops = $scope.myWelcome.Result;
            });
}
$scope.verwijderenFav = function(charitieId){
  dataFactory.DeleteFavoriteCharitie(charitieId)
    .then(function successCallback(response) {
        $scope.favChar();
      })
};
$scope.verwijderenFavwinkel = function(charitieId){
  dataFactory.DeleteFavoriteShop(charitieId)
    .then(function successCallback(response) {
        $scope.FavShops();
      });
}
$scope.logoutSubmit = function(){
  dataFactory.Logout()
    .then(function successCallback(response) {
        $location.path("/");
        $scope.getrekt = function(){
          return false;
        }
        $scope.$on('inlogEvent', function(e) {
        $scope.$parent.userlog = ( $scope.getrekt())
        });
      });
}
$scope.TotaalDonaties = function(){
            dataFactory.getUserDonations($scope.skip,$scope.topj,$scope.order,true)
            .then(function successCallback(response) {
            $scope.donatietable = response.data.Result;
            $scope.totaalstand = 0;
            $scope.ditjaar = 0
            var yearArray = [];
            var postObjectprofiel = new Object();
              for (donatie in response.data.Result){
                $scope.data = response.data.Result[donatie];
                $scope.bedrag = $scope.data.Donation;
                $scope.datum = $scope.data.Date;
                $scope.datum = $scope.datum.slice(0,4)
                if (  $scope.datum == new Date().getFullYear() ) {
                  if ($scope.data.Status == 1 || $scope.data.Status == 3) {
                      $scope.ditjaar =   $scope.ditjaar + Math.round($scope.bedrag * 100) / 100;
                  }
                }
                var year = $scope.datum;
              $scope.donatiebedrag = $scope.donatiebedrag + Math.round($scope.bedrag * 100) / 100;
                if ($scope.data.Status == 1 || $scope.data.Status == 3) {
                  $scope.totaalstand = $scope.totaalstand + Math.round($scope.bedrag * 100) / 100;
                }
              }
            $scope.totaalstand = parseFloat(Math.round($scope.totaalstand * 100) / 100).toFixed(2);
            $scope.totaalstand = $scope.totaalstand.replace(".", ",");
            $scope.ditjaar = parseFloat(Math.round($scope.ditjaar * 100) / 100).toFixed(2);
            $scope.ditjaar = $scope.ditjaar.replace(".", ",");
          }, function errorCallback(response) {});
        }; <!-- //end totaldonaties -->
$scope.gotochromestore = function() {
        window.location = "https://chrome.google.com/webstore/detail/4morgen/doncbpppgoadlamedckeclamjckbcegd?hl=nl","_blank";
      }
$scope.jaaropgavedownloaden = function(jaar){
        var jaaropgaveurl = $rootScope.jaaropgave.replace("{year}", jaar);
          $window.location = jaaropgaveurl, "_blank";
      }
// ---------
    $scope.posts = [];
    $scope.post = function(winkel, doel, donatie){
        $scope.rounddonatie = parseFloat(Math.round(donatie * 100) / 100).toFixed(2);
        // var beschrijving = "Ik doneer gratis aan "+$scope.goededoeldisplay.Name+" door online te shoppen via 4MORGEN. Doe jij ook mee?"
        var img = 'http://4morgen.local/site/image/onbekend.png'
        $scope.posts = [{
            name            :'4MORGEN',
            url             :'https://4morgen.org',
            image           : 'http://i.imgur.com/PwpQfLa.png',
            caption         :" Dit is de caption1",
            description     :'Mijn online aankoop bij '+ winkel + ' via 4MORGEN is goed voor een donatie van '+        $scope.rounddonatie+' aan '+doel+'. Gratis doneren via 4MORGEN, doe je ook mee?',
            message         :"Asdmessage message message message asdasd"
        }];
        $scope.share($scope.posts);
    };
// ---------
$scope.favChar();
$scope.FavShops();
$scope.TotaalDonaties();
// ---------
$scope.share = function(post){
        console.log(post);
        console.log(post[0].title);
        var PostToWall = post[0];
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
// ---------

$scope.postsFriend = [];
$scope.postFriend = function(winkel, doel, donatie){
    $scope.rounddonatie = parseFloat(Math.round(donatie * 100) / 100).toFixed(2);
    // var beschrijving = "Ik doneer gratis aan "+$scope.goededoeldisplay.Name+" door online te shoppen via 4MORGEN. Doe jij ook mee?"
    var img = 'http://4morgen.local/site/image/onbekend.png'
    $scope.posts = [{
        name            :'4MORGEN',
        url             :$scope.url,
        image           : 'http://i.imgur.com/PwpQfLa.png',
        // caption         :" Dit is de caption1",
        description     :'Help mij de wereld een beetje mooier te maken! Doneer gratis aan goede doelen, iedere keer als je online shopt',
        // message         :"Asdmessage message message message asdasd"
    }];
    $scope.share($scope.posts);
};


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

}]);
