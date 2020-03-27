const express = require('express');
const mongoose = require('mongoose');
const Profile = require('../models/Profile'); 
const User = require('../models/Users'); 

const router = express.Router();

router.post('/', (req, res, next)=> {
    const profile = new Profile({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        phone: req.body.phone
    });
    profile
        .save()
        .then( result => {
            console.log(result);
            res.status(201).json({
                message: "User created suscessfully ",
                createdProfile: {
                    _id: result._id,
                    name: result.name,
                    phone: result.phone,                    
                    request: {
                        type: 'GET',
                        url: "http://localhost:3000/Profile/" + result._id
                    }
                }
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
});

router.get('/', (req, res, next) => {
    Profile.find()
        .select('name phone _id')
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                profiles: docs.map(docs => {
                    return {
                        name: docs.name,
                        phone: docs.phone,
                        _id: docs._id,
                        request: {
                            type: 'GET',
                            url: "http://localhost:3000/Profile/" + docs._id
                        }
                    }
                })
            };

            res.status(200).json(response );
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});


router.get('/:profileId', (req, res, next)=> {
    const id = req.params.profileId;
    Profile.findById(id)
        .select('name phone _id')
        .exec()
        .then(docs => {
            if(docs){
                res.status(200).json({
                    user: docs
                });
            } else {
                res.status(404).json({message:'Invalid Id'})
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({error: err});   
        }); 
});

router.patch('/:profileId', (req, res, next)=> {
    const id = req.params.profileId;
    const updateProf = {};
    for(const prof of req.body) {
        updateProf[prof.propName] = prof.value;
    }
    Profile.update({ _id: id }, {$set: updateOps})
        .exec()
        .then( result => {
            res.status(200).json({
                message: 'user updated',
                request: {
                    type: 'GET',
                    url: "http://localhost:3000/Profile/" + result._id
                }
            
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});

router.delete('/:profileId', (req, res, next)=> {
    const id = req.params.profileId;
    User.remove({ _id: id })
        .exec()
        .then( result => {
            res.status(200).json({
                message: 'Product deleted',
                request: {
                    type: 'POST',
                    url: "http://localhost:3000/Profile/",
                    body: { name: 'String', phone: 'String'}
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