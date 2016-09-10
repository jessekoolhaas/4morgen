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
       var api = "https://api-test.4morgen.org/"; //todo: make this configurable regardless of version control (or auto-detecting?)

         // Inlog
         $rootScope.auth                    = api + "v1/authentication";
         $rootScope.authLogin               = api + "v1/authentication/login";
         $rootScope.authLogout              = api + "v1/authentication/logoff";
         $rootScope.facebookLogin           = api + "v1/authentication/social/facebook?returnUrlSuccess={returnUrlSuccess}&returnUrlFailure={returnUrlFailure}";
         $rootScope.fbSucces                =   "https://4morgen.org/dashboard/overzicht";
         $rootScope.fbFailure               = "https://4morgen.org/";

         // Account
         $rootScope.wachtwoordReset         = api + "v1/account/password/reset";
         $rootScope.nieuwWachtwoordInstellen = api + "v1/account/password/{token}";
         $rootScope.wachtwoordBevestigen    = api + "v1/account/confirm/{token}";
         $rootScope.Registratie             = api + "v1/account";
         $rootScope.accountProfiel          = api + "v1/currentuser/profile";

         // Winkels
         $rootScope.winkelCategorie         = api + "v1/categories";
         $rootScope.winkelSubCategorie      = api + "v1/category/{categoryId}/subcategories";
         $rootScope.winkelItems             = api + "v1/category/{categoryId}/subcategories/{subcategoryIds}/items?orderBy={orderBy}&skip={skip}&top={top}&includeCount={includeCount}";
         $rootScope.winkelToevoegenFav      = api + "v1/currentuser/favoriteshops";
         $rootScope.winkelRedirect          = api + "v1/tracking/redirect/{winkelId}";

         $rootScope.winkelRelated           = api + "v1/shop/{shopId}/related";
         $rootScope.winkelDisplay           = api + "v1/shop/{shopId}";

         // dashboard
         $rootScope.donatieJaar             = api + "v1/donations/currentuser/yearly";
         $rootScope.donatieLijst            = api + "v1/donations/currentuser?skip={skip}&top={top}&orderby={orderby}&includeCount={includeCount}";
         $rootScope.jaarOpgave              = api + "v1/donations/report/annualstatement/{year}";

         // Goede doelen
         $rootScope.goededoelenToevoegenFav = api + "v1/currentuser/favoritecharities";
         $rootScope.goededoelenDisplay      = api + "v1/charity/{charityId}";
         $rootScope.goededoelenCategorie    = api + "v1/charities/categories";
         $rootScope.goededoelenItems        = api + "v1/categories/{categoryIds}/charities?skip={skip}&top={top}&includeCount={includeCount}";
         $rootScope.goededoelenRelated      = api + "v1/charity/{charityId}/related";

         // zoeken
         $rootScope.zoeken                  = api + "v1/search/{search}"

         // contact
         $rootScope.Contact                 = api + "v1/mail/contact";

     });
