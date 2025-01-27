const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  movie_id: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
