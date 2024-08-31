const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please insert your name.'],
        minLength: [3, 'Please use at least 3 letters for the name.']
    },
    rating: {
        type: Number,
        required: [true, 'Please insert a rating for the movie.'],
        max: 5
    },
    oneReview: {
        type: String,
        required: [true, 'Please add a review.']
    }
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = { Review, reviewSchema };
