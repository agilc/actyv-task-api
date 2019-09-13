var express = require('express');
var router = express.Router();

let deptController = require('../controller/dept');

/* GET home page. */
router.post('/', deptController.createDept);
router.get('/', deptController.listDepts);
router.get('/:id', deptController.getDept);
router.delete('/:id', deptController.deleteDept);
router.put('/', deptController.editDept);

module.exports = router;