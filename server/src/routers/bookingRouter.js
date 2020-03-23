const dateRoute = require( 'express').Router();

//booking model
const DateModel = require('../models/booking');   

dateRoute.route('/add').post( function (res, req) {
    let datemodel = new DateModel(req.body);
    datemodel.save()
        .then(dateSaved => {
            res.status(200).json({'checkin': 'Date added successfully'});
        })
        .catch(err => {
            res.status(400).send("unable to save to database");
        });
});

module.exports = dateRoute;