const { application } = require('express');
const db = require('../model/index.js');

/*
Controller contains functions to handle requests regarding the category table
*/


// Create and Save a new Category for a specific user identified by its id.
exports.createCategory = function (req, res) {
    db.Category.create({ Name: req.body.Name, iduser: +req.params.userId }).then(function (category) {
        if (category.length != 0) {                                                                                         //check if the category is created
            res.json(category);                                                                                              //return the created category
        } else {                                                                                                             //if the category is not created
            res.sendStatus(400);                                                                                             //return error
        }
    })
}

// Retrieve all Categories from the database for a specific user identified by its id.
exports.getCategories = function (req, res) {
    db.Category.findAll({ where: { iduser: req.params.userId } }).then(function (category) {
        if (category.length != 0) {                                                                         //if at least one category is found
            res.json(category);                                                                              //return the categories
        } else {                                                                                         //if no category is found
            res.sendStatus(404);                                                                             //return error
        }
    })
}


// Find a single Category by its id for a specific user identified by its id.
exports.getCategoryById = function (req, res) {
    db.Category.findOne({ where: { idcategory: req.params.categoryId, iduser: req.params.userId } }).then(function (category) {
        if (category != null) {                                                                             //if the category is found
            res.json(category);                                                                              //return the category
        } else {                                                                                            //if the category is not found
            res.sendStatus(404);                                                                            //return error
        }
    })
}


// Update a Category identified by its id 
exports.updateCategory = function (req, res) {
    db.Category.update({ Name: req.body.Name, iduser: req.params.userId }, { where: { idcategory: req.params.categoryId } }).then(function (result) {    //update the category
        if (result == 1) {
            db.Category.findOne({ where: { idcategory: req.params.categoryId } }).then(function (category) {    //find the updated category
                if (category != null) {                                                                         //if the category is found
                    res.json(category);                                                                         //return the category
                }
                else {                                                                                          //if the category is not found
                    res.sendStatus(404);                                                                        //return error
                }
            })
        } else {
            res.sendStatus(400);
        }
    })
}


// Delete a Category identified by its id
exports.deleteCategory = function (req, res) {
    db.Category.destroy({ where: { idcategory: req.params.categoryId } }).then(function (result) {
        if (result == 1) {                                                                                    //if the category is deleted (result is the number of deleted rows)
            res.sendStatus(200);                                                                          //return success
        } else {                                                                                        //if the category is not deleted
            res.sendStatus(404);                                                                        //return error
        }
    })
}