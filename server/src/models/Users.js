const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: { 
        type: String,
        unique: true,
        required: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password: {
        type: String, 
        required: true
    }
});

//this function will run before user data get stored in the database using "hash and salt"
userSchema.pre('save',  function(next) {
    const user = this;
    //if user is not modified just continue
    if(!user.isModified('password')) {
        return next;
    }
    //10 === to the complexity of the incryption and than a call back fuction 
    bcrypt.genSalt(10, (err, salt) => {
        if(err) {
            return next(err);
        }
        // if salt (string of characters) was generated it will be sended to hash
        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) {
                return next(err);
            }
            //update the plain password with a "salt" and "hash" password
            user.password = hash;
            next();
        });
    });
});

//automate password checking process
userSchema.methods.comparePassword = function (candidatePassword) {
    const user = this;
    return new Promise((resolve, reject) => {
        bcrypt.compare(candidatePassword, user.password, (err, isMatch) => {
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

mongoose.model('User', userSchema);