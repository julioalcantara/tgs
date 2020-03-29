const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Admin = mongoose.model('Admin');

module.exports = (req, res, next) => {
    // authorization === 'Bearer + token' from mongodb
    const { authorization } = req.headers;
    
    if (!authorization) {
        return res.status(401).send({ error: 'You must be logged in.'});
    }

    // will replace the word bearer to an empty string getting only the key token
    const token = authorization.replace('Bearer ', ''); 
    jwt.verify(token, 'ADMIN_SECRET_KEY', async (err, payload) => {

        if (err) {
            return res.status(401).send({ error: 'You must be logged in.'});
        }
        
        const { adminId } = payload;

        const admin = await Admin.findById(adminId); 
        req.admin = admin;
        next();
    });
};