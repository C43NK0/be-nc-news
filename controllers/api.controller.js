const {fetchTopics, fetchArticlesById, fetchArticles} = require("../models/api.model")
const endpoints = require("../endpoints.json")


exports.getTopics = (req, res, next) => {
    fetchTopics()
    .then((data) => 
    res.status(200).send({topics: data})
    )
    .catch(next)
}


exports.getEndpoints = (req, res, next) => {
    res.status(200).send({endpoints}).catch(next); 
}

exports.getArticlesbyId = (req, res, next) => {
    
    const { article_id } = req.params    
    fetchArticlesById(article_id)
    .then((article) => {
        res.status(200).send({ article });
    })
    .catch((err) => {
        next(err)
    });
}
    
exports.getArticles = (req, res, next) => {
    fetchArticles()
    .then((data) => 
    res.status(200).send({articles: data})
    ).catch(next)
}

