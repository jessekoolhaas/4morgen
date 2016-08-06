myapp.controller('goededoelenCategorie', ['$scope', '$http','$location','$timeout', function ($scope, $http,$location,$timeout) {



    $scope.Toevoegen = "https://api.4morgen.org/v1/currentuser/favoritecharities";
    $scope.verwijderen = "https://api.4morgen.org/v1/currentuser/favoritecharities";
    $scope.apiLogin   = "https://api.4morgen.org/v1/authentication/login";

      /* API Urls */
      $scope.getCategoriesUrl = 'https://api.4morgen.org/v1/charities/categories';
      $scope.getSubCategoriesUrl = 'https://api.4morgen.org/v1/category/{categoryId}/subcategories';
      $scope.getItemsUrl = "https://api.4morgen.org/v1/categories/{categoryIds}/charities?skip={skip}&top={top}&includeCount={includeCount}";

      $scope.categoriesLoading = false;
      $scope.subCategoriesLoading = false;
      $scope.itemsLoading = false;

      $scope.categories = [];
      $scope.selectedCategoryId = 2
      $scope.subCategories = [];
      $scope.items = [];


      $scope.inlogModalGoedeDoelen = false;
      $scope.bedankt = false;


      /* Paging */
      $scope.maxSize = 5;
      $scope.itemsPerPage = 50;
      $scope.totalItems = 999;
      $scope.currentPage = 1;
      $scope.orderBy = "Name";

      $scope.setPage = function (pageNo) {
          $scope.currentPage = pageNo;
      };

      $scope.pageChanged = function () {
          console.log('Page changed to: ' + $scope.currentPage);
      };

      $scope.getCategories = function () {
          $http.get($scope.getCategoriesUrl)
              .success(function (data, status, headers, config) {
                  $scope.categoriesLoading = false;
                  $scope.categories = data;

                  $scope.selectCategory($scope.categories[0])


              })
              .error(function (data, status, headers, config) {
                  $scope.categoriesLoading = false;
                  $scope.errorMessage = status; //Error handling discussed elsewhere
              });


      }
      $scope.selectCategory = function(category){
        $scope.selectedCategoryId = category.Id;

        var url = $scope.getItemsUrl
            .replace("{categoryIds}", $scope.selectedCategoryId)
            .replace("{skip}", $scope.itemsPerPage * ($scope.currentPage - 1))
            .replace("{top}", $scope.itemsPerPage)
            .replace("{orderBy}", $scope.orderBy)
            .replace("{includeCount}", true);

        $http.get(url)
            .success(function (data, status, headers, config) {
                $scope.itemsLoading = false;

                if (data.TotalCount != undefined) {
                    $scope.totalItems = data.TotalCount;
                    $scope.pager_totalItems = data.TotalCount;
                }
                $scope.items = data.Result;

            })
            .error(function (data, status, headers, config) {
                $scope.itemsLoading = false;
                $scope.errorMessage = status; //Error handling discussed elsewhere
            });
      }




      $scope.getCategories();
      $scope.goto = function(Id) {
        $location.path("/goededoelen/" + Id)
      };





      $scope.ToevoegenAanFav = function(charitieId,charitieName){
      $scope.toevoegen(charitieId,charitieName);
      };

      $scope.toevoegen = function(charitieId,charitieName){
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
        $scope.inlogModalGoedeDoelen = true;
        $scope.vergetenError = true;
        $scope.charitieName = charitieName;
      }




      $scope.loginSubmit = function(charitieName){
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

                $scope.getrekt = function(){
                        return true;
                        }
                        $scope.$on('inlogEvent', function(e) {
                        $scope.$parent.userlog = ( $scope.getrekt())
                        });

                $scope.toevoegen(0,charitieName);
                $scope.inlogModalGoedeDoelen = false;





              }, function errorCallback(response) {
                $scope.loginError = true;
                $scope.vergetenError = false;

              });
      };


}]);
