const express = require( 'express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = mongoose.model('User');
const Booking1 = mongoose.model('Booking1');

const router = express.Router();

//define a route  ->  https://expressjs.com/en/guide/routing.html
router.post('/signup', async (req, res)=> {
    const { email, password, booking1 } = req.body;

    try{
        const user = new User({ email, password, booking1});
        await user.save();

        const token = jwt.sign({ userId: user._id}, 'MY_SECRET_KEY');
        res.send({ token });

        User.findOne({})
        .populate('booking1')
        .exec((err, booking1)=>{
            console.log(booking1);
        })
    } catch (err) {
        res.status(422).send(err.message);
    }  
});

router.post('/booking', async(req, res)=> {
    const { checkin, checkout } = req.body;
    const booking1 = new Booking1({ checkin, checkout });
    await booking1.save();
    res.send('You made a booking request')
})

// signin authentication
router.post('/signin', async (req, res)=> {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(422).send({ error: 'Must provide email and passowrd'})
    }

    const user = await User.findOne({ email });
    if (!user) {
        return res.status(422).send({ error: 'Invalide password or email'});
    }

    try {
        await user.comparePassword(password);
        const token = jwt.sign({ userId: user._id }, 'MY_SECRET_KEY');
        res.send({ token });
        
    } catch (err) {
        return res.status(422).send({ error: 'Invalide password or email'});
    }  
});


module.exports = router;