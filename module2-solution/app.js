(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
  .controller('ToBuyController', ToBuyController)
  .controller('AlreadyBoughtController', AlreadyBoughtController)
  .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var toBuy = this;
  toBuy.items = ShoppingListCheckOffService.getToBuyItems();

  toBuy.bought = function (index) {
    ShoppingListCheckOffService.buyItem(index);
  };
}

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var bought = this;
  bought.items = ShoppingListCheckOffService.getBought();
}

ShoppingListCheckOffService.$inject = [];
function ShoppingListCheckOffService() {
  var service = this;

  service.toBuy = [
    { name: 'Milk', quantity: 1 },
    { name: 'Cookies', quantity: 2 },
    { name: 'Donuts', quantity: 3 },
    { name: 'Fishes', quantity: 4 },
    { name: 'Cakes', quantity: 5 },
  ];

  service.bought = [];

  service.getToBuyItems = function () {
    return service.toBuy;
  };

  service.getBought = function () {
    return service.bought;
  };

  service.buyItem = function (index) {
    service.bought.push(service.toBuy[index]);
    service.toBuy.splice(index, 1);
  };
}

})();
