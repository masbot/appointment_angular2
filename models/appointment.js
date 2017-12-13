var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = require('./user');

var schema = new Schema({
    appointment: {type: Date, required: true},
    barber: {type: String, required: true},
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    date: {type: Date}
});

//middleware
//whenever appt is deleted, the appointments array on the user who created the appt is updated.
schema.post('remove', function(appointment){
    User.findById(appointment.user, function(err, user){
        user.appointments.pull(appointment);
        user.save();
    });
});

module.exports = mongoose.model('Appointment', schema);