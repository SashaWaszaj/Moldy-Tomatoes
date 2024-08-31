const express = require('express');
const movieController = require('../Controllers/Movie.controller');

const movieRoutes = express.Router();

movieRoutes.post('/movie/create', movieController.createMovie);
movieRoutes.get('/movie', movieController.getAllMovies);
movieRoutes.delete('/movie/delete/:id', movieController.deleteMovie);
movieRoutes.put('/movie/add/review/:id', movieController.addReview);
movieRoutes.get('/movie/:id', movieController.getMovieById);

module.exports = movieRoutes;
