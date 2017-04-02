(function () {
"use strict";

angular.module('common')
.service('UserService', UserService);


UserService.$inject = ['$http', 'ApiPath','$window'];
function UserService($http, ApiPath, $window) {
  var service = this;

  service.getUser = function () {
  	  var user = localStorage.getItem("User");
  	  if (user == null) return "error"
  	  else return JSON.parse(user);
  };

  service.checkFavorite = function (fav) {
  	return $http({
      method: "GET",
      url: (ApiPath + '/menu_items/' + fav.trim() +'.json')
    }).then(function (response) {
    	return response.data.short_name;
    })
    .catch(function (error) {
      console.log("Wrong data inserted");
    });
  };
    
  service.setUser = function (obj) {
      localStorage.setItem("User", JSON.stringify(obj));
  };

}

})();