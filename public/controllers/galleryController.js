var galleryCtrl = angular.module('galleryCtrl', []);
galleryCtrl.controller('galleryController', function($scope, $http) {
    $scope.listings = [];
    //Retrieve all the listings to show the gallery
    $http.get('/listing')
        .success(function(data) {
            console.log(JSON.stringify(data));
            $scope.listings = data;
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

});