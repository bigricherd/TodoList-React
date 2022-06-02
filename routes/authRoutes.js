const express = require('express');
const router = express.Router();
const auth = require('../controllers/authController');
const passport = require('passport');
const catchAsync = require('../utils/catchAsync');

router.post('/register', catchAsync(auth.register));

router.post('/login', function (req, res, next) {
    console.log('login request sent');
    passport.authenticate('local', function (err, user, info) {
        if (err) {
            console.log(err);
            return res.status(401).send({ messages: err }); // will generate a 500 error
        }
        // Generate a JSON response reflecting authentication status
        if (!user) {
            console.log('didnt work');
            return res.status(403).send({ messages: 'Invalid credentials, please try again.' });
        }
        req.login(user, loginErr => {
            if (loginErr) {
                console.log('loginErr');
                return next(loginErr);
            }
            console.log('from req.user', req.user); // shows the logged in user here, but subsequent getUser request (post-redirect) returns undefined -- WHY?
            req.session.user = req.user; // this line works even on production, the issue is accessing it from another route
            console.log('from req.session', req.session.user)
            let redir = { redirect: "/" };
            return res.json(redir);
        });
    })
        (req, res, next);
});

router.get('/getUser', auth.getUser);

router.post('/logout', auth.logout);

module.exports = router;