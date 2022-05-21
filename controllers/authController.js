const User = require('../models/userModel');

module.exports.register = async (req, res) => {
    console.log('register request sent');
    const { username, password } = req.body;
    const user = new User({ username });
    const registeredUser = await User.register(user, password);
    req.login(registeredUser, err => {
        if (err) return next(err);
        let redir = { redirect: "/" };
        return res.json(redir);
    })
}

module.exports.getUser = (req, res) => {
    console.log(req.user); // this doesn't even run when client is in prod
    console.log('getUser request sent');
    if (req.user) {
        return res.json(req.user);
    }
    console.log('no user logged in');
    return res.json(null);
}

module.exports.logout = (req, res) => {
    console.log('logout request sent');
    let redirect = '/';
    if (req.user) {
        req.logout();
        return res.redirect(redirect);
    }
    return res.status(400).send({ redirect, messages: 'No user logged in' });
}