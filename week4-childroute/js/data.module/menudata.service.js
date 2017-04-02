//Create menudata.service.js file and create a service called MenuDataService in it. This service should be declared on the data module,
// not on the MenuApp module. The MenuDataService should have 2 methods:
//getAllCategories - this method should return a promise which is a result of using the $http service, using the following REST API endpoint:
// https://davids-restaurant.herokuapp.com/categories.json
//getItemsForCategory(categoryShortName) - this method should return a promise which is a result of using the $http service, using the 
//following REST API endpoint: https://davids-restaurant.herokuapp.com/menu_items.json?category=, where, before the call to the server,
// your code should append whatever categoryShortName value was passed in as an argument into the getItemsForCategory method.


(function () {
'use strict';

angular.module('data')
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
.service('MenuDataService', MenuDataService);

MenuDataService.$inject = ['$http', 'ApiBasePath'];
function MenuDataService($http, ApiBasePath) {
  var service = this;

  // List of all categories
   service.getAllCategories = function () {
   	return $http({
      method: "GET",
      url: (ApiBasePath + "/categories.json")
    }).then(function (result) {
     // process result and only keep items that match
      var categories = [],
        categories = result.data; 
        return categories;
    })
    .catch(function (error) {
      console.log("Something went terribly wrong with categories.");
    });
  }

   // List of shopping items getItemsForCategory(categoryShortName)
   service.getItemsForCategory = function (param) {
     return $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json"),
      params: {
        category: param.categoryShortName
      }
    }).then(function (result) {
     // process result and only keep items that match
      console.log('TRY');
       console.log(param);
      var menu_items = [],
          menu_items = result.data;
          console.log(menu_items);
      return menu_items;
    })
    .catch(function (error) {
      console.log("Something went terribly wrong with menu_items.");
    });
  }

};

})();

