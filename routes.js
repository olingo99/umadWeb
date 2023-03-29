let express = require("express");
let router = express.Router();

let userController = require('./controller/userController');
let eventController = require('./controller/eventController');
// let eventTemplateController = require('./controller/eventTemplateController');
// let friendMapController = require('./controller/friendMapController');
// let categoryController = require('./controller/categoryController');


router.post('/user',userController.createUser);

router.get('/user/:userId', userController.getUser);

router.put('/user/:userId',userController.updateUser);

router.delete('/user/:userId',userController.deleteUser);

router.post('/login',userController.login);

router.get('/user/:userId/mood',userController.getMood);

router.get('/user/:userId/events',eventController.getEvents);

router.post('/user/:userId/events',eventController.createEvent);

router.get('/user/:userId/LastEvent', eventController.getLastEvent);

router.get('/user/:userId/events/:date', eventController.getEventsByDate);

// router.post('/user/:userId/add', friendMapController.addFriend);

// router.get('/user/:userId/friends', friendMapController.getFriends);

// router.post('/user/:userId/templates', eventTemplateController.createEventTemplate);

// router.get('/user/:userId/templates', eventTemplateController.getEventTemplates);

// router.get('/user/:userId/templates/:templateId', eventTemplateController.getEventTemplateById);

// router.put('/user/:userId/templates/:templateId', eventTemplateController.updateEventTemplate);

// router.delete('/user/:userId/templates/:templateId', eventTemplateController.deleteEventTemplate);

// router.post('/user/:userId/category', categoryController.createCategory);

// router.get('/user/:userId/category', categoryController.getCategories);

// router.get('/user/:userId/category/:categoryId', categoryController.getCategoryById);

// router.put('/user/:userId/category/:categoryId', categoryController.updateCategory);

// router.delete('/user/:userId/category/:categoryId', categoryController.deleteCategory);

module.exports = router;