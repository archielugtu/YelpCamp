const express = require('express');
const router = express.Router();
const campgrounds = require('../controllers/campgrounds');

const Campground = require('../models/campground'); // requiring the campground model
const { campgroundSchema } = require('../schemas.js'); // Joi validation schema
const { isLoggedIn, validateCampground, isAuthor } = require('../middleware');
const catchAsync = require('../utils/catchAsync');

const { storage } = require('../cloudinary'); // don't need to do '/index' since NODE automatically looks for a index.js file!

const multer = require('multer');
const upload = multer({ storage });

router.route('/')
    .get(
        catchAsync(campgrounds.index)) // Shows all campgrounds
    .post(
        isLoggedIn,
        upload.array('image'),
        validateCampground,
        catchAsync(campgrounds.createCampground)) // POST route for create new campground
    
router.get('/new',isLoggedIn, campgrounds.renderNewForm);  // Render form for creating new campground

router.route('/:id')
    .get(
        catchAsync(campgrounds.showCampground)) // Show one campground
    .put(
        isLoggedIn,
        isAuthor,
        upload.array('image'),
        validateCampground,
        catchAsync(campgrounds.updateCampground)) // PUT route for editing a campground
    .delete(
        isLoggedIn,
        isAuthor,
        catchAsync(campgrounds.deleteCampground)) // DELETE route for a campground

// Renders edit form of campground
router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgrounds.renderEditForm));


module.exports = router;