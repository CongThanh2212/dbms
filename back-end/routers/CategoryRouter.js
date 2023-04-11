const express = require('express');
const categoryController = require('../controllers/CategoryController');

let router = express.Router();

router.get('/', categoryController.getAllCategory);
router.get('/by-id/:categoryId', categoryController.getCategoryById);
router.post('/add', categoryController.addCategory);
router.put('/update', categoryController.updateCategory);
router.delete('/delete/:categoryId', categoryController.deleteCategory);

module.exports = router;
