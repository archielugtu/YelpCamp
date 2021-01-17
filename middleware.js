const { campgroundSchema, reviewSchema } = require('./schemas.js'); // Joi validation schema
const ExpressError = require('./utils/ExpressError');
const Campground = require('./models/campground'); // requiring the campground model
const Review = require('./models/review');

module.exports.isLoggedIn = (req, res, next) => {
    // .isAuthenticated() comes from Passport
    if (!req.isAuthenticated()) {
        // store the url they are requesting
        req.session.returnTo = req.originalUrl;

        req.flash('error', 'You must be signed in first!');
        return res.redirect('/login');
    }
    next();
}

module.exports.validateCampground = (req, res, next) => {
    const { error } = campgroundSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400);
    } else {
        next();
    }
}

module.exports.validateReview = (req, res, next) => {
    console.log(req.body);
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400);
    } else {
        next();
    }
}


module.exports.isAuthor = async (req, res, next) => {
    const { id } = req.params; // campground id
    const campground = await Campground.findById(id);
    if (!campground.author.equals(req.user._id)) {
        req.flash('error', 'You do not have persmission to do that!');
        return res.redirect(`/campgrounds/${id}`)
    }
    next();
}

module.exports.isReviewAuthor = async (req, res, next) => {
    const { id, reviewId } = req.params; 
    const review = await Review.findById(reviewId);
    if (!review.author.equals(req.user._id)) {
        req.flash('error', 'You do not have persmission to do that!');
        return res.redirect(`/campgrounds/${id}`)
    }
    next();
}

