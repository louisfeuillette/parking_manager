var express = require("express");
var router = express.Router();

const authentification_controller = require('../controllers/authentification')
const parking_controller = require('../controllers/parking')

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Park-Manager" });
});

/* POST create a user in DB */
router.post('/sign-up', authentification_controller.signUp_User)

/* POST connect the user */
router.post('/sign-in', authentification_controller.signIn_User)

/* GET all places from the parking */
router.get("/get-all-places", parking_controller.getAllPlaces);

/* GET a place from a specific floor */
router.get("/get-a-place/:floorNumberFront", parking_controller.getPlaceAtFloorNbr);

/* POST the user is choosing his place */
router.post("/take-a-place", parking_controller.takeParkingPlace);

/* GET the place of one user already parked */
router.get("/find-my-place", parking_controller.getMyPlace);

/* POST the user's leaving the parking */
router.post("/leave-parking", parking_controller.userLeaveParking);

/* GET read les infos users */
router.get("/admin-get-info", parking_controller.getUserInfos);

/* UPDATE update les infos users */
router.put("/update-user/:tokenFront", parking_controller.updateUserInfo);

/* DELETE delete des infos users */
router.delete("/delete-user/:tokenFront", parking_controller.deleteUser);

module.exports = router;
