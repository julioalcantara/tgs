const express = require( 'express');
const mongoose = require('mongoose');
const adminAuth = require('../middlewares/adminAuth');
const AdminProfile = mongoose.model('AdminProfile');

const router = express.Router();

router.post('/profile', (req, res)=> {
    const adminProfile = new AdminProfile({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        phone: req.body.phone
    });
    adminProfile
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
                        url: "http://localhost:3000/admin/profile/" + result._id
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

router.get('/profile', adminAuth, (req, res) => {
    AdminProfile.find()
        .select('name phone _id')
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                profiles: docs.map(docs => {
                    return {
                        _id: docs._id,
                        name: docs.name,
                        phone: docs.phone,
                        request: {
                            type: 'GET',
                            url: "http://localhost:3000/admin/profile/" + docs._id
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

router.get('/profile/:profileId', adminAuth, (req, res)=> {
    const id = req.params.profileId;
    AdminProfile.findById(id)
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

router.patch('/profile/:profileId', requireAuth,(req, res)=> {
    const id = req.params.profileId;
    const updateProfile = req.body;
    AdminProfile.update({ _id: id }, {$set: updateProfile})
        .exec()
        .then( result => {
            res.status(200).json({
                message: 'profile updated',
                request: {
                    type: 'GET',
                    url: "http://localhost:3000/admin/profiles/" + id
                }
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});

router.delete('/profile/:profileId', adminAuth, (req, res)=> {
    const id = req.params.profileId;
    AdminProfile.remove({ _id: id })
        .exec()
        .then( result => {
            res.status(200).json({
                message: 'Product deleted',
                request: {
                    type: 'POST',
                    url: "http://localhost:3000/admin/profile/",
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