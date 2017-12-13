var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongooseUniqueValidator = require('mongoose-unique-validator');

var schema = new Schema({
    admin: {type: Boolean, default: false},
    password: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    appointments: [{type: Schema.Types.ObjectId, ref: 'Appointment'}]
});

schema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('User', schema);