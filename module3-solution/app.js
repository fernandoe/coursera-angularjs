(function () {
  'use strict';

  angular.module('NarrowItDownApp', [])
    .controller('NarrowItDownController', NarrowItDownController)
    .service('MenuSearchService', MenuSearchService)
    .directive('foundItems', FoundItemsDirective);

  NarrowItDownController.$inject = ['MenuSearchService'];
  function NarrowItDownController(MenuSearchService) {
    var narrowItDown = this;
    narrowItDown.found = undefined;

    narrowItDown.removeItem = function (index) {
      narrowItDown.found.splice(index, 1);
    };

    narrowItDown.search = function () {
      if (narrowItDown.searchTerm === undefined || narrowItDown.searchTerm.trim().length === 0) {
        narrowItDown.found = [];
      } else {
        MenuSearchService.getMatchedMenuItems(narrowItDown.searchTerm)
          .then(function (response) {
            narrowItDown.found = response;
          });
      }
    };
  }

  MenuSearchService.$inject = ['$http', '$q'];
  function MenuSearchService($http, $q) {
    var service = this;

    service.getMatchedMenuItems = function (searchTerm) {
      var deferred = $q.defer();

      $http.get('https://davids-restaurant.herokuapp.com/menu_items.json')
        .then(function (result) {
          var items = result.data.menu_items.filter(function (item) {
            return item.description.indexOf(searchTerm) !== -1;
          });

          deferred.resolve(items);
        })
        .catch(function (error) {
          deferred.reject(error);
        });

      return $q.when(deferred.promise);
    };

  }

  function FoundItemsDirective() {
    var ddo = {
      templateUrl: 'found-items.html',
      scope: {
        items: '<',
        onRemove: '&'
      }
    };

    return ddo;
  }

})();
