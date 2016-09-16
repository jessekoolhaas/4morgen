myapp.controller('goededoelenDisplay', function ( $scope,$stateParams,$http,$location,$window,$sce,$rootScope ){



  $scope.currentWinkel        = $stateParams.goededoel;
  $scope.apiLogin             = $rootScope.authLogin;
  $scope.Toevoegen            = $rootScope.goededoelenToevoegenFav;
  $scope.verwijderen          = $rootScope.goededoelenToevoegenFav;

$scope.getWinkelUrl           = $rootScope.goededoelenDisplay;
$scope.auth                   = $rootScope.auth;
$scope.relatedGoededoelen     = $rootScope.goededoelenRelated;

                $scope.ExtraInformatie = false;

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
              console.log(data);
              console.log(data.Adress);
              if (data.Address != undefined ) {
                console.log("er zit iets in!!!!!!!");
                $scope.ExtraInformatie = true;
              }

              $scope.video = data.VideoUrl;
              console.log($scope.video);
              console.log("dit is de $scope.video");
              $scope.currentProjectUrl = $sce.trustAsResourceUrl($scope.video);
              console.log($scope.currentProjectUrl);
              console.log("dit is de $scope.currentProjectUrl");
              // var url = $scope.currentProjectUrl.replace("watch?v=", "v/");
              // console.log(url);
              // console.log("dit is de url");
              // var url = $scope.currentProjectUrl;
              // console.log(url);
              // $scope.currentProjectUrl = url.
              // console.log($scope.currentProjectUrl);



              // Winkeltext
              $scope.winkeltext = data.Description;
              $scope.trustedHtml = $sce.trustAsHtml($scope.winkeltext);
              $scope.CommissionUnit = data.CommissionUnit;

              // adress text
              $scope.Address = data.Address;
              console.log($scope.Address);
              $scope.TrustedAdress = $sce.trustAsHtml($scope.Address);


              $scope.post();



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

$scope.posts = [];
$scope.post = function(){
  console.log($scope.goededoeldisplay.Name);
  var beschrijving = "Ik doneer gratis aan "+$scope.goededoeldisplay.Name+" door online te shoppen via 4MORGEN. Doe jij ook mee?"
  $scope.posts = [{

                  name            :$scope.goededoeldisplay.Name,
                  url             :url,
                  image           :$scope.goededoeldisplay.ImageUrl,
                  // caption         :" Dit is de caption1",
                  description     :beschrijving,
                  message         :"Asdmessage message message message asdasd"
                }];
                return
}



            $scope.share = function(post){
              console.log(post);
              console.log(post[0].title);
              var PostToWall = post[0];
              console.log(url);


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

});
