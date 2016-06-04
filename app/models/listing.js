// Dependencies of the Model

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Defines the Listing schema
var ListingSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },

    // The picture and morePictures fields are defined as mixed
    // That is because when images are uploaded to file-stack, once a
    // picture gets uploaded, an object with many different properties is returned

    picture: {
        type: Schema.Types.Mixed,
        required: true
    },
    morePictures: Schema.Types.Mixed,
    createdAt: {
        type: Date,
        default: Date.now
    },
});

// Now we set the createdAt parameter to be equal to current time
ListingSchema.pre('save', function(next) {
    now = new Date();
    if (!this.createdAt) {
        this.createdAt = now;
    }
    next();
});

// The following code exports the ListingSchema for use somewhere else.
module.exports = mongoose.model('listing', ListingSchema);