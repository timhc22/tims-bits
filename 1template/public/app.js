var app = angular.module('app', ['ui.router', 'ng.deviceDetector', 'home']);

app.config(['$httpProvider', '$locationProvider', '$urlMatcherFactoryProvider', '$stateProvider',
    function ($httpProvider, $locationProvider, $urlMatcherFactoryProvider, $stateProvider) {
        $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
        $locationProvider.html5Mode(true);
        $urlMatcherFactoryProvider.strictMode(false);

        var templateUrl = '/views/';

        $stateProvider
            .state('layout', {
                abstract: true,
                controller: 'DefaultController',
                resolve: {},
                templateUrl: templateUrl + 'layout.html',
                url: ''
            })
            .state('default', {
                abstract: true,
                parent: 'layout',
                url: '',
                views: {
                    'nav': {
                        // controller: 'NavController',
                        templateUrl: templateUrl + 'nav.html'
                    },
                    'footer': {
                        templateUrl: templateUrl + 'footer.html'
                    }
                }
            })
    }
]);

app.run(['$window', '$location', '$rootScope', '$state', '$stateParams',
    function ($window, $location, $rootScope, $state) {
        $rootScope.$state = $state;
        $rootScope.previousStateName = null;
        $rootScope.previousStateParams = null;

        $rootScope.$on('$stateChangeSuccess', function(e, toState, toParams, fromState, fromParams) {
            $rootScope.bodyClass = toState.name.replace(/\./g, '-');
            console.log($rootScope.bodyClass);
            $rootScope.extraClass = toState.data.class;
            $rootScope.previousStateName = fromState.name;
            $rootScope.previousStateParams = fromParams;

            if (toState.data && toState.data.sector) {
                $rootScope.sector = toState.data.sector;
            } else {
                $rootScope.sector = null;
            }

            if (toState.data && toState.data.title) {
                $rootScope.title = toState.data.title;
            } else {
                $rootScope.title = null;
            }

            // Trigger pageview on ui-router $stateChangeSuccess event
            // $window.ga('send', 'pageview', { page: $location.url() });
        });

        $rootScope.$on('401', function () {
            $state.go('home');
        });

        $rootScope.$on('404', function () {
            $state.go('home');
        });
    }
]);

app.controller('DefaultController', ['$rootScope',
    function ($rootScope) {
        $rootScope.copyrightYear = moment().format('YYYY');
    }
]);


var home = angular.module('home', []).config(['$stateProvider', function($stateProvider) {
    var templateUrl = '/views/';
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