myapp.controller('winkelCategorie', ['$scope', '$http', function ($scope, $http) {





      /* API Urls */
      $scope.getCategoriesUrl = 'https://api.4morgen.org/v1/categories';
      $scope.getSubCategoriesUrl = 'https://api.4morgen.org/v1/category/{categoryId}/subcategories';
      $scope.getItemsUrl = "https://api.4morgen.org/v1/category/{categoryId}/subcategories/{subcategoryIds}/items?orderBy={orderBy}&skip={skip}&top={top}&includeCount={includeCount}";

      $scope.categoriesLoading = false;
      $scope.subCategoriesLoading = false;
      $scope.itemsLoading = false;

      $scope.categories = [];
      $scope.selectedCategory = null;
      $scope.subCategories = [];
      $scope.items = [];


      /* Paging */
      $scope.maxSize = 5;
      $scope.itemsPerPage = 6;
      $scope.totalItems = 100;
      $scope.currentPage = 1;
      $scope.orderBy = "Name";

      $scope.setPage = function (pageNo) {
          $scope.currentPage = pageNo;
      };

      $scope.pageChanged = function () {
          console.log('Page changed to: ' + $scope.currentPage);
      };

console.log("hallo");
      $scope.getCategories = function () {
          $http.get($scope.getCategoriesUrl)
              .success(function (data, status, headers, config) {
                  $scope.categoriesLoading = false;
                  $scope.categories = data;
                  console.log(data);
              })
              .error(function (data, status, headers, config) {
                  $scope.categoriesLoading = false;
                  $scope.errorMessage = status; //Error handling discussed elsewhere
              });
          $scope.categoriesLoading = true;
      }

      $scope.selectCategory = function (category) {
          $scope.selectedCategory = category;


          $scope.getSubCategories();

      }

      $scope.getSubCategories = function () {
          var url = $scope.getSubCategoriesUrl.replace("{categoryId}", $scope.selectedCategory.Id);
          $http.get(url)
              .success(function (data, status, headers, config) {
                  $scope.subCategoriesLoading = false;
                  console.log(data);

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
          subCategory.checked = !subCategory.checked;
          $scope.getItems(true);
      }

      $scope.pageChanged = function (currentPage) {

          //See https://github.com/angular/angular.js/wiki/Understanding-Scopes#ng-include
          //For understanding scopes
          //Although I did not fully understand the two-way binding issue, this resolves it.

          $scope.currentPage = currentPage;
          $scope.getItems(true);
      }

      $scope.getItems = function (includeCount) {
          var ids = [];
          angular.forEach($scope.subCategories, function (subCategory) {
              if (subCategory.checked) {
                  ids.push(subCategory.Id);
              }
          });

          var url = $scope.getItemsUrl
              .replace("{categoryId}", $scope.selectedCategory.Id)
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

              })
              .error(function (data, status, headers, config) {
                  $scope.itemsLoading = false;
                  $scope.errorMessage = status; //Error handling discussed elsewhere
              });
          $scope.itemsLoading = true;
      }

      $scope.getCategories();


}]);
