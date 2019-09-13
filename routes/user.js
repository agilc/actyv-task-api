var express = require('express');
var router = express.Router();

let userController = require('../controller/user');

/* GET home page. */
router.post('/authenticate', userController.authenticateUser);
router.get('/', userController.listUser);

module.exports = router;