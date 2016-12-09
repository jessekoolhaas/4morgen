myapp.controller('headCtl', ['$scope', '$http','$location','$cookies','$timeout','$rootScope', function ($scope, $http, $location,$cookies,$timeout,$rootScope) {

$scope.feedback = true;
$scope.iscookie = true;
var cookieAccept = $cookies.cookieAccept;
var adBlok = $cookies.adBlok;


if (cookieAccept == undefined) {
  $cookies.cookieAccept = "2";
  $scope.iscookie = false;
}

$scope.urlFeedback = $rootScope.Contact;
$scope.auth = $rootScope.auth;
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

$scope.feedbackForm = function() {
  var voornaam = "-";
  var mail = $scope.FeedbackMail;
  var onderwerp = "Feedback";
  var bericht = $scope.feedbackBericht;
  var postObject = new Object();
  postObject.Email = mail;
  postObject.Name = voornaam;
  postObject.Subject = onderwerp;
  postObject.Message = bericht;
  postObject.CopyToSelf = false;

  console.log(postObject);

  //
  $http({
    method: 'POST',
    url: $scope.urlFeedback,
    data:  postObject,
    headers: [{'Content-Type': 'application/json'}]
        }).then(function successCallback(response) {
          console.log(response.status);
          $scope.FeedbackMail ='';
          $scope.feedbackBericht='';
          $scope.feedbackSuccess = true;
          $timeout(function () {
            $scope.feedback = false;
          }, 2000);

        }, function errorCallback(response) {
            console.log(response.status);
            $scope.feedbackError = true;

        });
};




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
