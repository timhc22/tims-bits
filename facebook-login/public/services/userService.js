app.factory('userService', [function() {
    return {
        get: function () {
            return 'Tim';
        },
        isLogged: false,
        username: ''
    };
}]);