const { QueryTypes, Model } = require('sequelize');
const sequelize = require('../database/connect');
const ProductSet = require('../models/ProductSets');

let getProductSetById = async (productSetId) => {
    try {
        let result = await sequelize.query(
            'select ps.id, ps.name, ps.description, ps.newestChap, ps.image, a.name as authorName, p.name as providerName from product_set ps join authors a on ps.authorId = a.id join providers p on ps.providerId = p.id where ps.id = ?', {
            raw: true,
            replacements: [productSetId],
            type: QueryTypes.SELECT
        }
        );
        return result;
    } catch (e) {
        return temp = {
            error: e.name,
            message: "Error"
        };
    }
}

let getAllProductSet = async () => {
    try {
        let result = await sequelize.query(
            'select ps.id, ps.name, ps.newestChap, ps.image, a.name as authorName, p.name as providerName from product_set ps join authors a on ps.authorId = a.id join providers p on ps.providerId = p.id', {
            raw: true,
            type: QueryTypes.SELECT
        }
        );
        return result;
    } catch (e) {
        return temp = {
            error: e.name,
            message: "Error"
        };
    }
}

let getProductSetByProvider = async (providerId) => {
    try {
        let id = providerId;
        let searchResult = await sequelize.query(
            'SELECT * FROM product_set p WHERE p.providerId LIKE ?', {
            raw: true,
            replacements: [id],
            type: QueryTypes.SELECT
        });
        return searchResult;
    } catch (e) {
        return temp = {
            error: e.name,
            message: "Error"
        };
    }
}

let getProducSetInfo = async () => {
    try {
        let productSet = await sequelize.query(
            'select ps.id, ps.name, ps.newestChap, ps.description, ps.image, a.name as authorName, p.name as providerName from product_set ps join authors a on ps.authorId = a.id join providers p on ps.providerId = p.id', {
            raw: true,
            type: QueryTypes.SELECT
        }
        );
        let authors = await sequelize.query(
            'select name from authors', {
            raw: true,
            type: QueryTypes.SELECT
        });

        let providers = await sequelize.query(
            'select name from providers', {
            raw: true,
            type: QueryTypes.SELECT
        });

        let authorList = [];
        for (let i = 0; i < authors.length; i++) {
            authorList.push(authors[i].name);
        }

        let providerList = [];
        for (let i = 0; i < providers.length; i++) {
            providerList.push(providers[i].name);
        }

        return result = {
            productSet: productSet,
            authors: authorList,
            providers: providerList,
        };
    } catch (e) {
        return temp = {
            error: e.name,
            message: "Error"
        };
    }
}

let addProductSet = async (data) => {
    try {
        let result = await ProductSet.create({
            id: data.id,
            name: data.name,
            description: data.description,
            newestChap: data.newestChap,
            image: data.image,
            providerId: data.providerId,
            authorId: data.authorId
        })
        return result;
    }
    catch (e) {
        return temp = {
            error: e.name,
            message: "Error"
        };
    }
}

let addProductSetByAdmin = async (data) => {
    try {

        let id = await sequelize.query(
            'select (select id from authors where name = :authorName) as authorId, (select id from providers where name = :providerName) as providerId',
            {
                raw: true,
                replacements: {
                    authorName: data.authorName,
                    providerName: data.providerName,
                },
                type: QueryTypes.SELECT
            });

        let authorId = id[0].authorId;
        let providerId = id[0].providerId;

        let result = await ProductSet.create({
            id: data.id,
            name: data.name,
            description: data.description,
            newestChap: data.newestChap,
            image: data.image,
            providerId: providerId,
            authorId: authorId
        })

        return result;
    } catch (e) {
        return temp = {
            error: e.name,
            message: "Error"
        };
    }
}

let updateProductSetAdmin = async (data) => {
    try {

        let id = await sequelize.query(
            'select (select id from authors where name = :authorName) as authorId, (select id from providers where name = :providerName) as providerId',
            {
                raw: true,
                replacements: {
                    authorName: data.authorName,
                    providerName: data.providerName,
                },
                type: QueryTypes.SELECT
            });

        let authorId = id[0].authorId;
        let providerId = id[0].providerId;
        let productSet = await ProductSet.findOne(
            {
                where: {
                    id: data.id
                }
            }
        );
        productSet.set({
            id: data.id,
            name: data.name,
            description: data.description,
            newestChap: parseInt(data.newestChap),
            image: data.image,
            providerId: (providerId ? providerId : productSet.providerId),
            authorId: (authorId ? authorId : productSet.authorId)
        });

        productSet.save();
        return productSet;
    }
    catch (e) {
        return temp = {
            error: e.name,
            message: "Error"
        };
    }
}

let updateProductSet = async (data) => {
    try {
        let productSet = await ProductSet.findOne({
            where:
                { id: data.id }
        });
        productSet.set({
            id: data.id,
            name: data.name,
            description: data.description,
            newestChap: data.newestChap,
            image: data.image,
            providerId: data.providerId,
            authorId: data.authorId
        })
        await productSet.save();
        return productSet;
    }
    catch (e) {
        return temp = {
            error: e.name,
            message: "Error"
        };
    }
}

let deleteProductSet = async (productSetId) => {
    try {
        let productSet = await ProductSet.findOne({
            where: {
                id: productSetId,
            }
        });
        await productSet.destroy();
        return data = {
            message: "Deleted",
        }
    }
    catch (e) {
        return temp = {
            error: e.name,
            message: "Error"
        };
    }
}

module.exports = {
    getProductSetById: getProductSetById,
    getAllProductSet: getAllProductSet,
    getProductSetByProvider: getProductSetByProvider,
    getProducSetInfo: getProducSetInfo,
    addProductSet: addProductSet,
    addProductSetByAdmin: addProductSetByAdmin,
    updateProductSetAdmin: updateProductSetAdmin,
    updateProductSet: updateProductSet,
    deleteProductSet: deleteProductSet,
}