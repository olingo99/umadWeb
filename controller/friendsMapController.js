const { application } = require('express');
const db = require('../model/index.js');

/*
 Controller contains functions to handle requests regarding the friendsmap table       
*/


//get all friends of a user
exports.getFriends = function (req, res) {
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
}


//get all friend requests of a user
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


//accept a friend request identified by the id of the friend and the id of the user
exports.acceptFriend = function (req, res) {
    db.FriendsMap.update({ status: "accepted" }, { where: { iduser: req.body.idfriend, idfriend: req.params.userId } }).then(function (result) {                //update the friend request to the status accepted
        if (result == 1) {
            db.FriendsMap.create({ iduser: +req.params.userId, idfriend: +req.body.idfriend, date: new Date(), status: "accepted" }).then(function (friend) {   //create a new friend map with the id of the user and the id of the friend inverted, this makes it so the friend appears for both users
                if (friend != null) {
                    res.json(friend);
                }
                else {
                    res.sendStatus(404);
                }
            })
        } else {
            res.sendStatus(404);
        }
    })
}


//decline a friend request identified by the id of the friend and the id of the user
exports.declineFriend = function (req, res) {
    db.FriendsMap.update({ status: "declined" }, { where: { iduser: req.body.idfriend, idfriend: req.params.userId } }).then(function (result) {
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
            res.sendStatus(404);
        }
    })
}


//create a friend request for a user identified by the id of the friend and the id of the user
exports.addFriendsByName = function (req, res) {
    console.log("feur")
    console.log(req.body.username)
    console.log(req.params.userId)
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
                    res.sendStatus(500);
                }
            })
        } else {
            console.log("error in find");
            res.sendStatus(404);
        }
    }
    )
}
