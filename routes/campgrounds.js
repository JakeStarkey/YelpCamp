const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync');
const Campground = require('../models/campground');
const {campgroundSchema} = require('../schemas.js');
const {isLoggedIn} = require('../middleware.js')

const expressError = require('../utils/expressError');
const validateCampground = (req,res,next)=>{
    const {error} = campgroundSchema.validate(req.body);
    if(error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new expressError(400, msg)
    } else {
        next()
    }
};

router.get('/', wrapAsync(async (req,res) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', {campgrounds})
}))

router.get('/new', isLoggedIn, (req,res) =>{
    res.render('campgrounds/new')
})

router.post('/', isLoggedIn, validateCampground, wrapAsync(async (req,res,next)=>{
    const campground = new Campground(req.body.campground);
    await campground.save();
    req.flash('success', 'Campground created');
    res.redirect(`/campgrounds/${campground._id}`)
}))

router.get('/:id', wrapAsync(async (req,res) => {
    const campground = await Campground.findById(req.params.id).populate('reviews');
    if(!campground) {
        req.flash('error', 'That campground does not exist');
        return res.redirect('/campgrounds');
    }
    res.render('campgrounds/show', {campground})
}))

router.get('/:id/edit', isLoggedIn, wrapAsync(async (req,res)=>{
    const campground = await Campground.findById(req.params.id);
    if(!campground) {
        req.flash('error', 'That campground does not exist');
        return res.redirect('/campgrounds');
    }
    res.render('campgrounds/edit', {campground})
}))

router.put('/:id', isLoggedIn, validateCampground, wrapAsync(async (req,res)=>{
    const {id} = req.params
    const campground = await Campground.findByIdAndUpdate(id, {...req.body.campground});
    req.flash('success', 'Updated campground');
    res.redirect(`/campgrounds/${campground._id}`)
}))

router.delete('/:id', wrapAsync(async (req,res)=>{
    const {id, title} = req.params;
    await Campground.findByIdAndDelete(id);
    req.flash('success', 'Campground deleted');
    res.redirect('/campgrounds');
}))

module.exports = router;