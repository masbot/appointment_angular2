var express = require('express');
var router = express.Router();
var Appointment = require('../models/appointment');
var User = require('../models/user');
var jwt = require('jsonwebtoken');

router.get('/', function(req, res, next){

    var month = req.query.month;
    month = parseInt(month);
    var test = req.query.test;
    var after = new Date();
    var before = new Date();

    after.setMonth(month);
    after.setDate(1);
    after.setFullYear(test);
    after.setHours(0);
    after.setMinutes(0);
    after.setSeconds(0);
    before.setMonth(month+1);
    before.setDate(1);
    before.setFullYear(test);

    var dateFind = {
        "appointment" : {
            "$gte": after,
            "$lt": before
        }
    };

    Appointment.find(dateFind)
        .exec(function(err, appointments){
            if(err){
                return res.status(500).json({
                    title:'An error occurred',
                    error: err
                });
            }

            res.status(200).json({
                message:'Success',
                obj: appointments
            });
        });
});

//protecting routes with JWT from unauth users
//checks for valid tokens using secrets
//pass query to check token
router.use('/', function(req, res, next){

    jwt.verify(req.query.token, 'secret', function(err, decoded){
        if(err){
            return res.status(401).json({
                title: 'Not Authenticated',
                error: err
            });
        }
        next();
    });

});

//add appointments
router.post('/', function (req, res, next){

    var decoded =  jwt.decode(req.query.token);

    User.findById(decoded.user._id, function(err, user){
        if(err){
            return res.status(500).json({
                title: 'An error occured',
                error: err
            });
        }

        var appointment = new Appointment({
            appointment: req.body.appointment,
            barber: req.body.barber,
            user: user,
            date: req.body.date
        });

        appointment.save(function(err, result){
            if(err){
                return res.status(500).json({
                    title: 'An error occured',
                    error: err
                });
            }

            user.appointments.push(result);

            user.save();

            res.status(201).json({
                title: 'Saved appointment',
                obj: result
            });
        });

    });

});


router.delete('/:id', function(req, res, next){

    Appointment.findById(req.body._id, function(err, appointment){
        if(err){
            return res.status(200).json({
                title: 'An error occured',
                message: err
            });
        }

        if(!appointment){
            return res.status(200).json({
                title: 'No Appointment Found!',
                message: {message: 'Appointment not found'}
            });
        }

        Appointment.remove(function(err, result){
            if(err){
                return res.status(200).json({
                    title: 'An error occured',
                    message: err
                });
            }

            res.status(200).json({
                message: 'Deleted message',
                obj: result
            });
        });

    });

});

router.post('/myappointment', function(req, res, next){

    var decoded =  jwt.decode(req.query.token);
    console.log(decoded);
    User.findById(decoded.user._id)
        .populate('appointments')
        .exec(function(err, user){
            if(err){
                return res.status(500).json({
                    title: 'An error occured',
                    message: err
                });
            }

            if(!user){
                return res.status(500).json({
                    title: 'An error occured',
                    message: err
                });
            }

            res.status(200).json({
                title: 'Users Appointment',
                obj: user.appointments
            });
        });
    // User.findById(decoded.user._id, function(err, user){
    //
    //     if(err){
    //         return res.status(500).json({
    //             title: 'An error occured',
    //             message: err
    //         });
    //     }
    //
    //     if(!user){
    //         return res.status(500).json({
    //             title: 'An error occured',
    //             message: err
    //         });
    //     }
    //
    //     res.status(200).json({
    //         title: 'Users Appointment',
    //         obj: user.appointments
    //     });
    //
    // });

});

module.exports = router;