myapp.controller('contact',['$scope','$window','$http' ,function ($scope,$window,$http){
$scope.vergetenError = false
$scope.urlmail = "https://api.4morgen.org/v1/mail/contact";

$scope.submitformDonatie = function() {
  var voornaam ="Testerino";
  var email = $scope.donatie.mail;
  var onderwerp = "gemistedonaties";


  var bericht =
      " opdernummer:" + $scope.donatie.Ordernummer +
      " aankoopbedrag: " + $scope.donatie.Aankoopbedrag +
      " aankoopdatum: " + $scope.donatie.datum +
      " aanmerking: " + $scope.donatie.bericht;

    var postObjectgemistedonatie = new Object();
    postObjectgemistedonatie.Email = email;
    postObjectgemistedonatie.Name = voornaam;
    postObjectgemistedonatie.Subject = onderwerp;
    postObjectgemistedonatie.Message = bericht;
    postObjectgemistedonatie.CopyToSelf = true;
    console.log(postObjectgemistedonatie);

    $http({
      method: 'POST',
      url: $scope.urlmail,
      data:  postObjectgemistedonatie,
      headers: [{'Content-Type': 'application/json'}]
          }).then(function successCallback(response) {
            console.log(response.status);
            $scope.donatie.mail ='';
            $scope.donatie.Ordernummer='';
            $scope.donatie.Aankoopbedrag='';
            $scope.donatie.Aankoopdatum='';
            $scope.donatie.bericht='';
            console.log("gefeliciteerd");
            $scope.vergetenError = true;

          }, function errorCallback(response) {
              console.log(response.status);

          });
};

  $scope.submit = function() {
    var voornaam = $scope.naam;
    var mail = $scope.mail;
    var onderwerp = $scope.onderwerp;
    var bericht = $scope.bericht;
    var postObject = new Object();
    postObject.Email = mail;
    postObject.Name = voornaam;
    postObject.Subject = onderwerp;
    postObject.Message = bericht;

    console.log(postObject);

    //
    $http({
      method: 'POST',
      url: $scope.urlmail,
      data:  postObject,
      headers: [{'Content-Type': 'application/json'}]
          }).then(function successCallback(response) {
            console.log(response.status);
            $scope.naam ='';
            $scope.mail='';
            $scope.onderwerp='';
            $scope.bericht='';
            console.log("gefeliciteerd");
            $scope.vergetenError = true;

          }, function errorCallback(response) {
              console.log(response.status);

          });
  };



}]);
