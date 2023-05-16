let express = require("express");
let router = express.Router();

let userController = require('./controller/userController');
let eventController = require('./controller/eventController');
let eventTemplateController = require('./controller/eventTemplateController');
let friendMapController = require('./controller/friendsMapController');
let categoryController = require('./controller/categoryController');



router.get('/', function (req, res) {res.status(200).json({ message: "Welcome to the Umad API" })});

router.post('/user',userController.createUser);

router.get('/user/:userId',userController.checkLogged, userController.getUser);

router.get('/user/name/:Name',userController.getUserByName);

router.put('/user/:userId',userController.checkLogged,userController.updateUser);

router.delete('/user/:userId',userController.checkLogged,userController.checkAdmin,userController.deleteUser);

router.post('/login',userController.login);

router.get('/user/:userId/mood',userController.checkLogged,userController.getMood);

router.get('/user/:userId/events',userController.checkLogged,eventController.getEvents);

router.delete('/user/:userId/event/:eventId',userController.checkLogged, eventController.deleteEvent);

router.post('/user/:userId/events',userController.checkLogged,eventController.createEvent);

router.get('/user/:userId/lastevent',userController.checkLogged, eventController.getLastEvent);

router.get('/user/:userId/events/:date',userController.checkLogged, eventController.getEventsByDate);

router.post('/user/:userId/friends',userController.checkLogged, friendMapController.addFriendsByName);

router.get('/user/:userId/friends',userController.checkLogged, friendMapController.getFriends);

router.post('/user/:userId/templates',userController.checkLogged, eventTemplateController.createEventTemplate);

router.get('/user/:userId/templates',userController.checkLogged, eventTemplateController.getEventTemplates);

router.get('/user/:userId/templates/:templateId',userController.checkLogged, eventTemplateController.getEventTemplateById);

router.get('/user/:userId/templates/category/:categoryId',userController.checkLogged, eventTemplateController.getEventTemplateByCategory);

router.put('/user/:userId/templates/:templateId',userController.checkLogged, eventTemplateController.updateEventTemplate);

router.delete('/user/:userId/templates/:templateId',userController.checkLogged, eventTemplateController.deleteEventTemplate);

router.post('/user/:userId/category',userController.checkLogged, categoryController.createCategory);

router.get('/user/:userId/category',userController.checkLogged, categoryController.getCategories);

router.get('/user/:userId/category/:categoryId',userController.checkLogged, categoryController.getCategoryById);

router.put('/user/:userId/category/:categoryId',userController.checkLogged, categoryController.updateCategory);

router.delete('/user/:userId/category/:categoryId',userController.checkLogged, categoryController.deleteCategory);

router.post('/user/:userId/acceptFriend',userController.checkLogged, friendMapController.acceptFriend);

router.post('/user/:userId/declineFriend',userController.checkLogged, friendMapController.declineFriend);

router.get('/user/:userId/friendRequests',userController.checkLogged, friendMapController.getFriendRequests);

router.get('/userNames',userController.checkLogged, userController.getUserNames);




// router.get('/login',function (req, res) {res.status(200).json({ message: "get login" })});

module.exports = router;