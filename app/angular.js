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






  myapp.controller('databaseCtl', function ($scope,$stateParams, MyHttpInterceptor ){
    $scope.currentCategoryName = $stateParams.Category;
  });
