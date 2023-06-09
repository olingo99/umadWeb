const { application } = require('express');
const db = require('../model/index.js');

/*
Controller contains functions to handle requests regarding the eventTemplate table
*/

// Create and Save a new EventTemplate for a specific user identified by its id.
exports.createEventTemplate = function (req, res) {

    db.EventTemplate.create({ Name: req.body.Name, iduser: +req.params.userId, idcategory: req.body.idcategory, ProposedWeight: req.body.ProposedWeight }).then(function (event) {  //create the eventTemplate
        if (event.length != 0) {                                                                                     //check if the eventTemplate is created
            res.json(event);                                                                                      //return the created eventTemplate
        } else {                                                                                                //if the eventTemplate is not created
            res.sendStatus(500);                                                                                //return error
        }
    }).catch(function (err) {                                                                                //if the creation of the eventTemplate fails
        res.sendStatus(500);                                                                                //return error
    })

}

// Retrieve all EventTemplates from the database for a specific user.
exports.getEventTemplates = function (req, res) {   

    db.EventTemplate.findAll({ where: { iduser: req.params.userId } }).then(function (event) {
        if (event.length != 0) {
            res.json(event);
        } else {
            res.sendStatus(404);
        }
    })

}

// Find a single EventTemplate by its id for a specific user identified by its id.
exports.getEventTemplateById = function (req, res) {
    db.EventTemplate.findOne({ where: { ideventTemplate: req.params.templateId, iduser: req.params.userId } }).then(function (event) {
        if (event != null) {
            res.json(event);
        } else {
            res.sendStatus(404);
        }
    })
}

// Find all EventTemplates of a specific category for a specific user identified by its id.
exports.getEventTemplateByCategory = function (req, res) {
    console.log("getEventTemplateByCategory");
    console.log(req.params.categoryId);
    console.log(req.params.userId);
    db.EventTemplate.findAll({ where: { idcategory: req.params.categoryId, iduser: req.params.userId } }).then(function (event) {
        if (event.length != 0) {
            console.log(event);
            res.json(event);
        } else {
            res.sendStatus(404);
        }
    })
}

// Update a EventTemplate identified by the templateId
exports.updateEventTemplate = function (req, res) {
    db.EventTemplate.update({ Name: req.body.Name, iduser: req.params.userId, idcategory: req.body.idcategory, ProposedWeight: req.body.ProposedWeight }, { where: { ideventTemplate: req.params.templateId } }).then(function (result) {
        if (result == 1) {
            db.EventTemplate.findOne({ where: { ideventTemplate: req.params.templateId } }).then(function (event) {
                if (event != null) {
                    res.json(event);
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

// Delete a EventTemplate with the specified templateId in the request
exports.deleteEventTemplate = function (req, res) {
    db.EventTemplate.destroy({ where: { ideventTemplate: req.params.templateId } }).then(function (result) {
        if (result == 1) {
            res.sendStatus(200);
        } else {
            res.sendStatus(404);
        }
    })
}