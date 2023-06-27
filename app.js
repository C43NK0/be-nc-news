const express = require("express")
const {handleServerErrors} = require("./errors/errors")
const app = express()
const {getTopics} = require("./controllers/api.controller")

app.get("/api/topics", getTopics)


app.all("*", (req, res) => {
    res.status(404).send({message: "Not found"})
})

app.use(handleServerErrors)



module.exports = app
