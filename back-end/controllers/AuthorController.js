const authorService = require('../services/AuthorService');

const getAllAuthor = async (req, res) => {
    const result = await authorService.getAllAuthor();
    res.send(result);
}

const getAuthorById = async (req, res) => {
    let authorId = req.params.authorId;
    const result = await authorService.getAuthorById(authorId);
    res.send(result);
}

const addAuthor = async (req, res) => {
    let data = req.body;
    const result = await authorService.addAuthor(data);
    res.send(result);
}

const updateAuthor = async (req, res) => {
    let data = req.body;
    const result = await authorService.updateAuthor(data);
    res.send(result);
}

const deleteAuthor = async (req, res) => {
    let authorId = req.params.authorId;
    const result = await authorService.deleteAuthor(authorId);
    res.send(result);
}

module.exports = {
    getAllAuthor: getAllAuthor,
    getAuthorById: getAuthorById,
    addAuthor: addAuthor,
    updateAuthor: updateAuthor,
    deleteAuthor: deleteAuthor,
}