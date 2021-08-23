const ParkingSpotModel = require("../models/parkingSpot");
const AvailabilityModel = require("../models/availability");
const UserModel = require("../models/users");

/* GET all places from the parking */
const getAllPlaces = async (req, res, next) => {

    let placesFound;

    try {
        placesFound = await ParkingSpotModel.find()

        res.status(200).json(placesFound)
    } catch (err) {
        res.status(400).json({error: "impossible de trouver les places de parking"})
        throw new Error(err)
    }
}

/* GET a place from a specific floor */
const getPlaceAtFloorNbr = async (req, res, next) => {
    try {
        let findPlace = await ParkingSpotModel.find({
            floorNumber: req.params.floorNumberFront
        })
        
        res.status(200).json(findPlace);
    } catch (err) {
        res.status(400).json({error: "Pas de place de parking à l'étage souhaité, veuillez modifier l'étage"})
        throw new Error(err)
    }
}

/* POST the user is choosing his place */
const takeParkingPlace = async (req, res, next) => {

    let result = false;
    let message = "";
    let startDate = new Date()
    let availability = null

    try {
        let parkingSpotFound = await ParkingSpotModel.findOne({
            _id: req.body.parkingSpace_idFront
        })

        if(parkingSpotFound){
            availability = await new AvailabilityModel({
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

        return Promise.all([parkingSpotFound, availability]).then(
            res.status(201).json({parkingSpotFound, message, result})
        ).catch(err => err)

    } catch (err) {
        res.status(400).json({error: "Désoler. Nous n'avons pas pu créer votre place de parking"})
        throw new Error(err)
    }
}

/* GET the place of one user already parked */
const getMyPlace = async (req, res, next) => {
    try {
        let myTicket = await AvailabilityModel.findOne({userID: req.body.user_idFront})

        let myParkingSpotID = await ParkingSpotModel.findById(myTicket.parkingSpaceID)
        
        return Promise.all([myTicket, myParkingSpotID]).then(
            res.status(200).json(myParkingSpotID)
        )

    } catch (err) {
        res.status(400).json({error: "Nous n'avons pas trouver votre place, veuillez contacter un admin"})
        throw new Error(err)
    }
}

/* POST the user's leaving the parking */
const userLeaveParking = async (req, res, next) => {
    let result;
    
    try {
        let endDate = new Date()

        let availability = await AvailabilityModel.updateOne(
            {userID: req.body.user_idFront},
            {
                parkingSpaceID: null,
                endsAt: endDate,
                active: false,
            }
        )

        let ticket = await AvailabilityModel.findById(req.body.availability_idFront)

        availability ? result = true : result = false

        return Promise.all([availability, ticket]).then(
            res.status(200).json({result, ticket})
        ).catch(err => err) 

    } catch {
        res.status(400).json({error: "Veuillez contacter un admin pour faciliter votre sortie"})
        throw new Error(err)
    }
}

/* GET read les infos users */
const getUserInfos = async (req, res, next) => {
    try {
        let userInfos = await UserModel.findOne({
            token: req.body.tokenFront
        })

        res.status(200).json(userInfos);
    } catch {
        res.status(400).json({error: "Impossible de charger les données de cette utilisateur"})
        throw new Error(err)
    }
}

const updateUserInfo = async (req, res, next) => {
    try {
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

        return Promise.all([userBeforeUpdate, userUpdated, userAfterUpdate]).then(
            res.status(201).json({user: userAfterUpdate, result})
        ).catch(err => err) 
        
    } catch {
        res.status(400).json({error: "L'utilisateur n'a pas été mis à jour"})
        throw new Error(err)
    }
}

/* DELETE delete des infos users */
const deleteUser = async (req, res, next) => {
    try {
        let userDeleted = await UserModel.deleteOne({
            token: req.params.tokenFront
        })
        
        let result
        userDeleted ? result = true : result = false
        
        res.status(200).json(result)
    } catch {
        res.status(404).json({error: "L'utilisateur n'a pas été supprimé. Veuillez re-essayer."})
        throw new Error(err)
    }
}

module.exports = {
    getAllPlaces,
    getPlaceAtFloorNbr,
    takeParkingPlace,
    getMyPlace,
    userLeaveParking,
    getUserInfos,
    updateUserInfo,
    deleteUser,
}