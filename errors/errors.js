

exports.handleServerErrors = (err, req, res, next) => {
    
    res.status(500).send({ message: "500 error!"})
}
