require('./models/Users');
require('./models/Admin');
require('./models/Profile');
require('./models/Booking');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require ('mongoose');

const authRouter = require('./routers/authRouter');
const bookingRouter = require('./routers/bookingRouter');
const profileRouter = require('./routers/profileRouter');
const adminRouter = require('./routers/adminRouter');
const requireAuth = require('./middlewares/requireAuth');
const adminAuth = require('./middlewares/adminAuth');

const app = express(); // the main app

app.use(bodyParser.json());
app.use(authRouter);
app.use(profileRouter);
app.use(bookingRouter);
app.use('/admin', adminRouter);

const mongoUri = 'mongodb+srv://Admin:Admin@tgs-qhwpm.mongodb.net/tgs?retryWrites=true&w=majority';
mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useCreateIndex: true
});
mongoose.connection.on('connected', () => {
    console.log('Connected to mongo instance'); 
});
mongoose.connection.on('error', (err) => {
    console.error('Error connecting to mongo', err);
});

// add information to the root path in this case is adding "/users" -> https://expressjs.com/en/guide/routing.html
app.get('/', requireAuth, (req, res) => {
    res.send(`Your id is: ${req.user._id}`);
});

app.get('/admin', adminAuth, (req, res) => {
    res.send(`Your id is: ${req.user._id}`);
});

app.listen(3000, () => {
    console.log('Listening on port 3000');
});