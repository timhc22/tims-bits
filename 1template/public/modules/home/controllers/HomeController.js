home.controller('HomeController', ['$scope',
    function ($scope) {
        $scope.items = [
            {
                name: 'One',
                snippet: 'here1'
            }, {
                name: 'Two',
                snippet: 'here2'
            }, {
                name: 'Three',
                snippet: 'here3'
            }
        ];
    }
]);