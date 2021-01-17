if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}


const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const flash = require('connect-flash');
const ExpressError = require('./utils/ExpressError');   
const methodOverride = require('method-override');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user');

const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');

const session = require('express-session');
const MongoDBStore = require('connect-mongo')(session);

const userRoutes = require('./routes/users');
const campgroundRoutes = require('./routes/campground');
const reviewRoutes = require('./routes/reviews');

// const dbURL = process.env.DB_URL || 'mongodb://localhost:27017/yelp-camp';  // production || development
const dbURL = 'mongodb://localhost:27017/yelp-camp';  // production || development

// Connect to the yelp-camp mongo database
mongoose.connect(dbURL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:")); // check if there is an error
db.once("open", () => {                                           // if it's succesfully connected
    console.log("Database connected");
})

// Start the express app
const app = express();

// Tells express that we want to use the ejs-mate version when running ejs apps
app.engine('ejs', ejsMate);

// app.set(key, vallue) look at documentation of express
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));


// app.use(express.urlencoded): Tell express to parse the request body
app.use(express.urlencoded({ extended: true }))

// Use the methodOverride to send HTTP vers other than GET and POST from the form in HTML
app.use(methodOverride('_method'));

// Tells express to serve the public directory!
app.use(express.static(path.join(__dirname, 'public')));

// To remove data, use:
app.use(mongoSanitize());

// Secret for mongodbstore and signed session cookies
const secret = process.env.SECRET || 'thisisasecret'

const store = new MongoDBStore({
    url: dbURL,
    secret: secret,
    touchAfter: 24 * 60 * 60
})

store.on('error', function (err) {
    console.log("SESSION STORE ERROR", err);

})

// Session configurations for the express-session package
const sessionConfig = {
    store: store,
    name: 'xxsessionxx',
    secret: secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true, // cookies are only accessible over http, and not over javascript
        // secure: true, // cookies should only work in https (should be set if deployed), this breaks locally, since localhost uses only http
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
};

app.use(session(sessionConfig));
app.use(flash());

// POLICIES!!! Restricts where your app can run scripts from! Scripts can only be run from allowed hosts/servers
// app.use(helmet());
const scriptSrcUrls = [
    "https://stackpath.bootstrapcdn.com/",
    "https://api.tiles.mapbox.com/",
    "https://api.mapbox.com/",
    "https://kit.fontawesome.com/",
    "https://cdnjs.cloudflare.com/",
    "https://cdn.jsdelivr.net",
    "https://enigmatic-depths-81675.herokuapp.com/39eca8ec-16e4-443c-8e30-2c78e767a04e"
];
const styleSrcUrls = [
    "https://kit-free.fontawesome.com/",
    "https://stackpath.bootstrapcdn.com/",
    "https://api.mapbox.com/",
    "https://api.tiles.mapbox.com/",
    "https://fonts.googleapis.com/",
    "https://use.fontawesome.com/",
    "https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css"
];
const connectSrcUrls = [
    "https://api.mapbox.com/",
    "https://a.tiles.mapbox.com/",
    "https://b.tiles.mapbox.com/",
    "https://events.mapbox.com/",
];
const fontSrcUrls = [];
app.use(
    helmet.contentSecurityPolicy({
        directives: {
            defaultSrc: [],
            connectSrc: ["'self'", ...connectSrcUrls],
            scriptSrc: ["'unsafe-inline'", "'self'", ...scriptSrcUrls],
            styleSrc: ["'self'", "'unsafe-inline'", ...styleSrcUrls],
            workerSrc: ["'self'", "blob:"],
            objectSrc: [],
            imgSrc: [
                "'self'",
                "blob:",
                "data:",
                "https://res.cloudinary.com/dkvdxmg4j/", //SHOULD MATCH YOUR CLOUDINARY ACCOUNT! 
                "https://images.unsplash.com/",
            ],
            fontSrc: ["'self'", ...fontSrcUrls],
        },
    })
);

// Passport library for authentication
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate())) ;

passport.serializeUser(User.serializeUser()); 
passport.deserializeUser(User.deserializeUser());

// Middleware for flash: lets us have access to our templates without having to pass it in through
app.use((req, res, next) => {
    // Allows all templates to have access to the user details in res.locals.loggedInUser
    res.locals.loggedInUser = req.user;

    res.locals.success = req.flash('success'); // takes the value in the 'success' key in flash, and passes it through the template
    res.locals.error = req.flash('error');
    next();
})

// Route handlers: Tells express app to use these routes located from different location folder
app.use('/', userRoutes);
app.use('/campgrounds', campgroundRoutes);
app.use('/campgrounds/:id/reviews', reviewRoutes);


// Endpoints for yelp camp
app.get('/', (req, res) => {
    res.render("home");
})

// 404 error page
app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404));
})

// Error handler
app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if(!err.message) err.message = 'Something went wrong';
    res.status(statusCode)
        .render('error', { err });
})

// Listen to PORT 3000
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`SERVING ON PORT ${port}`);
})