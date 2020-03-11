const mongoose = require('mongoose');

const calendarSchema = new mongoose.Schema({
    checkin: {
        type: String,
        required: true
    }
});

calendarSchema.pre('save',  function(next) {
    const calendar = this;
    //if calendar is not modified just continue
    if(!calendar.isModified('checkin')) {
        return next;
    }
});

mongoose.model('Calendar', calendarSchema);