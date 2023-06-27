const {fetchTopics} = require("../models/api.model")

exports.getTopics = (req, res, next) => {
    fetchTopics().
    then((topics) => 
    res.status(200).send({message: "all ok", topics: topics}))
    .catch(next)
}
