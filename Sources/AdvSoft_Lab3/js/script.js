var myApp = angular.module('myApp', ['ngRoute', 'ngAnimate']);


myApp.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'login.html',
            controller: 'loginController'
        })
        .when('/home', {
            templateUrl: 'home.html',
            controller: 'homeController'
        });
});

myApp.controller('loginController', ['$scope',function($scope) {
    $scope.pageClass = 'login';
    $scope.gmail ={
        username:"",
        email:""
    };
    $scope.onGoogleLogin = function () {
        var params = {
            'clientid': '155306587727-mfg5s20o2279i4sn1q92p3eccgrl9rqm.apps.googleusercontent.com',
            'cookiepolicy': 'single_host_origin',
            'callback': function (result) {
                if(result['status']['signed_in']){
                    var request = gapi.client.plus.people.get(
                        {
                            'userId': 'me'
                        }
                    );
                    request.execute(function (resp) {
                       $scope.$apply(function () {
                           $scope.gmail.username = resp.displayName;
                           $scope.gmail.email =resp.emails[0].value;
                       });
                    });
                }
            },
            'approvalprompt':'force',
            'scope': 'https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/plus.profile.emails.read'

        };
        gapi.auth.signIn(params);

    }
}]);

myApp.controller('homeController', ['$scope', function($scope) {
    $scope.pageClass = 'home';
}]);