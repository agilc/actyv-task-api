var express = require('express');
var router = express.Router();
let Joi = require('@hapi/joi');

let fileController = require('../controller/file');

/* GET home page. */
router.post('/', fileController.createFile);
router.get('/', fileController.listFiles);
router.get('/:id', fileController.getFile);
router.delete('/:id', fileController.deleteFile);

module.exports = router;