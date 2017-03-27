//categories.component.js
//Create categories.component.js file and create component called categories that shows all available categories in the menu to the user.

(function () {
'use strict';

angular.module('MenuApp')
.controller('ComponentController', ComponentController)
.component('component', {
  templateUrl: 'components/componentCategoriesList.html',
 // controller: ComponentController,
  bindings: {
    categories: '<'
  }
});

/*ComponentController.$inject = ['MenuDataService'];
function ComponentController(MenuDataService) {
  var $ctrl = this;
	MenuDataService.getAllCategories().then(function(dataResponse) {
	    $ctrl.categories = dataResponse;
	});
};*/
ComponentController.$inject = ['categories'];
function ComponentController(categories) {
  var $ctrl = this;
  $ctrl.categories = categories;
}


})();

