let express = require("express");
let router = express.Router();

let userController = require('./controller/userController');
let eventController = require('./controller/eventController');
let eventTemplateController = require('./controller/eventTemplateController');
let friendMapController = require('./controller/friendsMapController');
let categoryController = require('./controller/categoryController');



router.post('/user',userController.createUser);

router.get('/user/:userId',userController.checkLogged, userController.getUser);

router.put('/user/:userId',userController.checkLogged,userController.updateUser);

router.delete('/user/:userId',userController.checkLogged,userController.checkAdmin,userController.deleteUser);

router.post('/login',userController.login);

router.get('/user/:userId/mood',userController.checkLogged,userController.getMood);

router.get('/user/:userId/events',userController.checkLogged,eventController.getEvents);

router.post('/user/:userId/events',userController.checkLogged,eventController.createEvent);

router.get('/user/:userId/LastEvent',userController.checkLogged, eventController.getLastEvent);

router.get('/user/:userId/events/:date',userController.checkLogged, eventController.getEventsByDate);

router.post('/user/:userId/add',userController.checkLogged, friendMapController.addFriend);

router.get('/user/:userId/friends',userController.checkLogged, friendMapController.getFriends);

router.post('/user/:userId/templates',userController.checkLogged, eventTemplateController.createEventTemplate);

router.get('/user/:userId/templates',userController.checkLogged, eventTemplateController.getEventTemplates);

router.get('/user/:userId/templates/:templateId',userController.checkLogged, eventTemplateController.getEventTemplateById);

router.put('/user/:userId/templates/:templateId',userController.checkLogged, eventTemplateController.updateEventTemplate);

router.delete('/user/:userId/templates/:templateId',userController.checkLogged, eventTemplateController.deleteEventTemplate);

router.post('/user/:userId/category',userController.checkLogged, categoryController.createCategory);

router.get('/user/:userId/category',userController.checkLogged, categoryController.getCategories);

router.get('/user/:userId/category/:categoryId',userController.checkLogged, categoryController.getCategoryById);

router.put('/user/:userId/category/:categoryId',userController.checkLogged, categoryController.updateCategory);

router.delete('/user/:userId/category/:categoryId',userController.checkLogged, categoryController.deleteCategory);

module.exports = router;