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

myApp.controller('loginController', function($scope) {
    $scope.pageClass = 'login';
});

myApp.controller('homeController', function($scope) {
    $scope.pageClass = 'home';
});

