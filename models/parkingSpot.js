var mongoose = require('mongoose');

var ParkingSpotSchema = mongoose.Schema({
    spotNumber: String,
    floorNumber: Number,
});

const ParkingSpotModel = mongoose.model('parkingSpot', ParkingSpotSchema);

module.exports = ParkingSpotModel;