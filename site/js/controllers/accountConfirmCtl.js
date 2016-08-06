  myapp.controller('accountConfirmCtl', ['$scope', '$http','$location','$cookies','$cookieStore','$state','$window','$stateParams', function ($scope, $http, $location,$cookies,$cookieStore,$state,$window,$stateParams) {

    $scope.confirmAccountUrl = "https://api.4morgen.org/v1/account/confirm/{token}";

$scope.zoekquery = $stateParams.token;
var test = $scope.zoekquery
$scope.confirm = $scope.confirmAccountUrl.replace("{token}",test);
var url = $scope.confirm;
console.log($scope.zoekquery);
console.log($scope.confirm);
var testObject = new Object();
testObject.token = test;
var data = [];





  $scope.verzenden = function(url2,data){
    var url3 = url2.toString();


    $http({
      method: 'PUT',
      url: url3,
      headers: { 'Content-Type': 'application/json' }
          }).then(function successCallback(response) {
            console.log(response.status);
            console.log(response.data);
            $state.go("dashboard");

          }, function errorCallback(response) {
              console.log(response.status);
              console.log(response.data);

          });

}
$scope.verzenden(url);
}]);
