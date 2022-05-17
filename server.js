if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const session = require('express-session');
const passport = require('passport');
const path = require('path');
const LocalStrategy = require('passport-local');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoSanitize = require('express-mongo-sanitize');
const MongoStore = require('connect-mongo');

const User = require('./models/userModel');
const taskRoutes = require('./routes/taskRoutes');
const authRoutes = require('./routes/authRoutes');
const errorController = require('./controllers/errorController');

const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/todoListAuth3';

mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => {
    console.log('Database connected');
})

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(mongoSanitize({
    replaceWith: '_'
}));

const corsConfig = {
    origin: 'http://localhost:3000',
    credentials: true
}
app.use(cors(corsConfig));

const secret = process.env.SECRET || 'badsecret';

const store = MongoStore.create({
    mongoUrl: dbUrl,
    touchAfter: 24 * 60 * 60,
    crypto: {
        secret
    }
});

store.on('error', function (e) {
    console.log('SESSION STORE ERROR', e);
})

const sessionConfig = {
    store,
    name: 'session',
    secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}

app.use(session(sessionConfig));

app.use(passport.initialize()); // this must come before usersRoutes so that req.login can be called on register
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    req.session.returnTo = req.originalUrl;
    return next();
})

app.get('/', (req, res) => {
    res.redirect('/');
})

app.use('/', taskRoutes);
app.use('/', authRoutes);
app.use(errorController);
app.use(cookieParser); // this must go after routes

app.use((err, req, res, next) => {
    if (!err.statusCode) err.statusCode = 500;
    if (!err.message) err.message = 'Something went wrong';
    console.log('you hit the catch-all error middleware');
    console.log(err.statsuCode, err.message)
    return res.status(err.statusCode).send({ messages: err.message });
})

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/client/build")));

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "client", "build", "index.html"));
    });
}


const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})