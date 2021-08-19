var mongoose = require('mongoose');

var AvailabilitySchema = mongoose.Schema({
    userID: { type: mongoose.Schema.Types.ObjectId, ref: 'users' } ,
    parkingSpaceID: { type: mongoose.Schema.Types.ObjectId, ref: 'parkingSpot' } ,
    startsAt: Date,
    endsAt: Date,
    active: Boolean,
});

const AvailabilityModel = mongoose.model('users', AvailabilitySchema);

module.exports = AvailabilityModel;