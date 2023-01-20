module.exports = (err, req, res, next) => {
    try {
        if (err.name === 'UserExistsError') return err = handleUserExistsError(err, res);
        if (err.name === 'MissingUsernameError') return err = handleMissingUsernameError(err, res);
        if (err.name === 'MissingPasswordError') return err = handleMissingPasswordError(err, res);
        if (err.name === 'ValidationError') return err = handleValidationError(err, res);
        return next(err);
    }
    catch (err) {
        return res
            .status(500)
            .send('An unknown error occurred.');
    }

}

const handleUserExistsError = (err, res) => {
    const error = 'That username is taken, please choose a different one.';
    return res.status(409).send({ messages: error });
}

const handleMissingUsernameError = (err, res) => {
    const error = 'Username cannot be empty';
    return res.status(409).send({ messages: error });
}

const handleMissingPasswordError = (err, res) => {
    const error = 'Password cannot be empty';
    return res.status(409).send({ messages: error });
}

const handleValidationError = (err, res) => {
    let errors = Object.values(err.errors).map(el => el.message);
    let fields = Object.values(err.errors).map(el => el.path);
    let code = 400;
    if (errors.length > 1) {
        const formattedErrors = errors.join('');
        return res
            .status(code)
            .send({ messages: formattedErrors, fields: fields });
    } else {
        return res
            .status(code)
            .send({ messages: errors, fields: fields });
    }
}