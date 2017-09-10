var myApp = angular.module('myApp', ['ngRoute', 'ngAnimate']);


myApp.config(function($routeProvider) {
    $routeProvider
        .when('/login', {
            templateUrl: 'login.html',
            controller: 'loginController as lc'
        })
        .when('/register', {
            templateUrl: 'register.html',
            controller: 'registerController as rc'
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
                           $scope.g_image = resp.image.url;
                           localStorage.setItem('gmail_image',resp.image.url);
                           $rootScope.$broadcast('login-event', resp);

                           $window.location.href = 'http://localhost:63342/AdvSoft_Lab3/#/home';

                       });
                    });
                }
            },
            'approvalprompt':'force',
            'scope': 'https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/plus.profile.emails.read'

        };
        gapi.auth.signIn(params);

    }

    $scope.facebook ={
        username:"",
        email:""
    };
    $scope.onFBLogin = function () {
        FB.login(function (response) {
            if(response.authResponse){

                FB.api('/me','GET',{fields:'email, first_name, name, id, picture'}, function (response){
                    $scope.$apply(function () {
                        $scope.facebook.username = response.name;
                        localStorage.setItem('facebook_username',response.name);
                        $scope.facebook.email = response.email;
                        localStorage.setItem('facebook_email',response.email);
                        $scope.facebook_image = response.picture.data.url;
                        localStorage.setItem('facebook_image',response.picture.data.url);
                        $rootScope.$broadcast('login-event', response);

                        $window.location.href = 'http://localhost:63342/AdvSoft_Lab3/#/home';

                    });

                });
            }else{

                //show message error
            }

        },  {
            $scope:'email, id, user_likes',
            return_scopes: true

        });
    }

}]);

myApp.controller('homeController', ['$rootScope','$scope', function($rootScope, $scope) {
$scope.fullname = localStorage.getItem('gmail_username').value;
    $rootScope.$on('login-event', function(event, resp){
         $scope.fullname = resp.displayName;

        //dafafa
        console.log('login-event');
    });
    $scope.pageClass = 'home';
}]);

myApp.controller('registerController', ['$scope', function($scope) {

    $scope.pageClass = 'register';
}]);