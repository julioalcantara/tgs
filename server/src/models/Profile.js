const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    styleCategory: {
        type: String,
        required: true
    }

});
mongoose.model('Profile', profileSchema)