exports.handlePsqlErrors = (err, req, res, next) => {
    if (err.code === "22P02" || err.code === "23502") {
        res.status(400).send({ message: "Bad request" });
    } else {
        if (err.code === "23503"){
            res.status(404).send({message: "Not Found"})
        } else {
        next(err);
        }
    }
}

exports.handleCustomErrors = (err, req, res, next) => {
    if (err.message) {
        res.status(err.status).send({ message: err.message})
    }
    next(err);
}

exports.handle404Errors = (err, req, res, next) => {
    res.status(404).send({ message: "Not Found" })
    next(err)
}

exports.handleServerErrors = (err, req, res, next) => {
    
    res.status(500).send({ message: "500 error!"})
}
