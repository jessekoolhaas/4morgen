myapp.controller('goededoelenCategorie', ['$scope', '$http','$location','$timeout','$rootScope', function ($scope, $http,$location,$timeout,$rootScope) {



      $scope.Toevoegen              = $rootScope.goededoelenToevoegenFav;
      $scope.verwijderen            = $rootScope.goededoelenToevoegenFav;
      $scope.apiLogin               = $rootScope.authLogin
      $scope.getCategoriesUrl       = $rootScope.goededoelenCategorie;
      $scope.getItemsUrl            = $rootScope.goededoelenItems;
      console.log($scope.Toevoegen);

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

      $scope.goToTop = function(){
          $("html, body").animate({ scrollTop: 0 }, 200);
      }
      $scope.setPageNext = function (pageNo) {
          $scope.currentPage = $scope.currentPage + pageNo;
          $scope.selectCategory($scope.categories2);
          $scope.goToTop();
      };

      $scope.setPagePre = function (pageNo) {
          $scope.currentPage = $scope.currentPage - pageNo;
          $scope.selectCategory($scope.categories2);
          $scope.goToTop();
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
        $scope.categories2 = category;
        $scope.selectedCategoryId = category.Id;
        if ($scope.currentPage == 1) {
          $scope.vorige = true;
        }
        else {
          $scope.vorige = false;
        }

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

                $scope.totaalaantalopvraag = $scope.items.length;
                if ($scope.totaalaantalopvraag === $scope.itemsPerPage) {
                  $scope.volgende = false;

                }else {
                  $scope.volgende = true;
                }

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
