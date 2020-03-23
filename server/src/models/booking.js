const mongoose = require('mongoose');
    
const bookingSchema = new mongoose.Schema({
    // user: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'users'
    // },
    booking: {
        checkin: {
            type: Date
        },
        checkout: {
            type: Date
        }
    } 
});

module.exports = mongoose.model('bookink', bookingSchema);