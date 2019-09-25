angular.module('app')

    .controller('MainCtrl', function (UserService, $state) {

        if (!UserService.isLoggedIn()) {
            $state.go('LOGIN');
        }



    })