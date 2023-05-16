const { application } = require('express');
const db = require('../model/index.js');

const checkLogged = require('./userController.js').checkLogged;

// exports.addFriend = function (req, res) {
//     // checkLogged(function () {
//         date = new Date();
//         date = date.getUTCFullYear() + '-' +
//             ('00' + (date.getUTCMonth() + 1)).slice(-2) + '-' +
//             ('00' + date.getUTCDate()).slice(-2) + ' ' +
//             ('00' + date.getUTCHours()).slice(-2) + ':' +
//             ('00' + date.getUTCMinutes()).slice(-2) + ':' +
//             ('00' + date.getUTCSeconds()).slice(-2);
//         db.FriendsMap.create({ iduser: req.params.userId, idfriend: req.body.idfriend, date: date, status:"pending" }).then(function (friend) {
//             if (friend.length != 0) {
//                 res.json(friend);
//             } else {
//                 res.sendStatus(404);
//             }
//         })
//     // }, req, res)
// }

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
    // checkLogged(function () {
        db.sequelize.query(`SELECT * FROM umad.users WHERE iduser IN (SELECT idfriend FROM umad.friendsmaps WHERE status='accepted' AND  iduser = ${req.params.userId})`, {
            model: db.User,
            mapToModel: true // pass true here if you have any mapped fields
        }).then(function (friends) {
            if (friends.length != 0) {
                res.json(friends);
            } else {
                res.sendStatus(404);
            }
        })
    // }, req, res)
}

exports.getFriendRequests = function (req, res) {
db.sequelize.query(`SELECT * FROM umad.users WHERE iduser IN (SELECT iduser FROM umad.friendsmaps WHERE status='pending' AND  idfriend = ${req.params.userId})`, {
    model: db.User,
    mapToModel: true // pass true here if you have any mapped fields
}).then(function (friends) {
    if (friends.length != 0) {
        res.json(friends);
    } else {
        res.sendStatus(404);
    }
})
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


exports.acceptFriend = function (req, res) {
    db.FriendsMap.update({ status: "accepted" }, { where: { iduser: req.body.idfriend , idfriend:req.params.userId } }).then(function (result) {
        if (result == 1) {
            db.FriendsMap.create({ iduser: req.params.userId, idfriend: req.body.idfriend, date: new Date(), status: "accepted" }).then(function (friend) {
            // db.FriendsMap.findOne({ where: { iduser: req.params.userId, idfriend: req.body.idfriend } }).then(function (friend) {
                if (friend != null) {
                    res.json(friend);
                }
                else {
                    res.sendStatus(404);
                }
            })
        } else {
            // res.json(result)
            res.sendStatus(400);
        }
    })
}

exports.declineFriend = function (req, res) {
    db.FriendsMap.update({ status: "declined" }, { where: { iduser:req.body.idfriend , idfriend: req.params.userId } }).then(function (result) {
        if (result == 1) {
            db.FriendsMap.findOne({ where: { iduser: req.params.userId, idfriend: req.body.idfriend } }).then(function (friend) {
                if (friend != null) {
                    res.json(friend);
                }
                else {
                    res.sendStatus(404);
                }
            })
        } else {
            // res.json(result)
            res.sendStatus(404);
        }
    })
}



exports.addFriendsByName = function (req, res) {
    console.log("feur")
    db.User.findOne({ where: { Name: req.body.username } }).then(function (user) {
        if (user != null) {
            console.log("feur2")
            db.FriendsMap.create({ iduser: req.params.userId, idfriend: user.iduser, date: new Date(), status: "pending" }).then(function (friend) {
                if (friend != null) {
                    console.log("feur3")
                    res.json(friend);
                }
                else {
                    console.log("error in create");
                    res.sendStatus(404);
                }
            })
        } else {
            console.log("error in find");
            res.sendStatus(404);
        }
    }
    )
}
