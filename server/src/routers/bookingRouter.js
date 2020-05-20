const express = require('express');
const mongoose = require('mongoose');

const Booking = mongoose.model('Booking');
const Profile = mongoose.model('Profile'); 

const requireAuth = require('../middlewares/requireAuth');

const router = express.Router();

//fetch bookings
router.get('/booking', async (req, res) => {
    Booking.find()
    .populate('profileId', 'firstName') // populate the booking schema with the profile info
    .exec()
    .then(docs => {
        res.status(200).json({
            count: docs.length,
            bookings: docs.map(docs => {
                return {
                    _id: docs._id,
                    profileId: docs.profileId,
                    checkin: docs.checkin,
                    checkout: docs.checkout
                }
            })
        });
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });

});

//create booking
router.post('/booking', async (req, res)=> {
    Profile.findById( req.body.profileId)
        .then(profileId => {
            if(!profileId){
                return res.status(404).json({
                    message: 'profile not found'
                })
            }
            const booking = new Booking({
                _id: mongoose.Types.ObjectId(),
                profileId: req.body.profileId,
                checkin: req.body.checkin,
                checkout: req.body.checkout
            });
            return booking.save()
        })
        .then( result => {
            res.status(200).json({
                message: 'Booking was created',
                id: result._id,
                profileId: result.profileId,
                checkin: result.checkin,
                checkout: result.checkout
            }); 
        }).catch(err => {
                res.status(500).json({
                    error: err
                })
            });
});

//get booking by ID
router.get('/booking/:bookingId', async (req, res)=> {
    Booking.findById(req.params.bookingId)
        .populate('profileId', 'firstName') // populate the booking schema with the profile info
        .exec()
        .then(booking => {
            if(!booking){
                return res.status(404).json({
                    message: 'Booking not'
                })
            }
            res.status(200).json({
                id: booking,
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        });
});

//Edit booking
router.patch('/booking/:bookingId',(req, res)=> {
    const id = req.params.bookingId;
    const updateBooking = req.body;
    Booking.update({ _id: id }, {$set: updateBooking})
        .exec()
        .then( result => {
            res.status(200).json({
                message: 'booking updated'
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});

//delete booking
router.delete('/booking/:bookingId', (req, res)=> {
    Booking.remove({ _id: req.params.bookingId })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Booking deleted'
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        });
});

module.exports = router;