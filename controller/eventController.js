const { application } = require('express');
const db = require('../model/index.js');

/*
Controller contains functions to handle requests regarding the event table
*/


// Get all events with today's date from the database for a specific user identified by its id.
exports.getEvents = function (req, res) {
    date = new Date();
    today = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate(); //create today's date
    getByDate(today, req.params.userId).then(function (event) {                     //get today's events
        if (event.length != 0) {                                            //if at least one event is found
            res.json(event);                                            //return the events
        } else {                                                    //if no event is found
            res.sendStatus(404);                                      //return error
        }
    })
}

//Create and Save a new Event for a specific user identified by its id.
exports.createEvent = function (req, res) {
    if (req.body.Date == undefined) {       //if the date is not specified we take the current date
        date = new Date();
        date.setHours(date.getHours() + 2); //set the time to the current time + 2 hours (because of the time zone)
        req.body.Date = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds() + '.000';   //create today's date in the right format for the database
    }
    db.Event.create({ Name: req.body.Name, iduser: +req.params.userId, idcategory: req.body.idcategory, Date: req.body.Date, Weight: req.body.Weight }).then(function (event) { //create the event
        if (event.length != 0) {                                                                                     //check if the event is created
            res.json(event);                                                                                            //return the created event
        } else {                                                                                                    //if the event is not created
            res.sendStatus(400);                                                                                   //return error
        }
    })
}

//Get the last event of the user 
exports.getLastEvent = function (req, res) {
    db.Event.findAll({ where: { iduser: req.params.userId }, order: [['Date', 'DESC']], limit: 1 }).then(function (event) { //get the last event by ordering the events by date in descending order and taking the first one (user of findall to bne able to use order and limit)
        if (event.length != 0) {                                                                                 //if an event is found
            res.json(event);                                                                                    //return the event
        } else {                                                                                            //if no event is found
            res.sendStatus(404);                                                                       //return error
        }
    })

}

// Delete an event identified by its id 
exports.deleteEvent = function (req, res) {
    db.Event.findOne({ where: { iduser: +req.params.userId, idevent: +req.params.eventId } }).then(function (event) {   //find the event to delete
        if (event != null) {                                                                                     //if the event is found
            event.destroy().then(function () {                                                                 //delete the event, it is needed to do it this way for the hook to work (see model/eventModel.js)
                res.sendStatus(200);                                                                        //return success
            })  
        } else {                                                                                        //if the event is not found
            res.sendStatus(404);                                                                   //return error
        }
    })
}


//Get all events with a specific date from the database for a specific user identified by its id.
exports.getEventsByDate = function (req, res) {
    let date = req.params.date;
    let year = date.substring(0, 4);
    let month = date.substring(4, 6);
    let day = date.substring(6, 8);
    date = year + '-' + month + '-' + day;  //create the date in the right format for the database
    getByDate(date, req.params.userId).then(function (event) {  //get the events
        if (event.length != 0) {                            //if at least one event is found
            res.json(event);                           //return the events
        } else {                                  //if no event is found
            res.sendStatus(404);             //return error
        }
    })
}


//DB call to get all events with a specific date from the database for a specific user identified by its id.
async function getByDate(date, userId) {
    return await db.sequelize.query(`SELECT * FROM umad.events WHERE DATE(Date)='${date}' and iduser='${userId}'`, {
        model: db.Event,
        mapToModel: true
    });
}