const express = require('express');
const roleController = require('../controllers/RoleController');

let router = express.Router();

router.get('/', roleController.getAllRole);
router.get('/by-id/:roleId', roleController.getRoleById);
router.post('/add', roleController.addRole);
router.put('/update', roleController.updateRole);
router.delete('/delete/:roleId', roleController.deleteRole);

module.exports = router;
