myapp.controller('homeCtl', ['$scope', '$http','$location','$cookies','$timeout','$rootScope', 'dataFactory',function ($scope, $http, $location,$cookies,$timeout,$rootScope,dataFactory) {



dataFactory.getDonaties()
    .then(function(response) {
        $scope.TotalDonaties = response.data;
        $scope.TotalDonaties = parseFloat($scope.TotalDonaties).toFixed(2);
        $scope.TotalDonaties = $scope.TotalDonaties.replace(".", ",");

    });

}]);
