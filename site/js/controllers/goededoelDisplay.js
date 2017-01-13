myapp.controller('goededoelenDisplay', function ( $scope,$stateParams,$http,$location,$window,$sce,$rootScope,dataFactory ){

$scope.currentWinkel = $stateParams.goededoel;

var urlrelated = $rootScope.goededoelenRelated.replace("{charityId}", $scope.currentWinkel);
$http.get(urlrelated)
  .success(function (data, status, headers, config) {
      $scope.relatedGoededoelendisplay = data;
    })
    .error(function (data, status, headers, config) {
});
dataFactory.GetGoededoelendisplay($scope.currentWinkel)
  .then(function successCallback(response) {
    var data = response.data
    console.log(data);
    $scope.vm = data;
    $scope.video = data.VideoUrl;
    $scope.currentProjectUrl = $sce.trustAsResourceUrl($scope.video);
    $scope.winkeltext = data.Description;
    $scope.trustedHtml = $sce.trustAsHtml($scope.winkeltext);
    $scope.CommissionUnit = data.CommissionUnit;
    $scope.Address = data.Address;
    $scope.TrustedAdress = $sce.trustAsHtml($scope.Address);
    }, function errorCallback(response) {
      $scope.errorMessageWinkel = true;
});

$scope.gaNaarGoedDoel = function(test){
  window.open(test,'_blank');
};
$scope.verwijderenFav = function(charitieId){
  dataFactory.DeleteFavoriteCharitie(charitieId)
  .then(function successCallback(response) {
        }, function errorCallback(response) {
        });
};

$scope.ToevoegenAanFav = function(charitieId,charitieName){
  dataFactory.PutFavoriteCharitie(charitieId)
  .then(function successCallback(response) {
          alert("Deze organisatie is toegevoegd aan jouw favoriete goede doelen. ")
        }, function errorCallback(response) {
          if (response.status === 400) {
            alert("Je hebt deze organisatie reeds toegevoegd aan jouw favoriete goede doelen. ");
          }
          if (response.status === 401) {
            $scope.inlogModal = true;
            $scope.vergetenError = true;
          }
        });
};
$scope.closeModal = function(){
    $scope.inlogModal = false;
    $scope.vergetenError = true;
}
$scope.loginSubmit2 = function(charitieId,voornaam,wachtwoord){
  var Objectprofiel = new Object();
  Objectprofiel.UserName = voornaam;
  Objectprofiel.Password = wachtwoord;

  dataFactory.authlogin(Objectprofiel)
  .then(function successCallback(response) {
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
