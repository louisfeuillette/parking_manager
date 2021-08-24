const UserModel = require("../models/users");

// module used to hash pwd of the users
var bcrypt = require("bcrypt");
const cost = 10;

// module used to create a token 
var uid2 = require("uid2");

/* POST create a user in DB */
const signUp_User = async (req, res, next) => {
    let user = null;
    let result = false;
    let error = [];

    try {
        // hash the pwd 
        const hash = bcrypt.hashSync(req.body.passwordFront, cost);

        user = await UserModel.findOne({ pseudo: req.body.pseudoFront });

        if (user) {
            error.push("Ce pseudo est déjà utilisé");
        } else {
            var newUser = await new UserModel({
                token: uid2(32),
                role: req.body.roleFront, // only "admin" or "public_user"
                pseudo: req.body.pseudoFront,
                password: hash,
            });
            var userSaved = await newUser.save();
        }

        userSaved ? (result = true) : (result = false);

        return Promise.all([user, newUser, userSaved]).then(
            res.status(201).json({ user: userSaved, result, error })
        )

    } catch (err) {
        res.status(400).json({error: "Création de votre compte impossible pour le moment"} )
        throw new Error(err)
    }
}

/* POST connect the user */
const signIn_User = async (req, res, next) => {

    let user = null;
    let result = false;
    let error = [];

    try {

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

        res.status(200).json({ result, user, error });

    } catch (err) {
        res.status(400).json({error: "Impossible de vous connecter pour le moment, re-essayer plus tard"})
        throw new Error(err)
    }
}

module.exports = {
    signUp_User, 
    signIn_User,
}