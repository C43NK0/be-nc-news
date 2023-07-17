const express = require("express")
const {handleServerErrors, handlePsqlErrors, handleCustomErrors, handle404Errors} = require("./errors/errors")
const app = express()
const {getTopics, getEndpoints, getArticlesbyId, getArticles, getCommentsById, postComments, patchArticlesById, } = require("./controllers/api.controller")
const cors = require('cors')


app.use(cors());

app.use(express.json())



app.get("/api/topics", getTopics)


app.get("/api", getEndpoints)


app.get("/api/articles/:article_id", getArticlesbyId)


app.get("/api/articles", getArticles)


app.get("/api/articles/:article_id/comments", getCommentsById)


app.post("/api/articles/:article_id/comments", postComments)


app.patch("/api/articles/:article_id", patchArticlesById)





app.all("*", (req, res) => {
    res.status(404).send({message: "Not found"})
})



app.use(handlePsqlErrors)

app.use(handleCustomErrors)

app.use(handle404Errors)

app.use(handleServerErrors)



module.exports = app

