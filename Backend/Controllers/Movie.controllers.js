const Review = require('../Models/Review.Model'); 

module.exports.createReview = async (req, res) => {
    try {
        const { movie_id, author, content, rating } = req.body;

        if (!movie_id || !author || !content || !rating) {
            return res.status(400).json({ error: "All fields are required." });
        }

        const newReview = new Review({
            movie_id,
            author,
            content,
            rating,
            createdAt: new Date(),
        });

        await newReview.save();

        return res.status(201).json({ message: "Review added successfully!", review: newReview });
    } catch (error) {
        console.error("Error saving review:", error);
        return res.status(500).json({ error: "Failed to save review." });
    }
};


module.exports.getReviewsByMovieId = async (req, res) => {
    const { movie_id } = req.params;

    try {
        // Find all reviews that have the specified movie_id
        const reviews = await Review.find({ movie_id });

        if (reviews.length === 0) {
            return res.status(404).json({ message: "No reviews found for this movie." });
        }

        // Return the found reviews
        res.status(200).json({ reviews });
    } catch (error) {
        console.error("Error fetching reviews:", error);
        res.status(500).json({ error: "Failed to fetch reviews." });
    }
};




