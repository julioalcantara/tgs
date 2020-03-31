const express = require( 'express');
const mongoose = require('mongoose');

const requireAuth = require('../middlewares/requireAuth');

const Profile = mongoose.model('Profile');

const router = express.Router();

router.post('/profile', (req, res)=> {
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
                    name: result.name,
                    phone: result.phone,
                    _id: result._id,
                    request: {
                        type: 'GET',
                        url: "http://localhost:3000/profile/" + result._id
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

router.get('/profile', (req, res) => {
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
                            url: "http://localhost:3000/profile/" + docs._id
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
        })
});

router.get('/profile/:profileId', (req, res)=> {
    const profileId = req.params.profileId;
    Profile.findById(profileId)
        .select('name phone _id')
        .exec()
        .then(docs => {
            if(docs){
                res.status(200).json({
                    profile: docs
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

router.patch('/profile/:profileId',(req, res)=> {
    const profileId = req.params.profileId;
    const updateProfile = req.body;
    Profile.update({ _id: profileId }, {$set: updateProfile})
        .exec()
        .then( result => {
            res.status(200).json({
                message: 'profile updated',
                request: {
                    type: 'GET',
                    url: "http://localhost:3000/profiles/" + profileId
                }
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});

router.delete('/profile/:profileId', (req, res)=> {
    const profileId = req.params.profileId;
    Profile.remove({ _id: profileId })
        .exec()
        .then( result => {
            res.status(200).json({
                message: 'Product deleted',
                request: {
                    type: 'POST',
                    url: "http://localhost:3000/profile/",
                    body: { name: 'String', phone: 'String'}
                }
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
    });

module.exports = router;