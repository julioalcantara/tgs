const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    // _id: {
    //     type: mongoose.Schema.Types.ObjectId
    // },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
            ref: 'User' 
    },
    name: {
        type: String
    },
    phone: {
        type: String
    }
});


module.exports = mongoose.model('Profile', userSchema)