// This controller file takes care of all the data inserted by the user
// And then sends it over to the server. It also handles the file uploads
// Using the 2 methods: upload() & uploadMultiple().

var addCtrl = angular.module('addListingCtrl', []);
addCtrl.controller('addListingController', function($scope, $http, filepickerService) {
    $scope.listing = {};
    // The newly created listing is sent to the server so that it can then get saved to the DB.
    // it uses the $http servece
    $scope.createlisting = function() {
        $http.post('/listing', $scope.listing)
            .success(function(data) {
                console.log(JSON.stringify(data));
                //Clean the form to allow the user to create new listinges
                $scope.listing = {};
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
    // The features for a file upload are declared here
    $scope.upload = function() {
        // The filepickerService allows for the calling of the "pick function"
        filepickerService.pick({
                // Type of image
                mimetype: 'image/*',
                // Language displayed by filestack window
                language: 'en',
                // Choice of the source of uploading the image
                services: ['COMPUTER', 'DROPBOX', 'GOOGLE_DRIVE', 'IMAGE_SEARCH', 'FACEBOOK', 'INSTAGRAM'],
                // We can choose which source we should open the location of the image upload
                openTo: 'IMAGE_SEARCH'
            },
            function(Blob) {
                console.log(JSON.stringify(Blob));
                $scope.listing.picture = Blob;
                // Updates the $scope and view by showing the thumbnail of the uploaded pic
                $scope.$apply();
            }
        );
    };
    //Multiple files upload set to 3 as max number
    $scope.uploadMultiple = function() {
        filepickerService.pickMultiple({
                mimetype: 'image/*',
                language: 'en',
                maxFiles: 3,
                services: ['COMPUTER', 'DROPBOX', 'GOOGLE_DRIVE', 'IMAGE_SEARCH', 'FACEBOOK', 'INSTAGRAM'],
                openTo: 'IMAGE_SEARCH'
            },
            function(Blob) {
                console.log(JSON.stringify(Blob));
                $scope.listing.morePictures = Blob;
                $scope.$apply();
            }
        );
    };
});