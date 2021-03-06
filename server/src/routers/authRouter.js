const express = require( 'express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const User = mongoose.model('User');

const router = express.Router();

//define a route  ->  https://expressjs.com/en/guide/routing.html
router.post('/signup', async (req, res)=> {
    const {  email, password } = req.body; //get information from the body

    try{
        const user = new User({ email, password}); //create a new user schema
        await user.save();
        // veryfy the user that already have { salt and hash }
        const token = jwt.sign({ userId: user._id}, 'MY_SECRET_KEY'); 
        res.send({ token });

    } catch (err) {
        res.status(422).send(err.message);
    }  
});

// signin authentication
router.post('/signin', async (req, res)=> {
    const { email, password } = req.body; //get information from the body

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

    router.get('/user', (req, res) => {
        User.find()
            // .select('name phone _id')
            .exec()
            .then(docs => {
                const response = {
                    count: docs.length,
                    users: docs.map(docs => {
                        return {
                            _id: docs._id,
                            email: docs.email,
                            password: docs.password
                        }
                    })
                };
                res.status(200).json(response);
            })
            .catch(err => {
                res.status(500).json({
                    error: err
                });
            })
    });
});

module.exports = router;