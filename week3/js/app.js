(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController )
.service('MenuSearchService', MenuSearchService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
.directive('foundItems', FoundItemsDirective);


function FoundItemsDirective() {
  var ddo = {
    templateUrl: 'templates/foundItems.html',
     scope: {
      found: '<',
      myTitle: '@title',
      onRemove: '&'
    },
    controller: FoundItemsDirectiveController,
    controllerAs: 'nrwLocal',
    bindToController: true
  };

  return ddo;
}

function FoundItemsDirectiveController() {
  var nrwLocal = this;
}

NarrowItDownController.$inject = ['MenuSearchService'];
  function NarrowItDownController (MenuSearchService) {
  var nrw = this;
  nrw.title = "";

  nrw.getMenu = function (search) {
    if (search)
        MenuSearchService.getMatchedMenuItems(search).then(function(result) {
          nrw.found = result;
         if (!nrw.found || nrw.found.length == 0) nrw.title = "Found nothing"
         else nrw.title = "Found (" + nrw.found.length + " items )"
        });
  };

 nrw.onRemove = function (itemIndex) {
    console.log("Deletion:", this);
    nrw.found.splice(itemIndex, 1);
    nrw.title = "Found (" + nrw.found.length + " items )";
 };
}


MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService ($http, ApiBasePath) {
  var service = this;
   
   // List of shopping items
   service.getMatchedMenuItems = function (searchTerm) {

    return $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json")
    }).then(function (result) {
     // process result and only keep items that match
      var foundItems = [],
          data = result.data.menu_items;
      for (var item in data) {  
        if (data[item].description.toLowerCase().indexOf(searchTerm.toLowerCase()) != -1)
          foundItems.push(data[item]);
      };
      return foundItems;
    })
    .catch(function (error) {
      console.log("Something went terribly wrong.");
    });
    
  };

  
}


})();


