const { application } = require('express');
const db = require('../model/index.js');

const checkLogged = require('./userController.js').checkLogged;

exports.addFriend = function (req, res) {
    checkLogged(function () {
        db.FriendsMap.create({ iduser: req.params.userId, idfriend: req.body.idfriend }).then(function (friend) {
            if (friend.length != 0) {
                res.json(friend);
            } else {
                res.sendStatus(404);
            }
        })
    }, req, res)
}