myapp.controller('vjbCtl', function ($scope,$http,$rootScope ,$location){
    $scope.getCategoriesUrl       = $rootScope.goededoelenItems;
    $scope.selectedCategoryId = "6"


    $scope.itemsPerPage = 4;
    $scope.totalItems = 999;
    $scope.currentPage = 1;
    $scope.orderBy = "Name";


    $scope.getItems = function () {



    var url = $scope.getCategoriesUrl
        .replace("{categoryIds}", $scope.selectedCategoryId)
        .replace("{skip}", $scope.itemsPerPage * ($scope.currentPage - 1))
        .replace("{top}", $scope.itemsPerPage)
        .replace("{includeCount}", true);

    $http.get(url)
        .success(function (data, status, headers, config) {

            $scope.vjbdata = data.Result;

        })
        .error(function (data, status, headers, config) {

        });
    };

    $scope.goto = function(Id) {
      $location.path("/goededoelen/" + Id)
    };


    $scope.getItems();
});
