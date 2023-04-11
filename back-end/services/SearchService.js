const { parse } = require('dotenv');
const { QueryTypes, Model } = require('sequelize');
const sequelize = require('../database/connect');
const client = require('../database/elasticsearch');

/*
let getSearchResult = async(data, page, size) => {
    try {
        let searchData = "%" + data + "%";
        let result = await sequelize.query(
            "select p.*, ps.name setName, ps.id setId, a.name " 
            + "from products p " 
            + "join authors a on p.authorId = a.id "
            + "join product_set ps on p.productsetId = ps.id "
            + "where p.productName like :searchData or a.name like :searchData or ps.name like :searchData "
            + "order by p.createdAt DESC", {
                raw: true,
                replacements: {searchData},
                type: QueryTypes.SELECT
            });
        let countResult = await sequelize.query(
            "select count(*) as total " 
            + "from products p " 
            + "join authors a on p.authorId = a.id "
            + "join product_set ps on p.productsetId = ps.id "
            + "where p.productName like :searchData or a.name like :searchData or ps.name like :searchData "
            + "order by p.createdAt DESC", {
                raw: true,
                replacements: {searchData},
                type: QueryTypes.SELECT
            });

        if (page != null) {
            let pageNumber = parseInt(page);
            let pageSize = parseInt(size);
            let start = (pageNumber - 1) * pageSize ;
            return result.slice(start, start + pageSize);
        }
        return result;
    } catch (e) {
        return temp = {
            error: e.name,
            message: "Error"
        };
    }
}

let getSearchResult = async(keyword, page, size, res) => {
    const client = elasticsearch.Client({
        host: 'localhost:9200'
    })
    client.search({
        index: 'book_search',
        body: {
          query: {
            fuzzy: {
                "productName": {
                    "value": keyword,
                    "fuzziness": 2
                }
            }
          }
        }
      }).then((response) => {
        var result = new Array;
        const hits = response.hits.hits
        for (var i = 0; i < hits.length; i++) {
            result.push(hits[i]._source);
        }

        if (page != null) {
            let pageNumber = parseInt(page);
            let pageSize = parseInt(size);
            let start = (pageNumber - 1) * pageSize ;
            return res.send (result.slice(start, start + pageSize));
        }
      }, (error) => {
        return res.send({
            error: error.message,
            message: "Error"
        })
    })
}
*/

let getSearchResult = async(keyword, page, size) => {
    try {
        const response = await client.search({
            index: 'book_search',
            body: {
                query: {
                    multi_match: {
                      query: keyword,
                      fields: ["productName"],
                      fuzziness: 2
                    }
                }
            }
        });
        if (response.hits.total.value == 0) return;
    
        let sqlQuery = "SELECT p.*, ps.name setName, ps.id setId, a.name " 
            + "FROM products p " 
            + "JOIN authors a ON p.authorId = a.id "
            + "JOIN product_set ps ON p.productsetId = ps.id "
            + "WHERE ";
        
        const data = response.hits.hits;
        for (var i = 0; i < data.length; i++) {
            sqlQuery = sqlQuery + "p.id = '" + data[i]._source.id + "' ";
            if (i < data.length - 1) sqlQuery += "OR ";
        }
        sqlQuery += "ORDER BY p.createdAt DESC";
        console.log(sqlQuery);
        let result = await sequelize.query(sqlQuery);
        result = result[0];
        if (page != null) {
            let pageNumber = parseInt(page);
            let pageSize = parseInt(size);
            let start = (pageNumber - 1) * pageSize ;
            return result.slice(start, start + pageSize);
        }
    } catch (e) {
        return temp = {
            error: e.name,
            message: "Error"
        };
    }
}

module.exports = {
    getSearchResult: getSearchResult
}