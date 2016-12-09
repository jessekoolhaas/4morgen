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

  dataFactory.authlogin = function (data) {
    return $http({
        url: $rootScope.authLogin,
        method: 'POST',
        data: data,
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

  dataFactory.PutFavoriteCharitie = function (data) {
    return $http({
        url: $rootScope.goededoelenToevoegenFav,
        method: 'PUT',
        data: data,
        headers: {'Content-type': 'application/json'}
    });
  };

  dataFactory.PutFavoriteShop = function (data) {
    return $http({
        url: $rootScope.winkelToevoegenFav,
        method: 'PUT',
        data: data,
        headers: {'Content-type': 'application/json'}
    });
  };


  dataFactory.GetGoededoelendisplay = function (data) {
    var url = $rootScope.goededoelenDisplay.replace("{charityId}", data)
  return $http.get(url);
  };


  dataFactory.Logout = function () {
    return $http({
        url: $rootScope.authLogout,
        method: 'POST',
        headers: {'Content-type': 'application/json'}
    });
  };

  dataFactory.Donaties = function(){
    return $http({
        url: $rootScope.donaties,
        method: 'GET',
        headers: {'Content-type': 'application/json'}
    });
  }



return dataFactory;
}]);
