const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
        _id: mongoose.Schema.Types.ObjectId,

        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User' 
        },
        checkin: {
           type: String
        }, 
        checkout: {
           type: String
        }
     
});

module.exports = mongoose.model('Booking', bookingSchema);