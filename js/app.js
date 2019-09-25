angular.module('app', ['ui.router', 'ngMaterial', 'ngMessages', 'ngAnimate', 'LocalStorageModule'])

    .config(function (localStorageServiceProvider, $stateProvider, $urlRouterProvider, $mdThemingProvider) {

        localStorageServiceProvider.setPrefix('userEdoc'); //เซ็ตค่าตัวแบ่งของ localstorage

        $mdThemingProvider.theme('default')
            .primaryPalette('deep-purple');

        $mdThemingProvider.theme('sidenav')
            .backgroundPalette('deep-purple')
            .dark();

        $stateProvider
            .state('LOGIN', {
                url: '/login',
                templateUrl: 'views/LOGIN.html',
                controller: 'LoginCtrl',
            })
            .state('MAIN', {
                url: '/main',
                templateUrl: 'views/MAIN.html',
                controller: 'MainCtrl',
            })
            .state('MAIN.EDOC', {
                url: '/edoc',
                templateUrl: 'views/MAIN.EDOC.html',
            })
            .state('logout', {
                url: '/logout',
                onEnter: function (UserService) {
                    UserService.logout();
                },
                controller: function ($state) {
                    $state.go('LOGIN');
                }
            })
        $urlRouterProvider.otherwise('/login'); // otherwise เรียกจาก url
    })
    .run(function (UserService) {
        UserService.load();
    });