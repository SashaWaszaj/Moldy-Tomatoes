const Movie = require('../Models/Movie.model');


module.exports.createMovie = async (req, res) => {
    try {
        const newMovie = await Movie.create(req.body);
        res.status(201).json(newMovie);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports.getAllMovies = async (req, res) => {
    try {
        const movies = await Movie.find();
        res.status(200).json(movies);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports.deleteMovie = async (req, res) => {
    try {
        const movie = await Movie.findOneAndDelete({ _id: req.params.id });
        if (!movie) {
            return res.status(404).json({ message: "Movie not found." });
        }
        res.status(204).end();
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


module.exports.addReview = async (req, res) => {
    try {
        const findMovie = await Movie.findOne({ _id: req.params.id });
        if (!findMovie) {
            res.statusMessage = "Movie not found.";
            return res.status(404).json({ message: "Movie not found." });
        }
        const updatedMovie = await Movie.findOneAndUpdate(
            { _id: req.params.id },
            { $push: { review: req.body.review } },
            { new: true }
        );
        res.json(updatedMovie);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports.getMovieById = async (req, res) => {
    try {
        const foundMovie = await Movie.findOne({ _id: req.params.id });

        if (!foundMovie) {
            return res.status(404).json({ message: 'Movie not found' });
        }

        res.status(200).json(foundMovie);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};





