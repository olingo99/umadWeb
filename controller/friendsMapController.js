const { application } = require('express');
const db = require('../model/index.js');

const checkLogged = require('./userController.js').checkLogged;

exports.addFriend = function (req, res) {
    checkLogged(function () {
        today = new Date();
        db.FriendsMap.create({ iduser: req.params.userId, idfriend: req.body.idfriend,date:today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()+' '+today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds() }).then(function (friend) {
            if (friend.length != 0) {
                res.json(friend);
            } else {
                res.sendStatus(404);
            }
        })
    }, req, res)
}