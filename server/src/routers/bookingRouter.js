const express = require('express');
const mongoose = require('mongoose');
const Booking = require('../models/Booking');
const User = require('../models/Users'); 


const router = express.Router();

router.get('/', (req, res, next) => {
    Booking.find()
    .populate('userId', 'name') // populate the booking schema with the user info
    .exec()
    .then(docs => {
        res.status(200).json({
            count: docs.length,
            bookings: docs.map(docs => {
                return {
                    _id: docs._id,
                    userId: docs.userId,
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
    User.findById( req.body.userId)
        .then(userId => {
            if(!userId){
                return res.status(404).json({
                    message: 'User not found'
                })
            }
            const booking = new Booking({
                _id: mongoose.Types.ObjectId(),
                userId: req.body.userId,
                checkin: req.body.checkin,
                checkout: req.body.checkout
            });
            return booking.save()
        })
        .then( result => {
            res.status(200).json({
                message: 'Booking was created',
                id: result._id,
                userId: result.userId,
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
        .populate('userId') // populate the booking schema with the user info
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