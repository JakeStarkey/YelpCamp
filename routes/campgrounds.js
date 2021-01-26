const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync');
const {isLoggedIn, validateCampground, isAuthor} = require('../middleware.js')
const campgrounds = require('../controllers/campgrounds');

router.route('/')
    .get(wrapAsync(campgrounds.index))
    .post(isLoggedIn, validateCampground, wrapAsync(campgrounds.createCampground));

router.get('/new', isLoggedIn, campgrounds.renderNewForm)

router.route('/:id')
    .get(wrapAsync(campgrounds.showCampground))
    .put(isLoggedIn, isAuthor, validateCampground, wrapAsync(campgrounds.updateCampground))
    .delete(isAuthor, wrapAsync(campgrounds.deleteCampground));

router.get('/:id/edit', isLoggedIn, isAuthor, wrapAsync(campgrounds.renderEditForm))

module.exports = router;


// router.post('/', isLoggedIn, validateCampground, wrapAsync(campgrounds.createCampground))
// router.put('/:id', isLoggedIn, isAuthor, validateCampground, wrapAsync(campgrounds.updateCampground))
// router.get('/', wrapAsync(campgrounds.index));
// router.delete('/:id', isAuthor, wrapAsync(campgrounds.deleteCampground))