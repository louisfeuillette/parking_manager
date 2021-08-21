var mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
    token: String,
    role: String,
    pseudo: String,
    password: String,
    parkingSpot: { type: mongoose.Schema.Types.ObjectId, ref: 'parkingSpot' }
});

const UserModel = mongoose.model('users', UserSchema);

module.exports = UserModel;