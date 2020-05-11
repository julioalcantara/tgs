const express = require( 'express');
const mongoose = require('mongoose');

const requireAuth = require('../middlewares/requireAuth');

const Profile = mongoose.model('Profile');

const router = express.Router();

router.post('/profile', async (req, res)=> {
    const profile = new Profile({
        _id: new mongoose.Types.ObjectId(),
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        styleCategory: req.body.styleCategory
    });
    await profile
        .save()
        .then( result => {
            console.log(result);
            res.status(201).json({
                message: "User created suscessfully ",
                _id: result._id,
                firstName: result.firstName,
                lastName: result.lastName,
                styleCategory: result.styleCategory,
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
        //.populate('userId', 'email')
        // .select('name phone _id')
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                profiles: docs.map(docs => {
                    return {
                        _id: docs._id,
                        firstName: docs.firstName,
                        lastName: docs.lastName,
                        styleCategory: docs.styleCategory
                    }
                })
            };
            res.status(200).json(response);
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
        .populate('userId', 'email')
        // .select('name phone _id')
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
                message: 'profile updated'
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
                message: 'Product deleted'
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
    });

module.exports = router;