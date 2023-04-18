const { application } = require('express');
const db = require('../model/index.js');

const jwt = require("jsonwebtoken")
const jwtKey = "my_secret_key"
const jwtExpirySeconds = 3000


exports.createUser = function (req, res) {
    db.User.create({ Name: req.body.Name, passWord: req.body.passWord, Mood: 0 }).then(function (user) {
        if (user.length != 0) {
            res.json(user);
        } else {
            res.sendStatus(404);
        }
    })
}

function getUser(req, res) {
    // checkLogged(function () {
    db.User.findAll({ where: { iduser: req.params.userId } }).then(function (user) {
        if (user.length != 0) {
            res.json(user);
        } else {
            res.sendStatus(404);
        }
    })
    // }, req, res)
}

exports.getUser = getUser;


//a changer, si on change rien ca return not found
exports.updateUser = function (req, res) {
    // checkLogged(function () {
    db.User.update({ Name: req.body.Name, passWord: req.body.passWord, Mood: req.body.Mood }, { where: { iduser: req.params.userId } }).then(function (result) {
        if (result == 1) {
            getUser(req, res);
        } else {
            // res.json(result)
            res.sendStatus(404);
        }
    })
    // }, req, res)
}

exports.deleteUser = function (req, res) {
    // checkLogged(function () {
    db.User.destroy({ where: { iduser: req.params.userId } }).then(function (result) {
        if (result == 1) {
            res.sendStatus(200);
        } else {
            res.sendStatus(404);
        }
    })
    // }, req, res)
}

// exports.login = function (req, res) {
//     db.User.findAll({ where: { Name: req.body.Name, passWord: req.body.passWord } }).then(function (user) {
//         if (user.length != 0) {
//             req.session.user = user;
//             req.session.logged = true;
//             res.json(user);
//         } else {
//             res.sendStatus(404);
//         }
//     })
// }


exports.login = function (req, res) {
    db.User.findAll({ where: { Name: req.body.Name, passWord: req.body.passWord } }).then(function (user) {
        if (user.length != 0) {
            let payload = { id: user.iduser };
            let token = jwt.sign(payload, jwtKey, {
                algorithm: "HS256",
                expiresIn: jwtExpirySeconds,
            })
            res.json({ "token": token, "maxAge": jwtExpirySeconds * 1000 });
        } else {
            res.sendStatus(401);
        }
    })
}


exports.getMood = function (req, res) {
    // checkLogged(function () {
    db.User.findAll({ where: { iduser: req.params.userId } }).then(function (user) {
        if (user.length != 0) {
            res.json(user[0].Mood);
        } else {
            res.sendStatus(404);
        }
    })
    // }, req, res)
}



// function checkLogged(wrapped, req, res) {
//     if (req.session.logged == true) {
//         const result = wrapped.apply(this, arguments);
//         return result;
//     }
//     else {
//         res.json({ error: "not logged in" });
//     }
// }


function checkLogged(req, res, next) {
    console.log("if")
    if (typeof req.headers.authorization !== "undefined") {

        let token = req.headers.authorization.split(" ")[0];

        jwt.verify(token, jwtKey, (err, payload) => {
            if (err) {
                res.status(401).json({ error: "Not Authorized" });
            }
            else {
                req.user = payload; // allow to use the user id in the controller

                return next();
            }

        });
    }
}


exports.checkLogged = checkLogged;