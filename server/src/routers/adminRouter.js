const express = require( 'express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const Admin = mongoose.model('Admin');

const router = express.Router();

router.post('/admin/signup', async (req, res)=> {
    const {  email, password } = req.body; //get information from the body

    try{
        const admin = new Admin({ email, password}); //create a new user schema
        await admin.save();

        const token = jwt.sign({ adminId: admin._id}, 'ADMIN_SECRET_KEY'); // veryfy the admin that already have { salt and hash }
        res.send({ token });

    } catch (err) {
        res.status(422).send(err.message);
    }  
});

// signin authentication 
router.post('/admin/signin', async (req, res)=> {
    const { email, password } = req.body; //get information from the body

    if (!email || !password) {
        return res.status(422).send({ error: 'Must provide email and passowrd'})
    }

    const admin = await Admin.findOne({ email });
    if (!admin) {
        return res.status(422).send({ error: 'Invalide password or email'});
    }

    try {
        await admin.comparePassword(password);
        const token = jwt.sign({ adminId: admin._id }, 'ADMIN_SECRET_KEY');
        res.send({ token });
        
    } catch (err) {
        return res.status(422).send({ error: 'Invalide password or email'});
    }  
});

module.exports = router;