const mongoose = require('mongoose');
const { reviewSchema } = require ('./Review.Model')

const movieSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please insert the name of the movie.'],
        minLength: [3, 'Please use at least 3 letters for the title.']
    },
    image: {
        type: String,
        required: [false],
    },
    description:{
        type: String,
        required: [true, 'Please insert the description of the movie.'],
    },
    trailerURL:{
        type: String,
        required: [true],
    },
    review: [ reviewSchema ]
}, { timestamps: true });

const Movie = mongoose.model ("Movie", movieSchema);

module.exports = Movie;