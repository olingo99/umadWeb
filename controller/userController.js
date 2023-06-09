const { application } = require('express');
const db = require('../model/index.js');

const jwt = require("jsonwebtoken")
const jwtKey = "my_secret_key"
const jwtExpirySeconds = 3000

var bcrypt = require('bcrypt');
const salt = "$2b$10$1jJZ1Z8Z8Z8Z8Z8Z8Z8Z8Z";

/*
Controller contains functions to handle requests regarding the user table as well as authentication logic
*/


// Create and Save a new User
exports.createUser = function (req, res) {
    let password = req.body.passWord;

    bcrypt.hash(password, salt, function (err, hash) {
        if (err) {
            return res.status(500).json({
                error: err
            })
        }
        else {
            db.User.create({ Name: req.body.Name, passWord: hash, Mood: 0 }).then(function (user) {
                if (user.length != 0) {
                    res.json(user);
                } else {
                    res.sendStatus(400);
                }
            })
        }
    })
}
//     db.User.create({ Name: req.body.Name, passWord: req.body.passWord, Mood: 0 }).then(function (user) {
//         if (user.length != 0) {
//             res.json(user);
//         } else {
//             res.sendStatus(400);
//         }
//     })
// }


// Retrieve a user by its id
function getUser(req, res) {
    db.User.findOne({ where: { iduser: req.params.userId } }).then(function (user) {
        if (user.length != 0) {
            res.json(user);
        } else {
            res.sendStatus(404);
        }
    })
}

exports.getUser = getUser;


//Retrieve a user by its name
exports.getUserByName = function (req,res){
    db.User.findOne({ where:{Name:req.params.Name}}).then(function (user){
        console.log(user);
        if (user !== null){
            res.json(user.dataValues);
        }
        else{
            res.sendStatus(404);
        }
    })
}


//Update a user identified by its id
exports.updateUser = function (req, res) {
    db.User.update({ Name: req.body.Name, passWord: req.body.passWord, Mood: req.body.Mood }, { where: { iduser: req.params.userId } }).then(function (result) {
        if (result == 1) {
            getUser(req, res);
        } else {
            res.sendStatus(404);
        }
    })
}

//Delete a user identified by its id
exports.deleteUser = function (req, res) {
    db.User.destroy({ where: { iduser: req.params.userId } }).then(function (result) {
        if (result == 1) {
            res.sendStatus(200);
        } else {
            res.sendStatus(404);
        }
    })
}


//Try to login a user, if successful return a token
exports.login = function (req, res) {


    let password = req.body.passWord;
    
    bcrypt.hash(password, salt, function (err, hash) {
        if (err) {
            return res.status(500).json({
                error: err
            })
        }
        else {
            
    db.User.findOne({ where: { Name: req.body.Name, passWord: hash} }).then(function (user) {     //Check if user with the given name and password exists
        if (user !== null) {                                                                                    //If user exists, create a token and send it to the client
            let payload = { id: user.iduser };                                                                //The token contains the user id and is valid for 3000 seconds
            let token = jwt.sign(payload, jwtKey, {
                algorithm: "HS256",
                expiresIn: jwtExpirySeconds,
            })
            token = {"token": token, "maxAge": jwtExpirySeconds * 1000 };
            res.json(Object.assign({},user.dataValues, token));
        } else {
            res.sendStatus(404);
        }
    })
    }
    })
}

//Retrieve the mood of a user identified by its id
exports.getMood = function (req, res) {
    db.User.findAll({ where: { iduser: req.params.userId } }).then(function (user) {
        if (user.length != 0) {
            res.json(user[0].Mood);
        } else {
            res.sendStatus(404);
        }
    })
}


//Get all the usernames that are "like" the given search string
exports.getUserNames = function (req, res) {
    db.User.findAll({ attributes: ['Name'], where:{
        Name: {
            [db.Sequelize.Op.like]: `%${req.body.search}%`,
        }
    }}).then(function (user) {
        if (user.length != 0) {
            res.json(user);
        } else {
            res.sendStatus(404);
        }
    })
}




//Check if a user is logged in
function checkLogged(req, res, next) {
    if (typeof req.headers.authorization !== "undefined") {     // check if token is provided

        let token = req.headers.authorization.split(" ")[0];    // get token from header

        jwt.verify(token, jwtKey, (err, payload) => {        // verify the token
            if (err) {
                res.status(401).json({ error: "Not Authorized" });  // if token is invalid, return 401
            }
            else {
                req.user = payload;     // use the payload of the token to set the user id in the request (not used currently as the user id is set in the params of each request but can be used to check if the user is authorized to access a resource as the payload contains the id of the CONNECTED user) 

                return next();          // if token is valid, continue
            }

        });
    }
    else{
        res.status(401).json({error:"Not Authorized, missing token"});  // if token is not provided, return 401
    }
}

//Check if a user is an admin
function checkAdmin(req, res, next) {
    db.User.findOne({ where: { iduser: req.user.id } }).then(function (user) {
        if (user.length != 0) {
            if (user.Admin) {
                return next();
            }
            else {
                res.status(403).json({ error: "Not admin" });
            }
        }
        else {
            res.status(404).json({ error: "User not found" });
        }
    });
}

exports.checkLogged = checkLogged;
exports.checkAdmin = checkAdmin;