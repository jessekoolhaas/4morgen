myapp.controller('winkelCategorie', ['$scope', '$http','$location','$anchorScroll', function ($scope, $http,$location,$anchorScroll) {

  $scope.totalCount = true;


  $scope.Toevoegen = "https://api.4morgen.org/v1/currentuser/favoriteshops";
  $scope.apiLogin   = "https://api.4morgen.org/v1/authentication/login";
      /* API Urls */
      $scope.getCategoriesUrl = 'https://api.4morgen.org/v1/categories';
      $scope.getSubCategoriesUrl = 'https://api.4morgen.org/v1/category/{categoryId}/subcategories';
      $scope.getItemsUrl = "https://api.4morgen.org/v1/category/{categoryId}/subcategories/{subcategoryIds}/items?orderBy={orderBy}&skip={skip}&top={top}&includeCount={includeCount}";

      $scope.categoriesLoading = false;
      $scope.subCategoriesLoading = false;
      $scope.itemsLoading = false;

      $scope.categories = [];
      $scope.selectedCategoryId = 10000
      $scope.subCategories = [];
      $scope.items = [];

      /* Paging */
      $scope.maxSize = 5;
      $scope.itemsPerPage = 20;
      $scope.totalItems = 999;
      $scope.currentPage = 1;
      $scope.orderBy = "Name";

      $scope.goToTop = function(){
          $("html, body").animate({ scrollTop: 0 }, 200);
      }

      $scope.setPageNext = function (pageNo) {
          $scope.currentPage = $scope.currentPage + pageNo;
          $scope.getItems(true);
          $scope.goToTop();
      };

      $scope.setPagePre = function (pageNo) {
          $scope.currentPage = $scope.currentPage - pageNo;
          $scope.getItems(true)
          $scope.goToTop();
      };

      $scope.pageChanged = function () {
          console.log('Page changed to: ' + $scope.currentPage);
      };
      $scope.getCategories = function () {
          $http.get($scope.getCategoriesUrl)
              .success(function (data, status, headers, config) {
                  $scope.categoriesLoading = false;
                  $scope.categories = data;
                  $scope.getSubCategories();

              })
              .error(function (data, status, headers, config) {
                  $scope.categoriesLoading = false;
                  $scope.errorMessage = status; //Error handling discussed elsewhere
              });


      }

      $scope.selectCategory = function (category) {
            $scope.currentPage = 1;
          $scope.selectedCategory = category;
          $scope.selectedCategoryId = $scope.selectedCategory.Id
          $scope.getSubCategories();
      }

      $scope.getSubCategories = function () {
          var url = $scope.getSubCategoriesUrl.replace("{categoryId}", $scope.selectedCategoryId);
          $http.get(url)
              .success(function (data, status, headers, config) {
                  $scope.subCategoriesLoading = false;

                  angular.forEach(data, function (subCategory) {
                      subCategory.checked = true;
                  });

                  $scope.subCategories = data;
                  $scope.getItems(true);
              })
              .error(function (data, status, headers, config) {
                  $scope.subCategoriesLoading = false;
                  $scope.errorMessage = status; //Error handling discussed elsewhere
              });
          $scope.subCategoriesLoading = true;
      }

      $scope.checkSubcategory = function (subCategory) {
          // Als je een subcategorie aanvinkt of uitvinkt wordt je automatisch naar pagina 1 gestuurd
          $scope.currentPage = 1;
          subCategory.checked = !subCategory.checked;
          $scope.getItems(true);

      }

      // $scope.pageChanged = function (currentPage) {
      //
      //     //See https://github.com/angular/angular.js/wiki/Understanding-Scopes#ng-include
      //     //For understanding scopes
      //     //Although I did not fully understand the two-way binding issue, this resolves it.
      //
      //     $scope.currentPage = currentPage;
      //     $scope.getItems(true);
      // }

      $scope.getItems = function (includeCount) {
          var ids = [];
          angular.forEach($scope.subCategories, function (subCategory) {
              if (subCategory.checked) {
                  ids.push(subCategory.Id);

              }
          });
              if ($scope.currentPage == 1) {
                $scope.vorige = true;
              }
              else {
                $scope.vorige = false;
              }

          var url = $scope.getItemsUrl
              .replace("{categoryId}", $scope.selectedCategoryId)
              .replace("{subcategoryIds}", "[" + ids.join(",") + "]")
              .replace("{skip}", $scope.itemsPerPage * ($scope.currentPage - 1))
              .replace("{top}", $scope.itemsPerPage)
              .replace("{orderBy}", $scope.orderBy)
              .replace("{includeCount}", includeCount ? true : false);

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
          $scope.itemsLoading = true;
      }

      $scope.getCategories();
      $scope.goto = function(Id) {
        $location.path("/winkels/" + Id)
      }

      $scope.ToevoegenAanFav = function(charitieId,charitieName){
      $scope.toevoegen(charitieId,charitieName);
      }
      $scope.toevoegen = function(charitieId,charitieName){
        $scope.datatsad = charitieId;
        $http({
          method: 'PUT',
          url: $scope.Toevoegen,
          data: $scope.datatsad,
          headers: { 'Content-Type': 'application/json' }
              }).then(function successCallback(response) {



                  alert(charitieName+" is blij met je steun")


              }, function errorCallback(response) {

                  if (response.status === 400) {
                    alert(charitieName+ " is bij dat jullie hun al steuned");
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
                $scope.toevoegen(0,charitieName);
                $scope.inlogModalGoedeDoelen = false;
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


}]);
