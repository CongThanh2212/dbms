const express = require('express');
const userController = require('../controllers/UserController');

let router = express.Router();

router.get('/', userController.getAllUser);
router.get('/info/:userId', userController.getUserInfo);
router.get('/by-id/:userId', userController.getUserById);
router.post('/add', userController.addUser);
router.put('/update', userController.updateUser);
router.delete('/delete/:userId', userController.deleteUser);

module.exports = router;
