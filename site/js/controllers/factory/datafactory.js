myapp.factory('dataFactory', ['$http','$rootScope' ,function($http,$rootScope) {


var dataFactory = {};

  dataFactory.getUserDonations = function (skip,top,orderby,include) {
    var urltotaal = $rootScope.donatieLijst
        .replace("{skip}", skip)
        .replace("{top}", top)
        .replace("{orderby}", orderby)
        .replace("{includeCount}", include);
           var auth = $rootScope.auth
      return $http.get(urltotaal);

  };

  dataFactory.auth = function () {
    return $http({
        url: $rootScope.auth,
        method: 'GET',
        headers: {'Content-type': 'application/json'}
    });
  };

  dataFactory.GetFavoriteCharitie = function () {
    return $http({
        url: $rootScope.goededoelenToevoegenFav,
        method: 'GET',
        headers: {'Content-type': 'application/json'}
    });
  };

  dataFactory.GetFavoriteShop = function () {
    return $http({
        url: $rootScope.winkelToevoegenFav,
        method: 'GET',
        headers: {'Content-type': 'application/json'}
    });
  };

  dataFactory.GetFavoriteShop = function () {
    return $http({
        url: $rootScope.winkelToevoegenFav,
        method: 'GET',
        headers: {'Content-type': 'application/json'}
    });
  };

  dataFactory.DeleteFavoriteCharitie = function (data) {
    return $http({
        url: $rootScope.goededoelenToevoegenFav,
        method: 'DELETE',
        data: data,
        headers: {'Content-type': 'application/json'}
    });
  };

  dataFactory.DeleteFavoriteShop = function (data) {
    return $http({
        url: $rootScope.winkelToevoegenFav,
        method: 'DELETE',
        data: data,
        headers: {'Content-type': 'application/json'}
    });
  };

  dataFactory.Logout = function () {
    return $http({
        url: $rootScope.authLogout,
        method: 'POST',
        headers: {'Content-type': 'application/json'}
    });
  };



return dataFactory;
}]);
