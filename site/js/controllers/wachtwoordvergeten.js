myapp.controller('wachtwoordvergetenCtl', function ( $scope,$http,$location,$window,$stateParams,$sce,$timeout){

$scope.resetten = "https://api.4morgen.org/v1/account/password/reset";
$scope.instellenurl = "https://api.4morgen.org/v1/account/password/{token}";
$scope.succesverstuurd = true;
$scope.geenmatch = true;
$scope.wachtwoordInstellenSuccess = true;
$scope.wachtwoordInstellen = false;


$scope.vergeten = function(){
var email = $scope.vergeten.email;
var emailverzenden = '"'+email+'"';
  $http({
    method: 'POST',
    url: $scope.resetten,
    data: emailverzenden,
    headers: { 'Content-Type': 'application/json' }
        }).then(function successCallback(response) {
          console.log(response.status + " succes");
          $scope.succesverstuurd = false;
          $scope.geenmatch = true;

        }, function errorCallback(response) {
          console.log(response.status + " ERROR");
          $scope.succesverstuurd = true;
          $scope.geenmatch = false;

        });
  }

  $scope.instellen = function(){
    var apiurl = $scope.instellenurl
    console.log(apiurl);
    $scope.token = $stateParams.token;
    var wachtwoord = $scope.user.passwordReset;
console.log(wachtwoord);
    // var url = apiurl.replace("{token}",$scope.token);
    var url = apiurl.replace("{token}", $scope.token);
    console.log(url);
  var wachtwoordverzenden = '"'+wachtwoord+'"';
  console.log(wachtwoordverzenden);
    $http({
      method: 'POST',
      url: url,
      data: wachtwoordverzenden,
      headers: { 'Content-Type': 'application/json' }
          }).then(function successCallback(response) {
            console.log(response.status + " succes");
            $scope.wachtwoordInstellenSuccess = false;
            $scope.wachtwoordInstellen = true;


          }, function errorCallback(response) {
            console.log(response.status + " ERROR");
            alert("Er is iets fout gegaan")


          });
    }


});
