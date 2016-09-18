var home = angular.module('home', []).config(['$stateProvider', function($stateProvider) {
    var templateUrl = '/modules/home/views/';
    $stateProvider
        .state('home', {
            data: {
                title: 'Home'
            },
            parent: 'default',
            url: '/',
            views: {
                '@layout': {
                    controller: 'HomeController',
                    resolve: {},
                    templateUrl: templateUrl + 'home.html'
                }
            }
        });
}]);