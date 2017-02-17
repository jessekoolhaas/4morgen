myapp.controller('goededoelenCategorie', ['$scope', '$http', '$location', '$timeout', '$rootScope', 'dataFactory', function ($scope, $http, $location, $timeout, $rootScope, dataFactory) {

    // console.log($location.search({category: '', page: ''}));
    // console.log($location.search({category: '333'}));
    // console.log($location.search().category);
    // console.log($location.search())

    $scope.filter_category = $location.search()['category'];
    $scope.filter_page = $location.search()['page'];

    if(!$scope.filter_page && !$scope.filter_category){
        console.log($location.search({category: '', page: ''}));
    }




    $scope.Toevoegen = $rootScope.goededoelenToevoegenFav;
    $scope.verwijderen = $rootScope.goededoelenToevoegenFav;
    $scope.apiLogin = $rootScope.authLogin
    $scope.getCategoriesUrl = $rootScope.goededoelenCategorie;
    $scope.getItemsUrl = $rootScope.goededoelenItems;

    $scope.categoriesLoading = false;
    $scope.subCategoriesLoading = false;
    $scope.itemsLoading = false;

    $scope.categories = [];
    // $scope.selectedCategoryId = 2
    $scope.subCategories = [];
    $scope.items = [];


    $scope.inlogModalGoedeDoelen = false;
    $scope.bedankt = false;






    console.log($scope.filter_category + "filter_category");
    console.log($scope.filter_page + "filter_page");


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

    $scope.goToTop = function () {
        $("html, body").animate({scrollTop: 0}, 200);
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

                if(!$scope.filter_page && !$scope.filter_category){
                    console.log($scope.categories[0].Id);
                    $scope.selectCategory($scope.categories[0].Id)
                }else{
                    $scope.selectCategory($scope.filter_category)

                }
                console.log(  $scope.categories)
            })
            .error(function (data, status, headers, config) {
                $scope.categoriesLoading = false;
                $scope.errorMessage = status; //Error handling discussed elsewhere
            });
    }
    $scope.selectCategory = function (category) {
        $scope.categories2 = category;
        $scope.selectedCategoryId = category;
        $location.search({category: category, page: ''});
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

                } else {
                    $scope.volgende = true;
                }

            })
            .error(function (data, status, headers, config) {
                $scope.itemsLoading = false;
                $scope.errorMessage = status; //Error handling discussed elsewhere
            });
    }


    $scope.getCategories();
    $scope.goto = function (Id) {
        $location.path("/goededoelen/" + Id)
    };
    $scope.ToevoegenAanFav = function (charitieId, charitieName) {
        console.log(charitieId, charitieName);
        dataFactory.PutFavoriteCharitie(charitieId)
            .then(function successCallback(response) {

                // $scope.succesToevoegen(charitieName);
                alert("Deze organisatie is toegevoegd aan jouw favoriete goede doelen. ")

            }, function errorCallback(response) {
                if (response.status === 400) {
                    // $scope.failtoevoegen(charitieName);
                    alert("Je hebt deze organisatie reeds toegevoegd aan jouw favoriete goede doelen. ");
                }
                if (response.status === 401) {
                    $scope.inlogModal = true;
                    $scope.vergetenError = true;


                }
            });
    }

    $scope.closeModal = function () {
        $scope.inlogModal = false;
        $scope.vergetenError = true;
    }

    // $scope.succesToevoegen = function(charitieName){
    //   $scope.goededoelenNaamSucces = charitieName;
    //   $scope.goededoelenSucces = true;
    // }
    // $scope.succesToevoegenSluiten = function(charitieName){
    //   $scope.goededoelenNaamSucces = '';
    //   $scope.goededoelenSucces = false;
    // }


//
//       $scope.failtoevoegen = function(charitieName){
//         $scope.goededoelenNaamfail = charitieName;
//         $scope.goededoelenfail = true;
// }
//       $scope.failtoevoegenSluiten = function(charitieName){
//         $scope.goededoelenNaamfail = '';
//         $scope.goededoelenfail = false;
//       }


    $scope.eerstInloggen = function (charitieName) {
        $scope.inlogModalGoedeDoelen = true;
        $scope.vergetenError = true;
        $scope.charitieName = charitieName;
    }


    $scope.loginSubmit2 = function (charitieId, voornaam, wachtwoord) {
        console.log(charitieId, voornaam, wachtwoord)
        var Objectprofiel = new Object();
        Objectprofiel.UserName = voornaam;
        Objectprofiel.Password = wachtwoord;

        dataFactory.authlogin(Objectprofiel)
            .then(function successCallback(response) {
                $scope.ToevoegenAanFav(charitieId, 0);
                $scope.inlogModal = false;
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

    console.log($location.search());
}]);
