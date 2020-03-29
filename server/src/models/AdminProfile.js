const mongoose = require('mongoose');

const adminProfileSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId
    },
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    }
});

mongoose.model('AdminProfile', adminProfileSchema)