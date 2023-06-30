const express = require("express")
const {handleServerErrors, handlePsqlErrors, handleCustomErrors} = require("./errors/errors")
const app = express()
const {getTopics, getEndpoints, getArticlesbyId, getArticles, getCommentsById, } = require("./controllers/api.controller")





app.get("/api/topics", getTopics)


app.get("/api", getEndpoints)


app.get("/api/articles/:article_id", getArticlesbyId)


app.get("/api/articles", getArticles)


app.get("/api/articles/:article_id/comments", getCommentsById)





app.all("*", (req, res) => {
    res.status(404).send({message: "Not found"})
})



app.use(handlePsqlErrors)

app.use(handleCustomErrors)

app.use(handleServerErrors)



module.exports = app

