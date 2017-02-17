myapp.controller('winkelCategorie', ['$scope', '$http', '$location', '$anchorScroll', '$rootScope', function ($scope, $http, $location, $anchorScroll, $rootScope) {

    $scope.filter_category = $location.search()['category'];
    $scope.filter_page = $location.search()['page'];
    $scope.filter_search = {category: $scope.filter_category, page:$scope.filter_page}

    if (!$scope.filter_page && !$scope.filter_category) {
        console.log($location.search({category: '', page: '1'}));
        $scope.filter_search = {category: '', page:'1'}
    }


    $scope.totalCount = true;

    $scope.Toevoegen = $rootScope.winkelToevoegenFav;
    $scope.apiLogin = $rootScope.authLogin;
    /* API Urls */
    $scope.getCategoriesUrl = $rootScope.winkelCategorie;
    $scope.getSubCategoriesUrl = $rootScope.winkelSubCategorie;
    $scope.getItemsUrl = $rootScope.winkelItems;

    $scope.categoriesLoading = false;
    $scope.subCategoriesLoading = false;
    $scope.itemsLoading = false;

    $scope.subCategories = [];
    $scope.items = [];

    /* Paging */
    $scope.maxSize = 5;
    $scope.itemsPerPage = 20;
    $scope.totalItems = 999;
    $scope.currentPage = 1;
    $scope.orderBy = "Name";

    $scope.getCategories = function ()
    {
        $http.get($scope.getCategoriesUrl)
            .success(function (data, status, headers, config) {

                $scope.categoriesLoading = false;
                $scope.categories = data;

                if($scope.filter_search.category == '')
                {
                    $scope.filter_search.category =  data[0].Id;
                }
                $scope.getSubCategories($scope.filter_search);

            })
            .error(function (data, status, headers, config) {
                $scope.categoriesLoading = false;
                $scope.errorMessage = status; //Error handling discussed elsewhere
            });
    };

    $scope.selectCategory = function (category) {

        $scope.filter_search.category = category.Id;
        $scope.filter_search.page = 1;
        $scope.getSubCategories($scope.filter_search);
    };

    $scope.getSubCategories = function (filter_data) {
        // console.log(filter_data);


        var url = $scope.getSubCategoriesUrl.replace("{categoryId}", filter_data.category);
        console.log(url);
        $http.get(url)
            .success(function (data, status, headers, config)
            {
                angular.forEach(data, function (subCategory) {
                    subCategory.checked = true;
                });
                $scope.subCategories = data;
                $scope.getItems(filter_data);
            })
            .error(function (data, status, headers, config) {
                $scope.subCategoriesLoading = false;
                $scope.errorMessage = status; //Error handling discussed elsewhere
            });
        $scope.subCategoriesLoading = true;
    };

    $scope.checkSubcategory = function (subCategory) {
        // Als je een subcategorie aanvinkt of uitvinkt wordt je automatisch naar pagina 1 gestuurd
        $scope.currentPage = 1;
        subCategory.checked = !subCategory.checked;
        $scope.getItems(true);

    };


    $scope.getItems = function (filter_data) {
        console.log(filter_data  )
        var ids = [];
        angular.forEach($scope.subCategories, function (subCategory) {
            if (subCategory.checked) {
                ids.push(subCategory.Id);

            }
        });

        if (filter_data.page == 1) {
            $scope.vorige = true;
        }
        else {
            $scope.vorige = false;
        }



        var url = $scope.getItemsUrl
            .replace("{categoryId}", filter_data.category)
            .replace("{subcategoryIds}", "[" + ids.join(",") + "]")
            .replace("{skip}", $scope.itemsPerPage * (filter_data.page - 1))
            .replace("{top}", $scope.itemsPerPage)
            .replace("{orderBy}", $scope.orderBy)
            .replace("{includeCount}", true);

        console.log(url);

        $http.get(url)
            .success(function (data, status, headers, config) {

                console.log(data.TotalCount);
                console.log(filter_data.category);
                $location.search(filter_data)
                $scope.items = data.Result;
                $scope.totaalaantalopvraag = $scope.items.length;
                if ($scope.totaalaantalopvraag === $scope.itemsPerPage) {
                    $scope.volgende = false;

                } else {
                    $scope.volgende = true;
                }
            })
            .error(function (data, status, headers, config) {
                $scope.itemsLoading = false;
                $scope.errorMessage = status; //Error handling discussed elsewhere
            });
        $scope.itemsLoading = true;
    };

    $scope.getCategories();
    $scope.goto = function (Id) {
       $location.search({})
        $location.path("/winkels/" + Id)
    };

    $scope.ToevoegenAanFav = function (charitieId, charitieName) {
        $scope.toevoegen(charitieId, charitieName);
    }
    $scope.toevoegen = function (charitieId, charitieName) {
        $scope.datatsad = charitieId;
        $http({
            method: 'PUT',
            url: $scope.Toevoegen,
            data: $scope.datatsad,
            headers: {'Content-Type': 'application/json'}
        }).then(function successCallback(response) {
            console.log(response.status);


            // alert(charitieName+" is blij met je steun")
            $scope.succesToevoegen(charitieName);


        }, function errorCallback(response) {
            console.log(response.status);

            if (response.status === 400) {
                alert(charitieName + " is bij dat jullie hun al steuned");
            }
            if (response.status === 401) {
                $scope.eerstInloggen(charitieName);

            }


        });
    }

    $scope.succesToevoegen = function (charitieName) {
        $scope.winkelNaamSucces = charitieName;
        $scope.winkelSucces = true;
    }
    $scope.succesToevoegenSluiten = function (charitieName) {
        $scope.winkelNaamSucces = '';
        $scope.winkelSucces = false;
    }

    $scope.eerstInloggen = function (charitieName) {
        $scope.inlogModalGoedeDoelen = true;
        $scope.vergetenError = true;
        $scope.charitieName = charitieName;
    }
    $scope.loginSubmit = function (charitieName) {
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
            $scope.toevoegen(0, charitieName);
            $scope.inlogModalGoedeDoelen = false;
            $scope.getrekt = function () {
                return true;
            }
            $scope.$on('inlogEvent', function (e) {
                $scope.$parent.userlog = ( $scope.getrekt())
            });


        }, function errorCallback(response) {
            $scope.loginError = true;
            $scope.vergetenError = false;

        });
    };

    $scope.goToTop = function () {
        $("html, body").animate({scrollTop: 0}, 200);
    }

    $scope.setPageNext = function (pageNo) {
        console.log(pageNo);
        console.log($scope.filter_search.page + "default") ;
        $scope.filter_search.page = (parseInt($scope.filter_search.page) + 1);
        console.log($scope.filter_search.page + "++");
        $scope.getItems($scope.filter_search);
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


}]);
