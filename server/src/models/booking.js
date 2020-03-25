const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({

        checkin: Date,
        checkout: Date
     
});

module.exports = mongoose.model('Booking', bookingSchema);