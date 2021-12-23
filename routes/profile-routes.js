const router = require('express').Router();

const authCheck = (req, res, next) => { //function middleware that redirects user if not logged in
    if (!req.user) {
        // not logged in
        res.redirect('/auth/login');
    } else {
        // if logged in
        next();
    }
}

router.get('/', authCheck, (req, res) => {
    res.render('profile', { user: req.user }); //passing the user from the mongo database
});

module.exports = router;