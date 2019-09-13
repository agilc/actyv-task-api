var express = require('express');
var router = express.Router();

let categoryController = require('../controller/category');

/* GET home page. */
router.post('/', categoryController.createCategory);
router.get('/', categoryController.listCategory);
router.get('/:id', categoryController.getCategory);
router.delete('/:id', categoryController.deleteCategory);

module.exports = router;