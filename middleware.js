const {campgroundSchema, reviewSchema} = require('./schemas.js');
const expressError = require('./utils/expressError');
const Campground = require('./models/campground');
const Review = require('./models/review');

module.exports = {
    isLoggedIn: (req,res,next)=>{
        if(!req.isAuthenticated()){
            req.session.returnTo = req.originalUrl
            req.flash('error', 'You must be logged in to create new campgrounds')
            return res.redirect('/login');
        }
        next();
    },

    isAuthor: async(req,res,next)=>{
        const {id} = req.params;
        const campground = await Campground.findById(id);
        if (!campground.author.equals(req.user._id)){
            req.flash('error', 'You do not own this campground');
            return res.redirect(`/campgrounds/${id}`);
        }
        next();
    },

    validateCampground: (req,res,next)=>{
        const {error} = campgroundSchema.validate(req.body);
        if(error) {
            const msg = error.details.map(el => el.message).join(',');
            throw new expressError(400, msg)
        } else {
            next()
        }
    },

    validateReview: (req,res,next)=>{
        const {error} = reviewSchema.validate(req.body);
        if(error) {
            const msg = error.details.map(el => el.message).join(',');
            throw new expressError(400, msg)
        } else {
            next()
        }
    },

    isReviewAuthor: async(req,res,next)=>{
        const {reviewId} = req.params;
        const review = await Review.findById(reviewId);
        if (!review.author.equals(req.user._id)){
            req.flash('error', 'You did not create that review');
            return res.redirect(`/campgrounds/${id}`);
        }
        next();
    },
}
