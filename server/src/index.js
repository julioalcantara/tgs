require('./models/Users');
require('./models/Booking');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require ('mongoose');
const authRouter = require('./routers/authRouter');
const requireAuth = require('./middlewares/requireAuth');


const app = express(); // the main app
const admin = express(); // the sub app -> https://expressjs.com/en/4x/api.html#app.METHOD

app.use(bodyParser.json());
app.use(authRouter);
app.use('/admin', admin); //mount the sub app

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
    // res.send(`Your email is: ${req.user.email}`);
    // res.send(`Your id is: ${req.user._id}`);
    res.send(`Your id is: ${req.user._id}`);
});

//admin
admin.get('/', requireAuth, (req, res)=> {
    res.send('admin Home paige ');
});

app.listen(3000, () => {
    console.log('Listening on port 3000');
});