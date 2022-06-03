// if (process.env.NODE_ENV === 'production') {
//     require('dotenv').config();
// }

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
const uuid = require('uuid');

const User = require('./models/userModel');
const taskRoutes = require('./routes/taskRoutes');
const authRoutes = require('./routes/authRoutes');
const errorController = require('./controllers/errorController');

const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/todoListTest';

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

const homeUrl = process.env.HOMEPAGE_URL || 'http://localhost:3000';
const whitelist = ['http://localhost:3000', 'http://192.168.0.101:3000', 'http://localhost:5000', 'http://127.0.0.1:8080', homeUrl];
const corsConfig = {
    origin: function (origin, callback) {
        console.log('**Origin of request: ' + origin);
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            console.log('Origin acceptable');
            callback(null, true);
        } else {
            console.log('Origin rejected');
            callback(new Error('Not allowed by CORS'));
        }
    },
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
    id: function (req) {
        return uuid(); // use UUIDs for session IDs
    },
    secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
        // httpOnly: true,
        // secure: true,
        // sameSite: "none",
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}

if (process.env.NODE_ENV === 'production') {
    app.set('trust proxy', 1); // trust first proxy
    sessionConfig.cookie.secure = true; // serve secure cookies
    sessionConfig.store = store;
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

app.use('/api/tasks', taskRoutes);
app.use('/api/users', authRoutes);
app.use(errorController);
// app.use(cookieParser); // this must go after routes

app.use((err, req, res, next) => {
    if (!err.statusCode) err.statusCode = 500;
    if (!err.message) err.message = 'Something went wrong';
    console.log('you hit the catch-all error middleware');
    console.log(err.statusCode, err.message)
    return res.status(err.statusCode).send({ messages: err.message });
})

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/client/build")));

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "/client/build/index.html"));
    });
}

// app.get('*', (req, res) => {
//     console.log(req.path);
//     res.redirect('/');
// })

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})