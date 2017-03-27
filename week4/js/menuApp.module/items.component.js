//Create items.component.js file and create a component called items that shows all of the menu items for a particular category.

//categories.component.js
//Create categories.component.js file and create component called categories that shows all available categories in the menu to the user.

(function () {
'use strict';

angular.module('MenuApp')
.controller('ItemController', ItemController)
.component('item', {
  templateUrl: 'components/itemCategories.html',
  //controller: ItemController,
  bindings: {
    items: '<'
  }
});

/*ItemController.$inject = ['MenuDataService', '$stateParams'];
function ItemController(MenuDataService, $stateParams) {
  var $ctrl = this;
  	$ctrl.hi ="ffff";
	MenuDataService.getItemsForCategory({categoryShortName: $stateParams.categoryShortName}).then(function(dataResponse) {
	    $ctrl.items = dataResponse;
	});*/
ItemController.$inject = ['items'];	
function ItemController(items) {
  var $ctrl = this;
  	$ctrl.items = items;
};	


})();

