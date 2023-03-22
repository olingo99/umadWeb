let express = require("express");
let router = express.Router();

let homeController = require('./controller/userController');
let passengerController = require('./controller/eventController');


router.get('/', homeController.home);

router.post('/newVoyage',homeController.renderAddPassenger);

router.post('/', homeController.home);

router.post('/confirmPassenger', passengerController.confirmPassenger);

router.post('/final', validationController.final)

module.exports = router;