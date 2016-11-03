(function () {

'use strict';

angular.module('LunchCheck', [])
    .controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope', '$filter'];
function LunchCheckController($scope) {

    $scope.checkIt = function() {

        if (!$scope.lunchMenu) {
            $scope.color = 'red';
            $scope.message = 'Please enter data first';

        } else {
            $scope.color = 'green';

            var items = $scope.lunchMenu.split(',');
            items = items.filter(function(item) {
                return !!item.trim();
            });

            if (items.length <= 3) {
                $scope.message = 'Enjoy!';
            } else {
                $scope.message = 'Too much!';
            }            
        }
    };
}

})();
