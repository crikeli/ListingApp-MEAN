var detailCtrl = angular.module('detailCtrl', []);
detailCtrl.controller('detailController', function($scope, $http, $routeParams) {
    $scope.listing = {};
    //get the id to query the db and retrieve the correct listing
    var id = $routeParams.id;
    $http.get('/listing/' + id)
        .success(function(data) {
            console.log(JSON.stringify(data));
            $scope.listing = data;
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
});