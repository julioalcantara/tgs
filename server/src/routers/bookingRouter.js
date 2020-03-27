const express = require('express');
const mongoose = require('mongoose');
const Booking = require('../models/Booking');
const Profile = require('../models/Profile'); 


const router = express.Router();

router.get('/', (req, res, next) => {
    Booking.find()
    .populate('profileId', 'name') // populate the booking schema with the user info
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
                        url: "http://localhost:3000/bookings/" + docs._id
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

router.post('/', (req, res, next)=> {
    Profile.findById( req.body.profileId)
        .then(profileId => {
            if(!profileId){
                return res.status(404).json({
                    message: 'User not found'
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
                    url: "http://localhost:3000/bookings/" + result._id
                }
            });
            
        }).catch(err => {
                res.status(500).json({
                    error: err
                })
            });
});


router.get('/:bookingId', (req, res, next)=> {
    Booking.findById(req.params.bookingId)
        .populate('profileId') // populate the booking schema with the user info
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
                    url: "http://localhost:3000/bookings/"
                }
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        });

});

router.delete('/:bookingId', (req, res, next)=> {
    Booking.remove({ _id: req.params.bookingId })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Booking deleted',
                request: {
                    type: 'POS',
                    url: "http://localhost:3000/bookings",
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