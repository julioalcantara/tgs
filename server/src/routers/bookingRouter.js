const express = require('express');
const mongoose = require('mongoose');
const requireAuth = require('../middlewares/requireAuth');
const Booking = mongoose.model('Booking');
const Profile = mongoose.model('Profile'); 

const router = express.Router();

router.get('/booking', (req, res) => {
    Booking.find()
    .populate('profileId', 'name') // populate the booking schema with the profile info
    .exec()
    .then(docs => {
        res.status(200).json({
            count: docs.length,
            bookings: docs.map(docs => {
                return {
                    _id: docs._id,
                    profileId: docs.profileId,
                    checkin: docs.checkin,
                    checkout: docs.checkout,
                    request: {
                        type: 'GET',
                        url: "http://localhost:3000/booking/" + docs._id
                    }
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

router.post('/booking', requireAuth,  (req, res)=> {
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
                checkout: result.checkout,
                request: {
                    type: 'GET',
                    url: "http://localhost:3000/booking/" + result._id
                }
            }); 
        }).catch(err => {
                res.status(500).json({
                    error: err
                })
            });
});

router.get('/booking/:bookingId', requireAuth ,(req, res)=> {
    Booking.findById(req.params.bookingId)
        .populate('profileId') // populate the booking schema with the profile info
        .exec()
        .then(booking => {
            if(!booking){
                return res.status(404).json({
                    message: 'Booking not'
                })
            }
            res.status(200).json({
                id: booking,
                request: {
                    type: 'GET',
                    url: "http://localhost:3000/booking/"
                }
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        });

});

router.patch('/booking/:bookingId', requireAuth,(req, res)=> {
    const id = req.params.bookingId;
    const updateBooking = req.body;
    Booking.update({ _id: id }, {$set: updateBooking})
        .exec()
        .then( result => {
            res.status(200).json({
                message: 'booking updated',
                request: {
                    type: 'GET',
                    url: "http://localhost:3000/booking/" + id
                }
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});

router.delete('/booking/:bookingId', requireAuth, (req, res)=> {
    Booking.remove({ _id: req.params.bookingId })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Booking deleted',
                request: {
                    type: 'POS',
                    url: "http://localhost:3000/booking",
                    body: { name: "name", email: "email@email.com"}
                }
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        });

});

module.exports = router;