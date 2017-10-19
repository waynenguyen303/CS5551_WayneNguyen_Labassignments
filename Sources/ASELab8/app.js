var app=angular.module("lab9app",[]);
app.controller("lab9controller",function ($scope, $http) {
    $scope.gone = function () {
        var goto=$scope.gkeyword+'&'+$scope.lang;

        console.log(goto);

        var words = $http.get("http://127.0.0.1:8081/data/"+goto);
        words.success(function (data) {
            console.log(data[0].PixabayImage);

            $scope.gresults2={
                "name":data[0].name,
                "description":data[0].description,
                "translatedDescription":data[0].translatedDescription,
                "translatedName":data[0].translatedName,
                "PixabayImage":data[0].PixabayImage
            };
        });
    }
});


function changeLanguage(text) {
    localStorage.setItem('lang',text);
}
