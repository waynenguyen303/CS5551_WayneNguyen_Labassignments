var myApp = angular.module('myApp', ['ngRoute', 'ngAnimate']);

$(document).ready(function(){
    $("#navbar-frame").load("navbar.html");
    localStorage.setItem('lang','en');
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
                           document.getElementById('status').innerHTML = resp.displayName;
                           localStorage.setItem('gmail_username',resp.displayName);
                           $scope.gmail.email = resp.emails[0].value;
                           localStorage.setItem('gmail_email',resp.emails[0].value);
                           $scope.g_image = resp.image.url;
                           document.getElementById('profileImage').innerHTML = "<img src='"+resp.image.url+"'width='45px' height='30px'>'";
                           localStorage.setItem('gmail_image',resp.image.url);
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
    $scope.onFBLogin = function () {
        FB.login(function (response) {
            if(response.authResponse){
                FB.api('/me','GET',{fields:'email, first_name, name, id, picture.width(45).height(30)'}, function (response){
                    $scope.$apply(function () {
                        $scope.facebook.username = response.name;
                        document.getElementById('status').innerHTML = response.name;
                        localStorage.setItem('facebook_username',response.name);
                        $scope.facebook.email = response.email;
                        localStorage.setItem('facebook_email',response.email);
                        $scope.facebook_image = response.picture.data.url;
                        document.getElementById('profileImage').innerHTML = "<img src='"+response.picture.data.url +"'>'";
                        localStorage.setItem('facebook_image',response.picture.data.url);
                        $window.location.href = 'http://localhost:63342/AdvSoft_Lab3/#/home';
                    });
                });
            }else{//show message error
            }
        },{
            $scope:'email, id, user_likes',
            return_scopes: true
        });
    }
}]);

myApp.controller('homeController', ['$rootScope','$scope', '$http','$filter', function($rootScope, $scope, $http, $filter) {

    $scope.pageClass = 'home';
    $scope.youtubeData = [];
    $scope.youtubeSearchText = "";
    $scope.translatedText = "";
    $scope.nowLanguage = 'en';
    $scope.getYoutubeData = function(searchText){
        $http.get('https://www.googleapis.com/youtube/v3/search', {
            params: {
                key: "AIzaSyATBETmTE2XR54hf6mMdzJ60U9_Himty_A",
                type: 'video',
                maxResults: '10',
                part: 'id,snippet',
                fields: 'items/id,items/snippet/title,items/snippet/description,items/snippet/thumbnails/default,items/snippet/channelTitle,nextPageToken,prevPageToken',
                q: searchText
            }
        }).success( function (data) {
            if (data.items.length === 0) {
                $scope.youtubeData = 'No results were found!';
            }
            $scope.youtubeSearchText = searchText;
            $scope.youtubeData = data.items;
            $scope.nowLanguage = localStorage.getItem('lang');

            $scope.transText(searchText,$scope.nowLanguage).then(function (response) {
                $scope.translatedText = response.data.text[0];
            });

            angular.forEach(data.items, function (titledata) {
                $scope.transText(titledata.snippet.title,$scope.nowLanguage).then(function (response) {
                    titledata.snippet.title = response.data.text[0];
                });
                $scope.transText(titledata.snippet.description,$scope.nowLanguage).then(function (response) {
                    titledata.snippet.description = response.data.text[0];
                });
            });
        });
    };

    $scope.checkDataLength = function(data){
        return (data.length >=1);
    };

    $scope.transText = function (searchText, language) {
        return $http({
            method: 'GET',
            url: 'https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20170913T034651Z.489eb6aa12589e99.525b452bb54efb9faac7e0307e28d7d024576cf1&text=' + searchText + '&lang=' + language
        }).then(function(response) {
            return response;
        }, function(error){
            console.log(error);
            return error.statusText;
        });
    };
}]);



myApp.controller('navbarController', ['$rootScope','$scope', function($rootScope, $scope) {

    $scope.pageClass = 'navbar';
}]);

myApp.controller('registerController', ['$scope', function($scope) {

    $scope.pageClass = 'register';
}]);