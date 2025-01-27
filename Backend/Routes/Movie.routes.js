const express = require('express');
const movieController = require('../Controllers/Movie.controllers');
const movieRoutes = express.Router();

movieRoutes.post('/review/create', movieController.createReview);
movieRoutes.get("/reviews/:movie_id", movieController.getReviewsByMovieId);



module.exports = movieRoutes;