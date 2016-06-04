// File that controls/declares angular and modules.

// The ngRoute module helps in switching views within the app
// angular-filepicker module handles the connection with the fileStack service.

var app = angular.module('listingApp', ['addListingCtrl', 'galleryCtrl', 'detailCtrl', 'ngRoute', 'angular-filepicker'])
    .config(function($routeProvider, filepickerProvider) {
        //The route provider handles the client request to switch route
        $routeProvider.when('/addListing', {
            templateUrl: 'partials/addListing.html',
            controller: 'addListingController'
        })
            .when('/gallery', {
                templateUrl: 'partials/gallery.html',
                controller: 'galleryController'
            })
            .when('/detail/:id', {
                templateUrl: 'partials/detail.html',
                controller: 'detailController'
            })
        //Redirect to addListing in all the other cases.
        .otherwise({
            redirectTo: '/addListing'
        });
        //Add the API key to use filestack service
        filepickerProvider.setKey('Ad1CUjDBHRH2pZsnhQMEZz');
    });