const {fetchTopics, fetchEndpoints} = require("../models/api.model")
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
    


