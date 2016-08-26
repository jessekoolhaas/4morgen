
myapp.config(['$urlRouterProvider', '$stateProvider','$locationProvider','$httpProvider', function($urlRouterProvider, $stateProvider, $locationProvider,$httpProvider){
  $urlRouterProvider.otherwise('/');
  $locationProvider.html5Mode(true);


  $stateProvider

  .state('home', {
      url: "/",
      templateUrl: "/site/frontpage.html"
  })
  .state('over', {
      url: "/overons",
      templateUrl: "/site/view/overig/overons.html"
  })
  .state ('login', {
      url: "/login",
      templateUrl:"/site/view/account/login.html",
      controller:"loginCtl"
    })
  .state ('winkels', {
      url: "/winkels",
      templateUrl:"/site/view/winkels/winkels.html",
      controller:"winkelCategorie"
    })
    .state ('winkel-display', {
        url: "/winkels/:winkel",
        templateUrl:"/site/view/winkels/winkel-display.html",
        controller: 'winkelDisplay'
      })

        .state ('dashboard', {
          url: "/dashboard",
          templateUrl:"/site/view/account/dashboard.html",
          controller:"dashboardCtl"
        })
        .state ('dashboard.overzicht', {
          url: "/overzicht",
          templateUrl:"/site/view/account/overzicht.html"
        })
        .state ('dashboard.profiel', {
          url: "/profiel",
          templateUrl:"/site/view/account/profiel.html",
          controller:"profielCtl"
        })
        .state ('dashboard.donaties', {
          url: "/donaties",
          templateUrl:"/site/view/account/donaties.html"
        })









        .state ('registratie', {
          url: "/registratie",
          templateUrl:"/site/view/account/registratie.html",
          controller:"registratieCtl"
        })
        .state ('registratiegoeddoel', {
          url: "/registratie/:goeddoel",
          templateUrl:"/site/view/account/regiaandoel.html",
          controller:"regiaandoelCtl"
        })
        .state ('zoeken', {
          url: "/zoek/:zoek",
          templateUrl:"/site/view/overig/zoeken.html",
          controller:"zoekCtl"
        })
        .state ('goededoelen', {
          url: "/goededoelen",
          templateUrl:"/site/view/goededoelen/goededoelen.html",
          controller:"goededoelenCategorie"
        })
        .state ('goededoelen-display', {
          url: "/goededoelen/:goededoel",
          templateUrl:"/site/view/goededoelen/goededoel-display.html",
          controller:"goededoelenDisplay"
        })
        .state ('faq', {
          url: "/faq",
          templateUrl:"/site/view/overig/faq.html",
          controller:"faq"
        })
        .state ('voorwaarden', {
          url: "/algemene-voorwaarden",
          templateUrl:"/site/view/overig/voorwaarden.html",
          controller:"voorwaarden"
        })
        .state ('policy', {
          url: "/privacy-policy",
          templateUrl:"/site/view/overig/policy.html",
          controller:"policy"
        })
        .state ('disclaimer', {
          url: "/disclaimer",
          templateUrl:"/site/view/overig/disclaimer.html",
          controller:"disclaimer"
        })
        .state ('cookie', {
          url: "/cookie",
          templateUrl:"/site/view/overig/cookie.html",
          controller:"cookie"
        })
        .state ('contact', {
          url: "/contact",
          templateUrl:"/site/view/contact/contactform.html",
          controller:"contact"
        })
        .state ('gemistedonaties', {
          url: "/gemistedonaties",
          templateUrl:"/site/view/contact/formgemiste.html",
          controller:"contact"
        })
        .state ('wachtwoordvergeten', {
          url: "/wachtwoordvergeten",
          templateUrl:"/site/view/account/wachtwoordvergeten.html",
          controller:"wachtwoordvergetenCtl"
        })
        .state ('wachtwoordinstellen', {
          url: "/resetpassword/:token",
          templateUrl:"/site/view/account/wachtwoordinstellen.html",
          controller:"wachtwoordvergetenCtl"
        })
        .state ('nieuwsbrief', {
          url: "/nieuwsbrief",
          templateUrl:"/site/view/overig/nieuwsbrief.html",
        })
        .state ('404zoeken', {
          url: "/404zoeken",
          templateUrl:"/site/view/overig/404zoeken.html",
        })
        .state ('dierenbescherming', {
          url: "/dierenbescherming",
          templateUrl: "/site/frontpage.html",
          controller: function($state){
            // $state.go('goededoelen-display({goededoel: '1001'})');
            $state.go('registratiegoeddoel', { goeddoel: '1016' });
          }
        })
        .state ('accountConfirm', {
          url: "/confirm/:token",
          templateUrl:"/site/view/account/accountConfirm.html",
          controller:"accountConfirmCtl"
        })


}]);
myapp.config(['$httpProvider',function($httpProvider) {
  $httpProvider.defaults.withCredentials = true;


  }
]);
