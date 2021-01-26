const Campground = require('../models/campground');

module.exports = {
    index: async (req,res) => {
        const campgrounds = await Campground.find({});
        res.render('campgrounds/index', {campgrounds})
    },
    renderNewForm: (req,res) =>{
        res.render('campgrounds/new')
    },
    createCampground: async (req,res,next)=>{
        const campground = new Campground(req.body.campground);
        campground.author = req.user._id;
        await campground.save();
        req.flash('success', 'Campground created');
        res.redirect(`/campgrounds/${campground._id}`)
    },
    showCampground: async (req,res) => {
        const campground = await Campground.findById(req.params.id).populate(
            {path:'reviews',
                populate: {
                    path:'author'
                }
            }).populate('author');
        if(!campground) {
            req.flash('error', 'That campground does not exist');
            return res.redirect('/campgrounds');
        }
        res.render('campgrounds/show', {campground})
    },
    renderEditForm: async (req,res)=>{
        const campground = await Campground.findById(req.params.id);
        if(!campground) {
            req.flash('error', 'That campground does not exist');
            return res.redirect('/campgrounds');
        }
        res.render('campgrounds/edit', {campground})
    },
    updateCampground: async (req,res)=>{
        const campground = await Campground.findByIdAndUpdate(req.params.id, {...req.body.campground});
        req.flash('success', 'Updated campground');
        res.redirect(`/campgrounds/${campground._id}`)
    },
    deleteCampground: async (req,res)=>{
        await Campground.findByIdAndDelete(id);
        req.flash('success', 'Campground deleted');
        res.redirect('/campgrounds');
    }
}