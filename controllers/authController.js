const User = require('../models/userModel');

module.exports.register = async (req, res) => {
    console.log('register request sent');
    const { username, password } = req.body;
    const user = new User({ username });
    const registeredUser = await User.register(user, password);
    req.login(registeredUser, err => {
        if (err) return next(err);
        console.log('req.user', req.user);
        req.session.user = req.user;
        let redir = { redirect: "/" };
        return res.json(redir);
    })
}

module.exports.getUser = (req, res) => {
    // console.log(req.session.user); // this doesn't even run when client is in prod
    console.log('getUser request sent');
    const data = {
        message: "No user logged in",
        user: null
    }
    if (req.session.user) {
        console.log('from getUser: ', req.session.user);
        data.message = "Successfully fetched user data";
        data.user = req.session.user || req.user;
        return res.json(data);
    }
    console.log('no user logged in');
    return res.json(data);
}

module.exports.logout = (req, res) => {
    console.log('logout request sent');
    if (req.user) {
        req.logout();
        req.session.user = req.user;
    }
    return res.redirect('/'); // simply redirects user to home page
    // return res.status(400).send({ redirect, messages: 'No user logged in' });
}