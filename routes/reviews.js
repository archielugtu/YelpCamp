const express = require('express');
const router = express.Router({ mergeParams: true }); // make sure mergeParams is set to true when your prefix for your routes has params (e.g. /campgrounds/:id/reviews)
const reviews = require('../controllers/reviews');
const Campground = require('../models/campground'); // requiring the campground model
const Review = require('../models/review');
const { validateReview, isLoggedIn, isReviewAuthor } = require('../middleware');
const catchAsync = require('../utils/catchAsync');

// Create a new review
router.post('/',isLoggedIn, validateReview, catchAsync(reviews.createReview));

// Delete a review
router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview))

module.exports = router;