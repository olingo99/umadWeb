const { application } = require('express');
const db = require('../model/index.js');

const checkLogged = require('./userController.js').checkLogged;

exports.createEventTemplate = function (req, res) {
    // checkLogged(function () {
        
        db.EventTemplate.create({ Name: req.body.Name, iduser: req.params.userId, idcategory: req.body.idcategory, ProposedWeight: req.body.ProposedWeight }).then(function (event) {
            if (event.length != 0) {
                res.json(event);
            } else {
                res.sendStatus(404);
            }
        }).catch(function (err) {
            res.sendStatus(404);
        })
    // }, req, res)
}

exports.getEventTemplates = function (req, res) {
    // checkLogged(function () {
        db.EventTemplate.findAll({ where: { iduser: req.params.userId } }).then(function (event) {
            if (event.length != 0) {
                res.json(event);
            } else {
                res.sendStatus(404);
            }
        })
    // }, req, res)
}

exports.getEventTemplateById = function (req, res) {
    // checkLogged(function () {
        db.EventTemplate.findOne({ where: { ideventTemplate: req.params.templateId, iduser:req.params.userId } }).then(function (event) {
            if (event!=null) {
                res.json(event);
            } else {
                res.sendStatus(404);
            }
        })
    // }, req, res)
}

exports.getEventTemplateByCategory = function (req, res) {
    // checkLogged(function () {
        db.EventTemplate.findAll({ where: { idcategory: req.params.categoryId, iduser:req.params.userId } }).then(function (event) {
            if (event.length != 0) {
                res.json(event);
            } else {
                res.sendStatus(404);
            }
        })
    // }, req, res)
}


exports.updateEventTemplate = function (req, res) {
    // checkLogged(function () {
        db.EventTemplate.update({ Name: req.body.Name, iduser: req.params.userId, idcategory: req.body.idcategory, ProposedWeight: req.body.ProposedWeight }, { where: { ideventTemplate: req.params.templateId} }).then(function (result) {
            if (result == 1) {
                db.EventTemplate.findOne({ where: { ideventTemplate: req.params.templateId } }).then(function (event) {
                    if (event!=null) {
                        res.json(event);
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
    // }, req, res)
}

exports.deleteEventTemplate = function (req, res) {
    // checkLogged(function () {
        db.EventTemplate.destroy({ where: { ideventTemplate: req.params.templateId } }).then(function (result) {
            if (result == 1) {
                res.sendStatus(200);
            } else {
                res.sendStatus(404);
            }
        })
    // }, req, res)
}