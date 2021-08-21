var express = require("express");
var router = express.Router();

const UserModel = require("../models/users");
const ParkingSpotModel = require("../models/parkingSpot");
const AvailabilityModel = require("../models/availability");

// module pour hasher le MDP des users
var bcrypt = require("bcrypt");
const cost = 10;

// module de création de token 
var uid2 = require("uid2");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Park-Manager" });
});

/* POST de la création de l'utilisateur en BDD */
router.post("/sign-up", async function (req, res, next) {

  let user = null
  let result = false
  let error = []

  // hash le mot de passe lors de l'enregistrement en BDD
  const hash = bcrypt.hashSync(req.body.passwordFront, cost);

  user = await UserModel.findOne({ pseudo: req.body.pseudoFront })

  if (user) {
    error.push('Ce pseudo est déjà utilisé')
  } else {    
    var newUser = await new UserModel({
      token: uid2(32),
      role: req.body.roleFront, // only "admin" or "public_user"
      pseudo: req.body.pseudoFront,
      password: hash,
    });
    var userSaved = await newUser.save();
  }

  userSaved ? result = true : result = false

  res.json({ user: userSaved, result, error });
});

/* POST de la connexion de l'utilisateur + renvoi des erreurs */
router.post("/sign-in", async function (req, res, next) {
  let user = null;
  let result = false;
  let error = [];

  user = await UserModel.findOne({ pseudo: req.body.pseudoFront })

  if (req.body.emailFront == "" || req.body.passwordFront == "") {
    error.push("champs vides");
  }

  if (user) {
    if (bcrypt.compareSync(req.body.passwordFront, user.password)) {
      result = true;
    } else {
      error.push("mot de passe incorrect");
      user = null
    }
  } else {
    error.push("utilisateur inexistant");
  }

  res.json({ result, user, error });
});

/* GET all places from the parking */
router.get("/get-all-places", async function (req, res, next) {

  let findAllPlaces = await ParkingSpotModel.find()

  res.json({findAllPlaces});
});

/* GET afficher à l'écran une place de parking à un user selon l'étage demandé */
router.get("/get-a-place/:floorNumberFront", async function (req, res, next) {

  let findPlace = await ParkingSpotModel.find({
    floorNumber: req.params.floorNumberFront
  })

  res.json(findPlace);
});

/* POST Assigner une place de parking à un user */
router.post("/take-a-place", async function (req, res, next) {

  let result = false;
  let message = "";
  let startDate = new Date()

  let parkingSpotFound = await ParkingSpotModel.findOne({
    _id: req.body.parkingSpace_idFront
  })

  if(parkingSpotFound){
      let availability = await new AvailabilityModel({
        userID: req.body.user_idFront,
        parkingSpaceID: req.body.parkingSpace_idFront,
        startsAt: startDate,
        endsAt: null,
        active: true,
      })
      await availability.save()
      message = 'vous êtes désormais stationné'
      result = true
  } else {
    message = "place inexistante"
  }

  res.json({result, message, parkingSpotFound});
});

/* GET chercher la place de parking d'un user */
router.get("/find-my-place", async function (req, res, next) {

  let myTicket = await AvailabilityModel.findOne({userID: req.body.user_idFront})

  let myParkingSpotID = await ParkingSpotModel.findById(myTicket.parkingSpaceID)
  
    // if(myTicket.active === true){
    //   let myParkingSpotID = await ParkingSpotModel.findById(myTicket.parkingSpaceID)
    //   res.json(myParkingSpotID);
    // } else {
    //  res.json une erreur ou alors la gerer dans le try and catch 
    // }

  res.json(myParkingSpotID);
});

/* POST dé-assigner la place de parking d'un user */
router.post("/leave-parking", async function (req, res, next) {

  let result;
  let endDate = new Date()

  let availability = await AvailabilityModel.updateOne(
    {userID: req.body.user_idFront},
    {
      parkingSpaceID: null,
      endsAt: endDate,
      active: false,
    })

  let ticket = await AvailabilityModel.findById(req.body.availability_idFront)

  availability ? result = true : result = false
  
  res.json({result, ticket});
});

/* GET read les infos users */
router.get("/admin-get-info", async function (req, res, next) {

  let userInfos = await UserModel.findOne({
    token: req.body.tokenFront
  })

  res.json(userInfos);
});

/* UPDATE update les infos users */
router.put("/update-user/:tokenFront", async function (req, res, next) {

  const hash = bcrypt.hashSync(req.body.passwordFront, cost);

  let userBeforeUpdate = await UserModel.findOne({
    token: req.params.tokenFront
  })

  let userUpdated = await UserModel.updateOne(
    {token: req.params.token},
    {
      password: req.body.passwordFront == "" ? userBeforeUpdate.password :hash ,
    }
  )

  let userAfterUpdate = await UserModel.findOne({
    token: req.params.tokenFront
  })

  let result;
  userAfterUpdate ? result = true : result = false

  res.json({user: userAfterUpdate, result});
});

/* DELETE delete des infos users */
router.delete("/delete-user/:tokenFront", async function (req, res, next) {

  let userDeleted = await UserModel.deleteOne({
    token: req.params.tokenFront
  })

  let result
  userDeleted ? result = true : result = false

  res.json(result);
});

module.exports = router;
