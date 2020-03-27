const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
        _id: mongoose.Schema.Types.ObjectId,

        profileId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Profile',
            required: true 
        },
        checkin: {
           type: String,
           required: true
        }, 
        checkout: {
           type: String,
           required: true
        }
     
});

module.exports = mongoose.model('Booking', bookingSchema);