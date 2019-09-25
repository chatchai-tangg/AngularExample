angular.module('app')
    //ชื่อ service
    .service('UserService', function (localStorageService) {
        var UserService = this;

        UserService.info = null;

        UserService.load = function () {
            if (localStorageService.get('user.info') != null) {
                UserService.info = localStorageService.get('user.info');
            }
        }

        UserService.save = function () {
            localStorageService.set('user.info', UserService.info);
        }

        UserService.isLoggedIn = function () {
            return (UserService.info != null);
        }

        UserService.logout = function () {
            UserService.info = null;
            localStorageService.clearAll();
        }


    })