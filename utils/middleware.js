const Campground = require('../models/campground');
const Review = require('../models/review');
const { campgroundSchema, reviewSchema } = require('../schemas');
const ExpressError = require('../utils/ExpressError');

module.exports.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    }
    else {
        req.session.returnTo = req.originalUrl;
        req.flash('error', 'You must be signed in');
        res.redirect('/login');
    }
}

module.exports.isAuthor = async (req, res, next) => {
    const { id } = req.params;
    const campground = await Campground.findById(id);
    if (campground.author.equals(req.user._id)) next();
    else {
        req.flash('error', 'You do not have permission to do that');
        res.redirect(`/campgrounds/${id}`);
    }
}

module.exports.isReviewAuthor = async (req, res, next) => {
    const { id, reviewId } = req.params;
    const review = await Review.findById(reviewId);
    if (review.author.equals(req.user._id)) next();
    else {
        req.flash('error', 'You do not have permission to do that');
        res.redirect(`/campgrounds/${id}`);
    }
}

module.exports.validateCampground = (req, res, next) => {
    const { error } = campgroundSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(obj => obj.message).join(',');
        throw new ExpressError(msg, 400);
    }
    else next();
}

module.exports.validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(obj => obj.message).join(',');
        throw new ExpressError(msg, 400);
    }
    else next();
}