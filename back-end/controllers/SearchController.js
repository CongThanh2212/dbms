const searchService = require('../services/SearchService');

// const getResult = async (req, res) => {
//     let page = req.query.page;
//     let size = req.query.size;
//     let name = req.query.name;
//     let result = await searchService.getSearchResult(name, page, size);
//     res.send(result);
// }

const getResult = async (req, res) => {
    let page = req.query.page;
    let size = req.query.size;
    let keyword = req.query.name;
    let result = await searchService.getSearchResult(keyword, page, size);
    res.send(result);
}

module.exports = {
    getResult: getResult
}