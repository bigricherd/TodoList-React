const express = require('express');
const router = express.Router();
const auth = require('../controllers/authController');
const passport = require('passport');
const catchAsync = require('../utils/catchAsync');

router.post('/register', catchAsync(auth.register));

router.post('/login', function (req, res, next) {
    passport.authenticate('local', function (err, user, info) {
        if (err) {
            return res.status(401).send({ messages: err }); // will generate a 500 error
        }

        // Generate a JSON response reflecting authentication status
        if (!user) {
            return res.status(403).send({ messages: 'Invalid credentials, please try again.' });
        }
        req.login(user, loginErr => {
            if (loginErr) {
                return next(loginErr);
            }
            let redir = { redirect: "/" };
            return res.json(redir);
        });
    })
        (req, res, next);
});

router.get('/getUser', auth.getUser);

router.post('/logout', auth.logout);

module.exports = router;