const mongoose = require('mongoose');
const { reviewSchema } = require ('./Review.model')

const movieSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please insert the name of the movie.'],
        minLength: [3, 'Please use at least 3 letters for the title.']
    },
    review: [ reviewSchema ]
      
});

const Movie = mongoose.model ("Movie", movieSchema);

module.exports = Movie;