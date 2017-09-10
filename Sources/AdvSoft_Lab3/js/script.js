var myApp = angular.module('myApp', ['ngRoute', 'ngAnimate']);


myApp.config(function($routeProvider) {
    $routeProvider
        .when('/login', {
            templateUrl: 'login.html',
            controller: 'loginController as lg'
        })
        .when('/register', {
            templateUrl: 'register.html',
            controller: 'registerController'
        })
        .when('/home', {
            templateUrl: 'home.html',
            controller: 'homeController as hc'
        })
        .otherwise({
            redirectTo: '/login'
        });
});

myApp.controller('loginController', ['$rootScope', '$scope','$window',function($rootScope, $scope, $window) {
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
                           localStorage.setItem('gmail_username',resp.displayName);
                           $scope.gmail.email = resp.emails[0].value;
                           localStorage.setItem('gmail_email',resp.emails[0].value);
                           $window.location.href = 'http://localhost:63342/AdvSoft_Lab3/#/home';
                           $rootScope.$broadcast('login-event', resp);
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

myApp.controller('homeController', ['$rootScope','$scope', function($rootScope, $scope) {

    $rootScope.$on('login-event', function(event, resp){
        variable = resp.name;
        //dafafa
    })
    $scope.pageClass = 'home';
}]);

myApp.controller('registerController', ['$scope', function($scope) {
    $scope.pageClass = 'register';
}]);