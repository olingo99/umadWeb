const { application } = require('express');
const db = require('../model/index.js');

const checkLogged = require('./userController.js').checkLogged;

exports.addFriend = function (req, res) {
    checkLogged(function () {
        date = new Date();
        date = date.getUTCFullYear() + '-' +
            ('00' + (date.getUTCMonth() + 1)).slice(-2) + '-' +
            ('00' + date.getUTCDate()).slice(-2) + ' ' +
            ('00' + date.getUTCHours()).slice(-2) + ':' +
            ('00' + date.getUTCMinutes()).slice(-2) + ':' +
            ('00' + date.getUTCSeconds()).slice(-2);
        db.FriendsMap.create({ iduser: req.params.userId, idfriend: req.body.idfriend, date: date }).then(function (friend) {
            if (friend.length != 0) {
                res.json(friend);
            } else {
                res.sendStatus(404);
            }
        })
    }, req, res)
}

// exports.getFriends = function (req, res) {
//     checkLogged(function () {
//         db.FriendsMap.findAll({ where: { iduser: req.params.userId }, include:[
//             {
//                 model: db.User,
//             }
//         ] }).then(function (friends) {
//             if (friends.length != 0) {
//                 res.json(friends);
//             } else {
//                 res.sendStatus(404);
//             }
//         })
//     }, req, res)
// }


//try to change this to sequelize query

exports.getFriends = function (req, res) {
    checkLogged(function () {
        db.sequelize.query(`SELECT * FROM umad.users WHERE iduser IN (SELECT idfriend FROM umad.friendsmaps WHERE iduser = ${req.params.userId})`, {
            model: db.User,
            mapToModel: true // pass true here if you have any mapped fields
        }).then(function (friends) {
            if (friends.length != 0) {
                res.json(friends);
            } else {
                res.sendStatus(404);
            }
        })
    }, req, res)
}


// exports.getFriends = function (req, res) {
//     try {
//       const userId = req.params.userId;
//       const user = db.FriendsMap.findOne({ where: { iduser: userId } });
//       if (!user) {
//         return res.sendStatus(404);
//       }
//       const friends = user.getFriends();
//       res.json(friends);
//     } catch (error) {
//       console.error(error);
//       res.sendStatus(500);
//     }
//   };
