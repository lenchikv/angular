(function () {
'use strict';

var shoppingList = [
  {
    name: "Bread",
    quantity: "2"
  },
  {
    name: "Sugar",
    quantity: "200"
  },
  {
    name: "Honey",
    quantity: "5"
  },
  {
    name: "Chocolate",
    quantity: "5"
  },
  {
    name: "Cookies",
    quantity: "5"
  }
];

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController )
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController (ShoppingListCheckOffService ) {
  var buy = this;
  buy.items = ShoppingListCheckOffService.getItems(1);
  buy.buyItem = function (itemIndex) {
    ShoppingListCheckOffService.buyItem(itemIndex);
 }
}

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController  (ShoppingListCheckOffService ) {
  var bought = this;
  bought.items = ShoppingListCheckOffService.getItems(2);
}

function ShoppingListCheckOffService () {
  var service = this;

  // List of shopping items
  var toBuy = shoppingList,
      alreadyBought = [],
      idndx= 1;

  service.buyItem = function (itemIndex) {
    alreadyBought.push(toBuy[itemIndex]);
    toBuy.splice(itemIndex,1);
  };

  service.getItems = function (param) {
    if (param == 1) 
      return toBuy;
    else 
      return alreadyBought;
  };
}

})();


