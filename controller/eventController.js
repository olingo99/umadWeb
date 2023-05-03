const { application } = require('express');
const db = require('../model/index.js');

const checkLogged = require('./userController.js').checkLogged;

exports.getEvents = function (req, res) {
    // checkLogged(function () {
        date = new Date();
        today = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
        getByDate(today, req.params.userId).then(function (event) {
            if (event.length != 0) {
                res.json(event);
            } else {
                res.sendStatus(404);
            }
        })
    // }, req, res)
}

exports.createEvent = function (req, res) {
    // checkLogged(function () {
        if (req.body.Date == undefined) {
            date = new Date();
            date.setHours(date.getHours() + 2); //cache misere faut changer plus tard demander au prof
            console.log(date.getDate());
            // req.body.Date = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes();
            req.body.Date = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes()+':'+date.getSeconds()+'.000';

        }
        db.Event.create({ Name: req.body.Name, iduser: req.params.userId, idcategory: req.body.idcategory, Date: req.body.Date, Weight: req.body.Weight }).then(function (event) {
            console.log(req.body.Date);
            if (event.length != 0) {
                res.json(event);
            } else {
                res.sendStatus(404);
            }
        })
    // }, req, res)
}

exports.getLastEvent = function (req, res) {
    // checkLogged(function () {
        // db.Event.findOne({ where: { iduser: req.params.userId }, order: [['Date', 'DESC']], limit: 1 }).then(function (event) {
        db.Event.findAll({ where: { iduser: req.params.userId }, order: [['Date', 'DESC']], limit: 1}).then(function (event) {
        
            if (event.length != 0) {
                res.json(event);
            } else {
                res.sendStatus(404);
            }
        })
    // }, req, res)
}

// exports.getLastEvent = function (req, res) {
//     // checkLogged(function () {
//         res.json("{'feur':'aled}");
//     // }, req, res)
// }

exports.getEventsByDate = function (req, res) {
    // checkLogged(function () {

        getByDate(req.params.date, req.params.userId).then(function (event) {
            if (event.length != 0) {
                res.json(event);
            } else {
                res.sendStatus(404);
            }
        })
    // }, req, res)
}

async function getByDate(date, userId) {
    return await db.sequelize.query(`SELECT * FROM umad.events WHERE DATE(Date)='${date}' and iduser='${userId}'`, {
        model: db.Event,
        mapToModel: true // pass true here if you have any mapped fields
    });
}