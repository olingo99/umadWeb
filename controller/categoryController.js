const { application } = require('express');
const db = require('../model/index.js');

const checkLogged = require('./userController.js').checkLogged;

exports.createCategory = function (req, res) {
    // checkLogged(function () {
        db.Category.create({ Name: req.body.Name, iduser: req.params.userId }).then(function (category) {
            if (category.length != 0) {
                res.json(category);
            } else {
                res.sendStatus(404);
            }
        })
    // }, req, res)
}


exports.getCategories = function (req, res) {
    // checkLogged(function () {
        db.Category.findAll({ where: { iduser: req.params.userId } }).then(function (category) {
            if (category.length != 0) {
                res.json(category);
            } else {
                res.sendStatus(404);
            }
        })
    // }, req, res)
}

exports.getCategoryById = function (req, res) {
    // checkLogged(function () {
        db.Category.findOne({ where: { idcategory: req.params.categoryId, iduser:req.params.userId } }).then(function (category) {
            if (category!=null) {
                res.json(category);
            } else {
                res.sendStatus(404);
            }
        })
    // }, req, res)
}

exports.updateCategory = function (req, res) {
    // checkLogged(function () {
        db.Category.update({ Name: req.body.Name, iduser: req.params.userId }, { where: { idcategory: req.params.categoryId} }).then(function (result) {
            if (result == 1) {
                db.Category.findOne({ where: { idcategory: req.params.categoryId } }).then(function (category) {
                    if (category!=null) {
                        res.json(category);
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

exports.deleteCategory = function (req, res) {
    // checkLogged(function () {
        db.Category.destroy({ where: { idcategory: req.params.categoryId } }).then(function (result) {
            if (result == 1) {
                res.sendStatus(200);
            } else {
                res.sendStatus(404);
            }
        })
    // }, req, res)
}