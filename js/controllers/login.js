angular.module('app')
    .controller('LoginCtrl', function ($scope, $http, UserService, $state) {

        if (UserService.isLoggedIn()) {
            $state.go('MAIN.EDOC');
        }

        $scope.isLoading = false;
        $scope.user = {
            Username: null,
            Password: null,
        };

        $scope.hasError = false;
        $scope.errorMsg = '';

        $scope.login = function (user) {
            $scope.isLoading = true;
            $scope.hasError = false;
            $http({
                    url: 'https://app.rmutp.ac.th/mobilews/login/getLogindata',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
                    },
                    method: 'POST',
                    data: user,
                })
                .then(
                    function (res) {
                        $scope.isLoading = false;
                        // console.log(res.data);                       
                        if (res.data.status == 'OK') {
                            $scope.hasError = false;

                            // เรียกหน้า Service
                            UserService.info = {
                                Username: user.Username
                            };
                            UserService.save();
                            $state.go('MAIN.EDOC');

                        } else {
                            $scope.hasError = true;
                            $scope.errorMsg = res.data.msg;
                        }
                    },
                    function (error) {
                        $scope.isLoading = false;
                        console.log(error);
                    }
                );

        }
    })