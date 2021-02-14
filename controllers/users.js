const User = require('../models/user');

module.exports = {
    renderRegister: (req,res)=>{
        res.render('users/register')
    },
    register: async(req,res)=>{
        try{
            const{email, username, password} = req.body;
            const user = new User({email, username});
            const registerUser = await User.register(user, password);
            req.login(registerUser, err =>{
                if(err) return next(err);
                req.flash('success','Welcome to Yelp Camp');
                res.redirect('/campgrounds');
            })
        } catch(e) {
            req.flash('error', e.message);
            res.redirect('/register')
        }
    },
    renderLogin: (req,res)=>{
        res.render('users/login')
    },
    login: (req, res) => {
        req.flash('success', 'welcome back!');
        const redirectUrl = req.session.returnTo || '/campgrounds';
        delete req.session.returnTo;
        res.redirect(redirectUrl);
    },
    logout: (req,res) =>{
        req.logout();
        req.flash('success', 'Logged out');
        res.redirect('/campgrounds');
    }
}