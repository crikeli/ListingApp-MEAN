// These are the dependencies of listing.js

var mongoose = require('mongoose');
var Listing = require('../models/listing');

//App routes
module.exports = function() {
    return {
        // The following is the getAll route that will retrieve all users
        getAll: function(req, res) {
            // We first query the database, and if we don not encounter any errors
            // we return the listings.
            var query = Listing.find({});
            query.exec(function(err, listings) {
                if (err) res.send(err);
                // If there are no errors, we send the retrieved objects to the user
                res.json(listings);
            });
        },
        // The following is the Post route that will save a new listing to the DB
        post: function(req, res) {
            // This creates a new listing
            var newListing = new Listing(req.body);
            // We then save it to the DB
            newListing.save(function(err) {
                if (err) res.send(err);
                // If no errors are found return the posted listing back to the client
                res.json(req.body);
            });
        },
        // The following gets a single listing based on its id
        getOne: function(req, res) {
            Listing.findById(req.params.id, function(err, listing) {
                if (err) res.send(err);
                //If no errors, send it back to the client
                res.json(listing);
            });
        }
    }
};