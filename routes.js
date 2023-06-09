let express = require("express");
let router = express.Router();


//import controllers
let userController = require('./controller/userController');
let eventController = require('./controller/eventController');
let eventTemplateController = require('./controller/eventTemplateController');
let friendMapController = require('./controller/friendsMapController');
let categoryController = require('./controller/categoryController');




router.get('/', function (req, res) {res.status(200).json({ message: "Welcome to the Umad API" })});

router.post('/user',userController.createUser); //create a new user

router.get('/user/:userId',userController.checkLogged, userController.getUser); //retrieve a user by its id

router.get('/user/name/:Name',userController.getUserByName);    //retrieve a user by its name

router.put('/user/:userId',userController.checkLogged,userController.updateUser);   //update a user identified by its id

router.delete('/user/:userId',userController.checkLogged,userController.checkAdmin,userController.deleteUser);  //delete a user identified by its id

router.post('/login',userController.login); //login

router.get('/user/:userId/mood',userController.checkLogged,userController.getMood); //get user mood

router.get('/user/:userId/events',userController.checkLogged,eventController.getEvents);    //get all events of a user for a specific date

router.delete('/user/:userId/event/:eventId',userController.checkLogged, eventController.deleteEvent);  //delete an event

router.post('/user/:userId/events',userController.checkLogged,eventController.createEvent); //create an event

router.get('/user/:userId/lastevent',userController.checkLogged, eventController.getLastEvent); //get last event of a user

router.get('/user/:userId/events/:date',userController.checkLogged, eventController.getEventsByDate);       //get all events of a user for a specific date

router.post('/user/:userId/friends',userController.checkLogged, friendMapController.addFriendsByName);  //add friends by name

router.get('/user/:userId/friends',userController.checkLogged, friendMapController.getFriends); //get friends of a user

router.post('/user/:userId/templates',userController.checkLogged, eventTemplateController.createEventTemplate); //create an event template for a user

router.get('/user/:userId/templates',userController.checkLogged, eventTemplateController.getEventTemplates);    //get all event templates of a user

router.get('/user/:userId/templates/:templateId',userController.checkLogged, eventTemplateController.getEventTemplateById);   //get an event template by its id

router.get('/user/:userId/templates/category/:categoryId',userController.checkLogged, eventTemplateController.getEventTemplateByCategory);  //get all event templates for a specific category

router.put('/user/:userId/templates/:templateId',userController.checkLogged, eventTemplateController.updateEventTemplate);  //update an event template

router.delete('/user/:userId/templates/:templateId',userController.checkLogged, eventTemplateController.deleteEventTemplate);   //delete an event template

router.post('/user/:userId/category',userController.checkLogged, categoryController.createCategory);    //create a category for a user

router.get('/user/:userId/category',userController.checkLogged, categoryController.getCategories);  //get all categories of a user

router.get('/user/:userId/category/:categoryId',userController.checkLogged, categoryController.getCategoryById);    //get a category by its id

router.put('/user/:userId/category/:categoryId',userController.checkLogged, categoryController.updateCategory);   //update a category

router.delete('/user/:userId/category/:categoryId',userController.checkLogged, categoryController.deleteCategory);  //delete a category

router.post('/user/:userId/acceptFriend',userController.checkLogged, friendMapController.acceptFriend); //accept a friend request

router.post('/user/:userId/declineFriend',userController.checkLogged, friendMapController.declineFriend);   //decline a friend request

router.get('/user/:userId/friendRequests',userController.checkLogged, friendMapController.getFriendRequests);   //get all friend requests of a user

router.post('/userNames',userController.checkLogged, userController.getUserNames);  //get all user names "like" the search string

module.exports = router;