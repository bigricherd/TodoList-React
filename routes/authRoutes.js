const express = require('express');
const router = express.Router();
const auth = require('../controllers/authController');
const passport = require('passport');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');

router.post('/register', catchAsync(auth.register));

router.post('/login', function (req, res, next) {
    passport.authenticate('local', function (err, user, info) {
        if (err) {
            console.log(err);
            return res.status(401).send({ messages: err }); // will generate a 500 error
        }
        // Generate a JSON response reflecting authentication status
        if (!user) {
            var redirect = { redirect: "/login" };
            return res.status(403).send({ redirect, messages: 'Invalid credentials, please try again' });
        }
        req.login(user, loginErr => {
            if (loginErr) {
                console.log('loginErr');
                return next(loginErr);
            }
            var redir = { redirect: "/" };
            return res.json(redir);
        });
    })
        (req, res, next);
});

router.get('/user', auth.getUser);

router.post('/logout', auth.logout);

module.exports = router;