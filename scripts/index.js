const parkingSpotsSeeds = require("./seeds/parkingSpots");
const ParkingSpotModel = require("../models/parkingSpot");

require("../models/connection");

// Method 1
ParkingSpotModel.collection
  .insert(parkingSpotsSeeds)
  .then((successMessage) => {
    console.log("success", successMessage);
  })
  .catch((error) => console.log(error));

// // Method 2  
// const populateParkingSpots = async function () {
//   try {
//     const successMessage = await ParkingSpotModel.collection.insert(
//       parkingSpotsSeeds
//     );
//     console.log("success", successMessage);
//   } catch (e) {
//     console.log(e);
//   }
// };
// populateParkingSpots();
