var myapp = angular.module('myapp',
     [
       "ui.router",
       "angularUtils.directives.dirPagination",
       "ngCookies",
       "UserValidation",
       "updateMeta",
       "ui.bootstrap"

     ]
     );

     myapp.run(function ($rootScope) {
       var api = "https://api-test.4morgen.org/";

        //  Inlog
         $rootScope.auth                    = api + "v1/authentication";
         $rootScope.authLogin               = api + "v1/authentication/login";
         $rootScope.authLogout              = api + "v1/authentication/logoff";

        //  Winkels
         $rootScope.winkelCategorie         = api + "v1/categories";
         $rootScope.winkelSubCategorie      = api + "v1/category/{categoryId}/subcategories";
         $rootScope.winkelItems             = api + "v1/category/{categoryId}/subcategories/{subcategoryIds}/items?orderBy={orderBy}&skip={skip}&top={top}&includeCount={includeCount}";
         $rootScope.winkelToevoegenFav      = api + "v1/currentuser/favoriteshops";
         $rootScope.winkelRedirect          = api + "v1/tracking/redirect/{winkelId}";

         $rootScope.winkelRelated           = api + "v1/shop/{shopId}/related";
         $rootScope.winkelDisplay           = api + "v1/shop/{shopId}";

         // dashboard
         $rootScope.donatieJaar             = api + "v1/donations/currentuser/yearly";
         $rootScope.donatieLijst            = api + "https://api.4morgen.org/v1/donations/currentuser?skip={skip}&top={top}&orderby={orderby}&includeCount={includeCount}";
         $rootScope.jaarOpgave              = api + "v1/donations/report/annualstatement/{year}";

         // Goede doelen
         $rootScope.goededoelenToevoegenFav = api + "v1/currentuser/favoritecharities";

     });
