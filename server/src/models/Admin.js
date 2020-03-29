const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const adminSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password: {
        type: String,
        required: true
    }
});

//this function will run before admin data get stored in the database using "hash and salt"
adminSchema.pre('save',  function(next) {
    const admin = this;
    //if admin is not modified just continue
    if(!admin.isModified('password')) {
        return next;
    }
    //10 === to the complexity of the incryption and than a call back fuction 
    bcrypt.genSalt(10, (err, salt) => {
        if(err) {
            return next(err);
        }
        // if salt (string of characters) was generated it will be sended to hash
        bcrypt.hash(admin.password, salt, (err, hash) => {
            if (err) {
                return next(err);
            }
            //update the plain password with a "salt" and "hash" password
            admin.password = hash;
            next();
        });
    });
});

//automate password checking process
adminSchema.methods.comparePassword = function (adminPassword) {
    const admin = this;
    return new Promise((resolve, reject) => {
        bcrypt.compare(adminPassword, admin.password, (err, isMatch) => {
            if (err) {
                return reject(err);
            }

            if (!isMatch) {
                return reject(false);
            }
            resolve(true);
        });
    });
}
 
module.exports = mongoose.model('Admin', adminSchema)   