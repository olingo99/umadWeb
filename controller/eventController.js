const { application } = require('express');
const db = require('../model/index.js');

const checkLogged = require('./userController.js').checkLogged;

exports.getEvents = function (req, res) {
    checkLogged(function () {
        date = new Date();
        today = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
        getByDate(today).then(function (event) {
            if (event.length != 0) {
                res.json(event);
            } else {
                res.sendStatus(404);
            }
        })
    }, req, res)
}

exports.createEvent = function (req, res) {
    checkLogged(function () {
        db.Event.create({ Name: req.body.Name, iduser: req.params.userId, idcategory: req.body.idcategory, Date: req.body.Date, Weight: req.body.Weight }).then(function (event) {
            if (event.length != 0) {
                res.json(event);
            } else {
                res.sendStatus(404);
            }
        })
    }, req, res)
}

exports.getLastEvent = function (req, res) {
    checkLogged(function () {
        db.Event.findAll({ where: { iduser: req.params.userId }, order: [['Date', 'DESC']], limit: 1 }).then(function (event) {
            if (event.length != 0) {
                res.json(event);
            } else {
                res.sendStatus(404);
            }
        })
    }, req, res)
}

exports.getEventsByDate = function (req, res) {
    checkLogged(function () {

        getByDate(req.params.date).then(function (event) {
            if (event.length != 0) {
                res.json(event);
            } else {
                res.sendStatus(404);
            }
        })
    }, req, res)
}

async function getByDate(date) {
    return await db.sequelize.query(`SELECT * FROM umad.events WHERE DATE(Date)='${date}'`, {
        model: db.Event,
        mapToModel: true // pass true here if you have any mapped fields
    });
}