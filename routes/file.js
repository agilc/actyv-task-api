var express = require('express');
var router = express.Router();

let fileController = require('../controller/file');

/* GET home page. */
router.post('/', fileController.createFile);
router.get('/', fileController.listFiles);
router.get('/:id', fileController.getFile);
router.delete('/:id', fileController.deleteFile);
router.put('/', fileController.editFile);
router.get('/checkout/:id', fileController.checkOutFile);
router.post('/checkin', fileController.checkInFile);

module.exports = router;