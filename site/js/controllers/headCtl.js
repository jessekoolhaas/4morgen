myapp.controller('headCtl', ['$scope', '$http','$location','$cookies','$timeout', function ($scope, $http, $location,$cookies,$timeout) {

$scope.iscookie = true;
var cookieAccept = $cookies.cookieAccept;
var adBlok = $cookies.adBlok;

if (cookieAccept == undefined) {
  $cookies.cookieAccept = "2";
  $scope.iscookie = false;
}

$scope.auth = "https://api.4morgen.org/v1/authentication";
$scope.userlog = false;
$scope.getCategories = function () {
    $http.get($scope.auth)
        .success(function (data, status, headers, config) {
          $scope.userlog = true;



        })
        .error(function (data, status, headers, config) {
          $scope.userlog = false;
        });


}




$scope.getrekt = function(){
    $scope.$broadcast ('inlogEvent');
    return  $scope.userlog;
}

$scope.adBlockChecker = function () {
      if ($('#myList').length != 0)
      {
          $scope.adblokker = true;
          }
  };

  $timeout(function() {
    console.log(adBlok);
    if (adBlok == undefined) {
      $cookies.adBlok = "2";
      $scope.adBlockChecker();
    }

    }, 3000);


$scope.getCategories();
}]);
