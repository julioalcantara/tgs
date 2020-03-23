require('./models/Users');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require ('mongoose');
const authRouter = require('./routers/authRouter');
const requireAuth = require('./middlewares/requireAuth');
const dateRoute = require('./routers/bookingRouter');

const app = express();

app.use(bodyParser.json());
app.use(authRouter);
app.use('/dates', dateRoute);

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

app.get('/', requireAuth, (req, res) => {
    // res.send(`Your email is: ${req.user.email}`);
    res.send(`Your id is: ${req.user._id}`);
});

app.listen(3000, () => {
    console.log('Listening on port 3000');
});