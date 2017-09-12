var myApp = angular.module('myApp', ['ngRoute', 'ngAnimate']);

$(document).ready(function(){
    $("#navbar-frame").load("navbar.html");
});

$(window).scroll(function () {
    if($(document).scrollTop() >50){
        $('nav').addClass('shrink');
    }
    else{
        $('nav').removeClass('shrink');
    }
});

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
        .when('/navbar', {
            templateUrl: 'navbar.html',
            controller: 'navbarController as nc'
        })
        .otherwise({
            redirectTo: '/login'
        });
});
/*
(function () {
    angular
        .module(myApp)
        .controller()
})();*/
myApp.controller('loginController', ['$rootScope', '$scope','$window',function($rootScope, $scope, $window) {
    $scope.pageClass = 'login';
    $scope.gmail ={
        username:"",
        email:""
    };

    function broadcastlogin(parm) {
        $rootScope.$broadcast('login-event2',parm);

    }
    broadcastlogin('hi hel');

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
                           document.getElementById('status').innerHTML = resp.displayName;
                           localStorage.setItem('gmail_username',resp.displayName);
                           $scope.gmail.email = resp.emails[0].value;
                           localStorage.setItem('gmail_email',resp.emails[0].value);
                           $scope.g_image = resp.image.url;
                           document.getElementById('profileImage').innerHTML = "<img src='"+resp.image.url+"'width='45px' height='30px'>'";
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
    };
    $scope.facebook = {
        username:"",
        email:""
    };

    lc.facebook_image = null;
    lc.facebook_name = '';
    lc.facebook_email = '';

    $scope.onFBLogin = function () {
        broadcastlogin('logged in to facebook');
        FB.login(function (response) {
            if(response.authResponse){

                FB.api('/me','GET',{fields:'email, first_name, name, id, picture.width(45).height(30)'}, function (response){

                    $rootScope.$broadcast('login-event2', {name: response.name, email: response.email, pic: response.picture.data.url});
                    $scope.$apply(function () {
                        lc.facebook_name = response.name;

                        localStorage.setItem('facebook_username',response.name);
                        lc.facebook_email = response.email;
                        localStorage.setItem('facebook_email',response.email);
                        lc.facebook_image = response.picture.data.url;
                        localStorage.setItem('facebook_image',response.picture.data.url);

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
    $rootScope.$on('login-event2','lol');
    $scope.pageClass = 'home';
}]);

myApp.controller('registerController', ['$scope', function($scope) {

    $scope.pageClass = 'register';

}]);

myApp.controller('navbarController', ['$rootScope','$scope', function($rootScope, $scope) {

    lc.facebook_image = null;
    lc.facebook_name = '';
    lc.facebook_email = '';

    $rootScope.$on('login-event2',function(event) {
        console.log(event);
        lc.facebook_email  = event.email;
        lc.facebook_image = event.pic;
        lc.facebook_name = event.name;
    });
    $scope.pageClass = 'navbar';
}]);