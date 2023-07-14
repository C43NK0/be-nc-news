const {fetchTopics, fetchArticlesById, fetchArticles, fetchCommentsById, putComments, updateArticlesById} = require("../models/api.model")
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

exports.getCommentsById = (req, res, next) => {
    const { article_id } = req.params
    fetchCommentsById(article_id)
    .then((data) => {
        res.status(200).send({comments: data})
    })
    .catch((err) => {
        next(err)
    });
    
}

exports.postComments = (req, res, next) => {
    const username = req.body.username
    // console.log(req.body.username)
    
    const { body } = req.body
    const { article_id } = req.params
   
    putComments(username, body, article_id)
    .then((data) => {
        
        res.status(201).send({comment: data})
    })
    .catch((err) => {
        next(err)
    })
    
    
}

exports.patchArticlesById = (req, res, next) => {
    const {article_id} = req.params
    const incVotes = req.body.inc_votes;
   
    updateArticlesById(incVotes, article_id)
    .then((data) => {
        res.status(200).send({article: data})
    })
    .catch((err) => {
        next(err)
    })
}
