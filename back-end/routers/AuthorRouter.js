const express = require('express');
const authorController = require('../controllers/AuthorController');

let router = express.Router();

router.get('/', authorController.getAllAuthor);
router.get('/by-id:authorId', authorController.getAuthorById);
router.post('/add', authorController.addAuthor);
router.put('/update', authorController.updateAuthor);
router.delete('/delete/:authorId', authorController.deleteAuthor);

module.exports = router;
