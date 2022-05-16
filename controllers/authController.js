const User = require('../models/userModel');

module.exports.register = async (req, res) => {
    const { username, password } = req.body;
    const user = new User({ username });
    const registeredUser = await User.register(user, password);
    req.login(registeredUser, err => {
        if (err) return next(err);
        let redir = { redirect: "/" };
        return res.json(redir);
        // return res.end('successful login, now redirect to home');
    })
    // return res.redirect('/');
}

module.exports.login = (req, res) => {
    // const redirectUrl = req.session.returnTo || '/';
    // delete req.session.returnTo;
    return res.redirect('/');
}

module.exports.getUser = (req, res) => {
    //console.log(req.user);
    if (req.user) {
        return res.end(JSON.stringify(req.user));
    }
    return res.json(null);
}

module.exports.logout = (req, res) => {
    let redirect = '/';
    if (req.user) {
        const username = req.user.username;
        req.logout();
        return res.redirect(redirect);
    }
    return res.status(400).send({ redirect, messages: 'No user logged in' });
}